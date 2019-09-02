
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoggedUser} from '../model/logged-user';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import { programs } from '../model/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  private listProgram: programs[];

  constructor(private httpClient: HttpClient) { }

  /**
   * showPrograms
   */
  public getPrograms(): Observable<programs[]> {
    const urlEndpoint = `${environment.backendUrl}/api/program`;
    const credentials = btoa(`${environment.client.username}:${environment.client.password}`);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ sessionStorage.getItem('ACCESS_TOKEN')}`
    });

    return this.httpClient.get<programs[]>(urlEndpoint, { headers: httpHeaders})
    .pipe(
      tap( response => {
       this.listProgram = response;
      }
    ));
  }
}
