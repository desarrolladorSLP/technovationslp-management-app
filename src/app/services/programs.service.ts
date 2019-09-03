
import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {LoggedUser} from '../model/logged-user';
import { Observable } from 'rxjs';
import {tap, map} from 'rxjs/operators';
import { Program } from '../model/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  protected urlEndpoint = `${environment.backendUrl}/api/program`;
  //protected credentials = btoa(`${environment.client.username}:${environment.client.password}`);

  constructor(private httpClient: HttpClient) { }

  /**
   * showPrograms
   */
  public getPrograms(): Observable<Program[]> {

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ sessionStorage.getItem('ACCESS_TOKEN')}`
    });

    return this.httpClient.get<Program[]>(this.urlEndpoint, {headers : httpHeaders });
  }

  public addProgram(program: Program): Observable<Program> {

    return this.httpClient.post<Program>(this.urlEndpoint , program );
  }
}
