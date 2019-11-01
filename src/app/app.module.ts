import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ProgramsComponent } from './components/programs/programs.component';


import { environment } from '../environments/environment';
import { NavbarComponent } from './components/navbar/navbar.component';
import { Page404Component } from './components/page404/page404.component';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule, Routes } from '@angular/router';
import { TokenInterceptor } from './services/auth/token.interceptor';
import { ProgramCardComponent } from './components/program-card/program-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterPipe } from './pipes/filter.pipe';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DeliverablesComponent } from './components/deliverables/deliverables.component';
import { DeliverableCardComponent } from './components/deliverable-card/deliverable-card.component';
import { BatchesComponent } from './components/batches/batches.component';
import { BatchesCardComponent } from './components/batches-card/batches-card.component';

import {  DxListModule } from 'devextreme-angular';

const ROUTES: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'programs', component: ProgramsComponent },
  { path: 'deliverables', component: DeliverablesComponent },
  { path: 'batches', component: BatchesComponent },
  { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    Page404Component,
    FooterComponent,
    ProgramsComponent,
    ProgramCardComponent,
    FilterPipe,
    DeliverablesComponent,
    DeliverableCardComponent,
    BatchesComponent,
    BatchesCardComponent,
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    DxListModule,
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
