import { Injectable } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { auditTrail } from '@angular/fire/database';
import { auth } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afsAuth: AngularFireAuth) { }

  loginGoogleUser() {
    return this.afsAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }
  logoutUser() {
   return this.afsAuth.auth.signOut();
  }

  isAuth() {
    // tslint:disable-next-line: no-shadowed-variable
    return this.afsAuth.authState.pipe(map( auth => auth));
  }
}
