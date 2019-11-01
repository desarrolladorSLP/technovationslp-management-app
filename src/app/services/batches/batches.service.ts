import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Batch} from '../../model/batch';
import { catchError } from 'rxjs/operators';
import { TeckersError } from 'src/app/model/error';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {

  protected urlEndpoint = `${environment.backendUrl}/api/batch`;

  constructor(private httpClient: HttpClient) { }

  public getBatches(): Observable<Batch[]> {
    return this.httpClient.get<Batch[]>(this.urlEndpoint);
  }


  public addBatch(batch: Batch): Observable<Batch> {
    return this.httpClient.post<Batch>(this.urlEndpoint, batch);
  }

  getBatchbyProgram(programId) {
    const urlEndpoint = `${environment.backendUrl}/api/batch/program/${programId}`;
    return this.httpClient.get<Batch[]>(urlEndpoint);
  }

  update(batch: Batch) {
    return this.httpClient.put<Batch>(this.urlEndpoint, batch);
  }

  delete(id: string) {
    return this.httpClient.delete<Batch>(this.urlEndpoint + '/' + id)
    .pipe(catchError(error => {
      console.log(error);
      return throwError(new TeckersError(error.error.error, error.error.message));
    }));
  }
}
