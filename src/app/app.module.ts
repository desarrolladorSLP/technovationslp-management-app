import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { ProgramsComponent } from './components/programs/programs.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';


import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Page404Component } from './components/page404/page404.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserprofileComponent } from './components/userprofile/userprofile.component';

import { RouterModule, Routes } from '@angular/router';
import { TokenInterceptor } from './services/auth/token.interceptor';
import { ProgramCardComponent } from './components/program-card/program-card.component';
import { FilterPipe } from './pipes/filter.pipe';
import { SessionsComponent } from './components/sessions/sessions.component';
import { SessionCardComponent } from './components/session-card/session-card.component';
import { FilterSessionPipe } from './pipes/filter-session.pipe';
import {BatchesComponent } from './components/batches/batches.component';
import {BatchesCardComponent } from './components/batches-card/batches-card.component';
import { DxTabPanelModule, DxListModule, DxPopupModule,DxButtonModule } from 'devextreme-angular';

import { NgxTagsInputModule } from 'ngx-tags-input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActiveComponent } from './components/user/active/active.component';
import { InactiveComponent } from './components/user/inactive/inactive.component';
import { MentorTeckerComponent } from './components/mentor-tecker/mentor-tecker.component';

const ROUTES: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: 'programs', component: ProgramsComponent},
  {path: 'sessions', component: SessionsComponent},
  {path: 'batches', component: BatchesComponent},
  { path: 'profile', component: UserprofileComponent },
  { path: 'users/active', component: ActiveComponent },
  { path: 'users/inactive', component: InactiveComponent },
  { path: 'users/Mentor', component: MentorTeckerComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Page404Component,
    FooterComponent,
    UserprofileComponent,
    FilterPipe,
    SessionCardComponent,
    SessionsComponent,
    FilterSessionPipe,
    ProgramsComponent,
    ProgramCardComponent,
    BatchesComponent,
    BatchesCardComponent,
    ActiveComponent,
    InactiveComponent,
    ProgramsComponent,
    MentorTeckerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxTagsInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DxTabPanelModule,
    DxPopupModule,
    DxListModule,
    DxButtonModule ,
    RouterModule.forRoot(ROUTES),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader, useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [HttpClient]
      }
    })
  ],
  providers: [AngularFireAuth, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
