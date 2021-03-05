import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, finalize} from 'rxjs/operators';
import { AutenticadorJwtService } from './autenticador-jwt.service';


@Injectable({
  providedIn: 'root'
})

export class HttpInterceptorService implements HttpInterceptor {
    urlWebAPI = 'http://localhost:8080';  // Especifico la dirección del servidor al que se van a conectar las peticiones http
    // si se cambia de servidor solo hay que cambiar esa línea
  
    /**
     * Constructor que inyecta un objeto de tipo AutenticadorJwtService
     */
    constructor(private autenticadorJwt: AutenticadorJwtService) { }
  
    /**
     * El siguiente método es el que hace todo el trabajo de interceptar las peticiones http, es obligado implementarlo porque
     * está en la interface HttpInterceptor.
     * @param request Petición http que es interceptada
     * @param next Objeto que permite indicar a una petición que queremos que siga su curso
     * 
     * El método devuelve un Observable que devuelve un evento http. En el interior del evento http puede viajar cualquier tipo de dato
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      
      // Intento obtener el token JWT guardado en el AutenticadorJWT. Si ese token existe, lo meto en una cabecera de la petición que
      // va a salir hacia el servidor
      const token: string = this.autenticadorJwt.recuperaJWT();  
      if (token) {
        request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
      }  
  
      // Si no se ha especificado una cabecera 'Content-Type', introduzco una que indica que se envían datos JSON y se codifican con utf-8
      if (!request.headers.has('Content-Type')) {
        request = request.clone({ headers: request.headers.set('Content-Type', 'application/json; charset=utf-8') });
      }
  
      // Especifico que la petición http va a aceptar una respuesta en formato JSON.
      request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
  
      // Agrego, a la URL a la que viaja la petición web, el prefijo que indica la dirección del servidor.
      const newUrl = {url: this.urlWebAPI + request.url};
      request = Object.assign(request, newUrl);
      const newUrlWithParams = {urlWithParams: this.urlWebAPI + request.urlWithParams};
      request = Object.assign(request, newUrlWithParams);
      
      // Permito que la petición http continúe su curso.
      return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
  //          console.log('event--->>>', event);  // Si utilizas esta línea obtendrás un log de todas las respuestas http recibidas en tu app
          }
          return event;
        }),
        finalize(() => {
         })
        );
    }
}
