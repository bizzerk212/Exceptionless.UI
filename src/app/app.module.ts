import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2UiAuthModule } from 'ng2-ui-auth';
import { ToastrModule } from 'ngx-toastr';
import { LockerModule } from 'angular-safeguard';
import { HotkeyModule } from 'angular2-hotkeys';
import { NgxAnalyticsModule } from 'ngx-analytics';
import { NgxAnalyticsGoogleAnalytics } from 'ngx-analytics/ga';
import { ModalDialogModule } from 'ngx-modal-dialog';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { IntercomModule } from 'ng-intercom';
import { NgxStripeModule } from '@nomadreservations/ngx-stripe';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/auth/login/login.component';
import { ForgotPasswordComponent } from './components/auth/forgot-password/forgot-password.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { TokenInterceptor } from './service/token.interceptor';
import { AuthGuardService } from './service/auth-guard.service';
import { OrganizationService } from './service/organization.service';
import { FilterService } from './service/filter.service';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { CustomDateRangeDialogComponent } from './dialogs/custom-date-range-dialog/custom-date-range-dialog.component';
import { AddReferenceDialogComponent } from './dialogs/add-reference-dialog/add-reference-dialog.component';
import { ChangePlanDialogComponent } from './dialogs/change-plan-dialog/change-plan-dialog.component';
import { HasPropPipe } from './pipes/has-prop.pipe';
import { AddConfigurationDialogComponent } from './dialogs/add-configuration-dialog/add-configuration-dialog.component';
import { AddWebHookDialogComponent } from './dialogs/add-web-hook-dialog/add-web-hook-dialog.component';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import { AddOrganizationDialogComponent } from './dialogs/add-organization-dialog/add-organization-dialog.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RateLimitComponent } from './components/rate-limit/rate-limit.component';
import { ResetPasswordComponent } from './components/auth/reset-password/reset-password.component';
import { EmailUniqueValidatorDirective } from './validators/email-unique.validator';
import { OrganizationUniqueValidatorDirective } from './validators/organization-unique.validator';
import { SemanticVersionValidatorDirective } from './validators/semantic-version.validator';
import { MarkFixedDialogComponent } from './dialogs/mark-fixed-dialog/mark-fixed-dialog.component';
import { SemverDirective } from './directives/semver.directive';
import { StatusComponent } from './components/status/status.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';

export const AuthConfig = {
    defaultHeaders: {'Content-Type': 'application/json'},
    providers: {
        google: { clientId: environment.GOOGLE_APPID },
        facebook: { clientId: environment.FACEBOOK_APPID },
        github: { clientId: environment.GITHUB_APPID },
        live: { clientId: environment.LIVE_APPID }
    },
    tokenName: 'token',
};

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ForgotPasswordComponent,
        SignupComponent,
        ConfirmDialogComponent,
        CustomDateRangeDialogComponent,
        AddReferenceDialogComponent,
        ChangePlanDialogComponent,
        HasPropPipe,
        AddConfigurationDialogComponent,
        AddWebHookDialogComponent,
        AddUserDialogComponent,
        AddOrganizationDialogComponent,
        PaymentComponent,
        RateLimitComponent,
        ResetPasswordComponent,
        EmailUniqueValidatorDirective,
        OrganizationUniqueValidatorDirective,
        SemanticVersionValidatorDirective,
        MarkFixedDialogComponent,
        SemverDirective,
        StatusComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule, // required animations module
        ToastrModule.forRoot({
            positionClass: 'toast-bottom-right'
        }), // ToastrModule added
        LockerModule,
        ModalDialogModule.forRoot(),
        NgbModule.forRoot(),
        Daterangepicker,
        Ng2UiAuthModule.forRoot(AuthConfig),
        HotkeyModule.forRoot(),
        NgxAnalyticsModule.forRoot([NgxAnalyticsGoogleAnalytics]),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        IntercomModule.forRoot({
            appId: environment.INTERCOM_APPID
        }),
        NgxStripeModule.forRoot(environment.STRIPE_PUBLISHABLE_KEY),
        LoadingBarRouterModule,
        LoadingBarHttpClientModule
    ],
    providers: [
        AuthGuardService,
        OrganizationService,
        FilterService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent],
    entryComponents: [
        ConfirmDialogComponent,
        CustomDateRangeDialogComponent,
        AddReferenceDialogComponent,
        AddOrganizationDialogComponent,
        MarkFixedDialogComponent,
        ChangePlanDialogComponent,
        AddUserDialogComponent,
        AddConfigurationDialogComponent,
        AddWebHookDialogComponent
    ]
})

export class AppModule {
}