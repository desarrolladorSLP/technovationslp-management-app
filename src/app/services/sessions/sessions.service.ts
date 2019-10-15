import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Batch } from 'src/app/model/batch';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Session } from 'src/app/model/session';

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
}
