import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Program} from '../../model/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  protected urlEndpoint = `${environment.backendUrl}/api/program`;

  constructor(private httpClient: HttpClient) {
  }

  /**
   * showPrograms
   */
  public getPrograms(): Observable<Program[]> {
    //return this.httpClient.get<Program[]>(this.urlEndpoint, {headers: httpHeaders});
    return this.httpClient.get<Program[]>(`${this.urlEndpoint}?random=${Math.random()}`);

  }

  public addProgram(program: Program): Observable<Program> {

    return this.httpClient.post<Program>(this.urlEndpoint, program);
  }
}
