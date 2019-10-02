import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Batch} from '../../model/batch';

@Injectable({
  providedIn: 'root'
})
export class BatchesService {

  protected urlEndpoint = `${environment.backendUrl}/api/batch`;

  constructor(private httpClient: HttpClient) { }

  public getBatches(): Observable<Batch[]> {
    return this.httpClient.get<Batch[]>(this.urlEndpoint);
  }


  public addProgram(batch: Batch): Observable<Batch> {

    return this.httpClient.post<Batch>(this.urlEndpoint, batch);
  }

}
