import {Component, Input, OnInit} from "@angular/core";
import {LoggedUser} from "../../model/logged-user";
import {Router} from "@angular/router";
import {AuthService} from '../../services';
import {TranslateService} from '@ngx-translate/core';
import {TranslationComponent} from "src/app/translation/translation.component";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedUser: LoggedUser;
  @Input() translation: TranslationComponent;

  constructor(private router: Router,
              private authService: AuthService,
              private translate: TranslateService) {
    this.translate.setDefaultLang('es');

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

  setLanguage(language) {
    this.translate.setDefaultLang(language);
  }

}
