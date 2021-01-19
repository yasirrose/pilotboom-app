"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TextTemplatesPageModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var angular_1 = require("@ionic/angular");
var text_templates_routing_module_1 = require("./text-templates-routing.module");
var text_templates_page_1 = require("./text-templates.page");
var TextTemplatesPageModule = /** @class */ (function () {
    function TextTemplatesPageModule() {
    }
    TextTemplatesPageModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                forms_1.FormsModule,
                angular_1.IonicModule,
                text_templates_routing_module_1.TextTemplatesPageRoutingModule,
                forms_1.ReactiveFormsModule
            ],
            declarations: [text_templates_page_1.TextTemplatesPage]
        })
    ], TextTemplatesPageModule);
    return TextTemplatesPageModule;
}());
exports.TextTemplatesPageModule = TextTemplatesPageModule;
