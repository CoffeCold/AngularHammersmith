import { NgModule }       from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule }    from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule }    from '@angular/common/http';
import { MatToolbarModule, MatButtonModule, MatListModule } from '@angular/material';
import { MsalModule, MsalInterceptor } from '@azure/msal-angular';

import { AppRoutingModule }     from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { HeroDetailComponent }  from './hero-detail/hero-detail.component';
import { HeroesComponent }      from './heroes/heroes.component';
import { HeroSearchComponent }  from './hero-search/hero-search.component';
import { MessagesComponent }    from './messages/messages.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    HeroSearchComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MsalModule.forRoot({
      auth: {
        clientId: '4d13a0f9-eeff-4a4f-9f05-4d13a0f94a4f', // fake
        authority: 'https://login.microsoftonline.com/af5bff61-3f3a-94a4f-9015-4d13a0f994a4f', // fake
        redirectUri: 'http://localhost:4200/',
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE, // set to true for IE 11
      },
    },
      {
        popUp: !isIE,
        consentScopes: [
          'user.read',
          'openid',
          'profile',
        ],
        unprotectedResources: [],
        protectedResourceMap: [
          ['https://graph.microsoft.com', ['user.read']]
        ],
        extraQueryParameters: {}
      })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
