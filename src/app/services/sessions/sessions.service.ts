import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Batch } from 'src/app/model/batch';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Session } from 'src/app/model/session';
import { catchError } from 'rxjs/operators';
import { TeckersError } from 'src/app/model/error';

@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  protected urlEndpoint = `${environment.backendUrl}/api/batch/program/`;
  protected urlEndpointSession = `${environment.backendUrl}/api/session/`;

  constructor(private httpClient: HttpClient) { }

   getBatchByPrograms(programId: string): Observable<Batch[]> {
    return this.httpClient.get<Batch[]>(this.urlEndpoint + programId );
  }

  getSessionsByBatch(batchId: string): Observable<Session[]> {
    return this.httpClient.get<Session[]>(this.urlEndpointSession + 'batch/' + batchId );
  }

  addSession(session: Session): Observable<Session> {
    return this.httpClient.post<Session>(this.urlEndpointSession, session);
  }

  save(session: Session) {
    return this.httpClient.put<Session>(this.urlEndpointSession, session);
  }

  delete(id: string) {
    return this.httpClient.delete<Session>(this.urlEndpointSession + id)
    .pipe(catchError(error => {
      console.log(error);
      return throwError(new TeckersError(error.error.error, error.error.message));
    }));
  }
}
