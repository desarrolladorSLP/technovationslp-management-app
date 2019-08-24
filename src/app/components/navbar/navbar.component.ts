import {Component, OnInit} from "@angular/core";
import {LoggedUser} from "../../model/logged-user";
import {Router} from "@angular/router";
import {AuthService} from "../../services";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedUser: LoggedUser;

  constructor(private router: Router,
              private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      this.loggedUser = this.authService.getLoggedUser();
    }

    this.authService.onLogin.subscribe(user => {
      this.loggedUser = user;
      this.router.navigate(['programs']).then();
    });

    this.authService.onLogout.subscribe(() => {
      this.loggedUser = null;
      this.router.navigate(['']).then();
    });
  }

  loginWithGoogle() {
    this.authService.doGoogleLogin().subscribe();
  }

  onLogout() {
    this.authService.logout().subscribe();
  }
}
