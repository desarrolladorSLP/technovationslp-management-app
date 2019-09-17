import { EventEmitter, Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { tap } from 'rxjs/operators';
import { Observable } from "rxjs";

import * as firebase from 'firebase/app';

import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoggedUser } from "../../model/logged-user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private ACCESS_TOKEN = 'ACCESS_TOKEN';
  private loggedUser: LoggedUser;
  onLogin: EventEmitter<LoggedUser> = new EventEmitter();
  onLogout: EventEmitter<void> = new EventEmitter();

  constructor(private angularFirebaseAuthenticator: AngularFireAuth,
    private httpClient: HttpClient,
    private ngZone: NgZone) {
    const accessToken = sessionStorage.getItem(this.ACCESS_TOKEN);
    if (accessToken) {
      this.loggedUser = this.buildUser(accessToken);
    }
  }

  public doGoogleLogin(): Observable<LoggedUser> {
    return new Observable<LoggedUser>(subscriber => {
      const provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      this.angularFirebaseAuthenticator.auth
        .signInWithPopup(provider)
        .then(res => {
          console.log(res.user['ra']);
          if (res.user && res.user['ra']) {
            this.ngZone.run(() =>
              this.loginWithBackend(res.user['ra']).subscribe(user => {
                subscriber.next(user);
                subscriber.complete();
                this.onLogin.emit(user);
              }));
          }
        });
    });
  }

  public logout(): Observable<void> {
    return new Observable<void>(subscriber => {
      sessionStorage.removeItem(this.ACCESS_TOKEN);
      this.angularFirebaseAuthenticator.auth.signOut()
        .then(() => {
          subscriber.next();
          subscriber.complete();
          this.onLogout.emit();
        });
    });
  }

  public isAuthenticated(): boolean {
    return !!this.loggedUser;
  }

  getLoggedUser(): LoggedUser {
    const accessToken = sessionStorage.getItem(this.ACCESS_TOKEN);
    if (accessToken) {
      this.loggedUser = this.buildUser(accessToken);
    }
    return this.loggedUser;
  }

  private loginWithBackend(tokenId: string): Observable<LoggedUser> {
    const urlEndpoint = `${environment.backendUrl}/oauth/token`;
    const credentials = btoa(`${environment.client.username}:${environment.client.password}`);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credentials}`
    });
    const params = new URLSearchParams();
    params.set('grant_type', 'firebase');
    params.set('firebase_token_id', tokenId);

    return this.httpClient.post<LoggedUser>(urlEndpoint, params.toString(), { headers: httpHeaders })
      .pipe(
        tap(response => {
          console.log(response);
          this.loggedUser = response;
          sessionStorage.setItem(this.ACCESS_TOKEN, this.loggedUser.access_token);
        }));
  }

  private buildUser(accessToken: string): LoggedUser {
    if (accessToken) {
      const parsedAccessToken = accessToken.split('.')[1];
      const userInfo: any = JSON.parse(atob(parsedAccessToken));
      this.loggedUser = new LoggedUser();

      this.loggedUser.access_token = accessToken;
      this.loggedUser.name = userInfo.name;
      this.loggedUser.email = userInfo.email;
      this.loggedUser.enabled = userInfo.enabled;
      this.loggedUser.expiresIn = userInfo.expiresIn;
      this.loggedUser.validated = userInfo.validated;
      return this.loggedUser;
    }
    return null;
  }

  hasRole(role: string) {
    return true;
  }

  isExpired() {
    return false;
  }
}
