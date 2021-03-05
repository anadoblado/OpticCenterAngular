"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FechaComponent = exports.FiveDayRangeSelectionStrategy = void 0;
var core_1 = require("@angular/core");
var datepicker_1 = require("@angular/material/datepicker");
var FiveDayRangeSelectionStrategy = /** @class */ (function () {
    function FiveDayRangeSelectionStrategy(_dateAdapter) {
        this._dateAdapter = _dateAdapter;
    }
    FiveDayRangeSelectionStrategy.prototype.selectionFinished = function (date) {
        return this._createFiveDayRange(date);
    };
    FiveDayRangeSelectionStrategy.prototype.createPreview = function (activeDate) {
        return this._createFiveDayRange(activeDate);
    };
    FiveDayRangeSelectionStrategy.prototype._createFiveDayRange = function (date) {
        if (date) {
            var start = this._dateAdapter.addCalendarDays(date, -2);
            var end = this._dateAdapter.addCalendarDays(date, 2);
            return new datepicker_1.DateRange(start, end);
        }
        return new datepicker_1.DateRange(null, null);
    };
    FiveDayRangeSelectionStrategy = __decorate([
        core_1.Injectable()
    ], FiveDayRangeSelectionStrategy);
    return FiveDayRangeSelectionStrategy;
}());
exports.FiveDayRangeSelectionStrategy = FiveDayRangeSelectionStrategy;
var FechaComponent = /** @class */ (function () {
    function FechaComponent() {
    }
    FechaComponent = __decorate([
        core_1.Component({
            selector: 'app-fecha',
            templateUrl: './fecha.component.html',
            styleUrls: ['./fecha.component.scss']
        })
    ], FechaComponent);
    return FechaComponent;
}());
exports.FechaComponent = FechaComponent;
