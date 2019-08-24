import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {AngularFireAuth} from '@angular/fire/auth';
import {HttpClientModule} from '@angular/common/http';


import {environment} from '../environments/environment';
import {NavbarComponent} from "./components/navbar/navbar.component";
import {Page404Component} from "./components/page404/page404.component";
import {FooterComponent} from './components/footer/footer.component';
import {RouterModule, Routes} from "@angular/router";

const ROUTES: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '**', component: Page404Component}
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Page404Component,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule {
}
