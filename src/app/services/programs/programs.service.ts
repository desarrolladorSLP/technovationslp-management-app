import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Program} from '../../model/program';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  constructor(private httpClient: HttpClient) {
  }

  protected urlEndpoint = `${environment.backendUrl}/api/program`;



  /**
   * get the list of program from Backend
   */
  public getPrograms(): Observable<Program[]> {
    return this.httpClient.get<Program[]>(`${this.urlEndpoint}?random=${Math.random()}`);

  }
  /**
   *add a new Program
   */
  public addProgram(program: Program): Observable<Program> {

    return this.httpClient.post<Program>(this.urlEndpoint, program);
  }

  save(program: Program) {
    return this.httpClient.put<Program>(this.urlEndpoint, program);
  }

  delete(program: Program) {
    return this.httpClient.delete<Program>(this.urlEndpoint +'/'+ program.id );
  }
}
