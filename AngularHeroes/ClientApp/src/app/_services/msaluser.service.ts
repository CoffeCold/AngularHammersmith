import { Injectable } from '@angular/core';
import * as Msal from 'msal';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

const msalConfig = {
  auth: {
    clientId: environment.uiClienId,
    authority: 'https://login.microsoftonline.com/' + environment.tenantId,
    redirectUri: environment.redirectUrl,
    navigateToLoginRequestUrl: false,
  }
};

const msalConfigs = {
  auth: {
    clientId: environment.uiClienId,
    authority: 'https://login.microsoftonline.com/' + environment.tenantId,
    redirectUri: environment.redirectUrl,
    navigateToLoginRequestUrl: false,

  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: isIE, // set to true for IE 11
  },
};

@Injectable()
export class MsalUserService {



  private accessToken: any;
  public clientApplication: Msal.UserAgentApplication = null;
  constructor() {
    this.clientApplication = new Msal.UserAgentApplication(msalConfig);
    this.clientApplication.handleRedirectCallback((error, response) => {
      this.authCallback (error.errorMessage, response.accessToken, error, response.tokenType)
    });
  }

  public GetAccessToken(): Observable<any> {
    if (sessionStorage.getItem('msal.idtoken') !== undefined && sessionStorage.getItem('msal.idtoken') != null) {
      this.accessToken = sessionStorage.getItem('msal.idtoken');
    }
    return this.accessToken;
  }

  public authCallback(errorDesc, token, error, tokenType) {
    if (token) {

    } else {
      console.log(error + ':' + errorDesc);
    }
  }

  public getCurrentUserInfo() {
    const user = this.clientApplication.getAccount();
    alert(user.name);
  }

  public logout() {
    this.clientApplication.logout();
  }
}  
