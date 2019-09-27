import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Program} from '../../model/program';
import { catchError, tap } from 'rxjs/operators';
import { TeckersError } from 'src/app/model/error';


@Injectable({
  providedIn: 'root'
})
export class ProgramsService {

  protected urlEndpoint = `${environment.backendUrl}/api/program`;

  constructor(private httpClient: HttpClient) {
  }

  public getPrograms(): Observable<Program[]> {
    return this.httpClient.get<Program[]>(`${this.urlEndpoint}?random=${Math.random()}`);

  }

  public addProgram(program: Program): Observable<Program> {

    return this.httpClient.post<Program>(this.urlEndpoint, program);
  }

  save(program: Program) {
    return this.httpClient.put<Program>(this.urlEndpoint, program);
  }

  delete(id: string) {
    return this.httpClient.delete<Program>(this.urlEndpoint + '/' + id)
    .pipe(catchError(error => {
      console.log(error);
      return throwError(new TeckersError(error.error.error, error.error.message));
    }));
  }
}
