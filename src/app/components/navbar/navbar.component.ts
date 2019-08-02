import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private router: Router, private authService: AuthService) { }
  public islogged = false;
  public info;

  ngOnInit() {
    this.getCurrentUser();
  }

  onlogin() {
    this.authService.loginGoogleUser()
    .then ((res) => {
      this.info = res.user.displayName;
      console.log('resUser', res);
      this.router.navigate(['main']);
    }).catch (err => console.log('err' , err ));
  }

  onlogout() {
    this.authService.logoutUser();
    this.router.navigate(['']);
  }

  getCurrentUser() {
    // tslint:disable-next-line: no-shadowed-variable
    this.authService.isAuth().subscribe( auth => {
      if (auth) {
        this.islogged = true;
      } else {
        this.islogged = false;
      }
    });
  }

  generateAuthString() {
    return 'Basic ' + btoa(this.info);
  }
}
