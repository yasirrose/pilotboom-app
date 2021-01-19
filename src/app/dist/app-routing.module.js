"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var auth_guard_1 = require("./services/auth.guard");
var routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/login/login.module'); }).then(function (m) { return m.LoginPageModule; }); }
    },
    {
        path: 'dashboard',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/dashboard/dashboard.module'); }).then(function (m) { return m.DashboardPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'contacts',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/contacts/contacts.module'); }).then(function (m) { return m.ContactsPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'companies',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/companies/companies.module'); }).then(function (m) { return m.CompaniesPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'activities',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/activities/activities.module'); }).then(function (m) { return m.ActivitiesPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'schedules',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/schedules/schedules.module'); }).then(function (m) { return m.SchedulesPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'posts',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/posts/posts.module'); }).then(function (m) { return m.PostsPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'addcontact',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/add-contact/add-contact.module'); }).then(function (m) { return m.AddContactPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'addcompany',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/add-company/add-company.module'); }).then(function (m) { return m.AddCompanyPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'contact-details',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/contact-details/contact-details.module'); }).then(function (m) { return m.ContactDetailsPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'edit-contact',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/edit-contact/edit-contact.module'); }).then(function (m) { return m.EditContactPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'company-details',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/company-details/company-details.module'); }).then(function (m) { return m.CompanyDetailsPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'edit-company',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/edit-company/edit-company.module'); }).then(function (m) { return m.EditCompanyPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'contact-groups',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/contact-groups/contact-groups.module'); }).then(function (m) { return m.ContactGroupsPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'contact-group-subs',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/contact-group-subs/contact-group-subs.module'); }).then(function (m) { return m.ContactGroupSubsPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'add-contact-group',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/add-contact-group/add-contact-group.module'); }).then(function (m) { return m.AddContactGroupPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'edit-contact-group',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/edit-contact-group/edit-contact-group.module'); }).then(function (m) { return m.EditContactGroupPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'contact-activities',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/contact-activities/contact-activities.module'); }).then(function (m) { return m.ContactActivitiesPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'add-activity',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/add-activity/add-activity.module'); }).then(function (m) { return m.AddActivityPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'edit-activity',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/edit-activity/edit-activity.module'); }).then(function (m) { return m.EditActivityPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'auto-blogging',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/auto-blogging/auto-blogging.module'); }).then(function (m) { return m.AutoBloggingPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'autoblog-details',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/autoblog-details/autoblog-details.module'); }).then(function (m) { return m.AutoblogDetailsPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'add-autoblog',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/add-autoblog/add-autoblog.module'); }).then(function (m) { return m.AddAutoblogPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'edit-autoblog',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/edit-autoblog/edit-autoblog.module'); }).then(function (m) { return m.EditAutoblogPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'subscribe',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/subscribe/subscribe.module'); }).then(function (m) { return m.SubscribePageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'users',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/users/users.module'); }).then(function (m) { return m.UsersPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'add-user',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/add-user/add-user.module'); }).then(function (m) { return m.AddUserPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'edit-user',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/edit-user/edit-user.module'); }).then(function (m) { return m.EditUserPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'chat-listing',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/chat-listing/chat-listing.module'); }).then(function (m) { return m.ChatListingPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'chat',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/chat/chat.module'); }).then(function (m) { return m.ChatPageModule; }); },
        canActivate: [auth_guard_1.AuthGuard]
    },
    {
        path: 'text-templates',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./modal/text-templates/text-templates.module'); }).then(function (m) { return m.TextTemplatesPageModule; }); }
    },
    {
        path: 'add-template',
        loadChildren: function () { return Promise.resolve().then(function () { return require('./pages/add-template/add-template.module'); }).then(function (m) { return m.AddTemplatePageModule; }); }
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                router_1.RouterModule.forRoot(routes, { preloadingStrategy: router_1.PreloadAllModules })
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
