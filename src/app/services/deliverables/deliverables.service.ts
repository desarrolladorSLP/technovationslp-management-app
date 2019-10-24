import { Injectable } from '@angular/core';
import { Deliverable } from '../../model/deliverables';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Tecker } from 'src/app/model/tecker';

@Injectable({
  providedIn: 'root'
})
export class DeliverablesService {


  constructor(private httpClient: HttpClient) { }

  public getDeliverablesforBatch(batchId: string): Observable<Deliverable[]> {
    const urlEndpoint = `${environment.backendUrl}/api/deliverable/batch/` + batchId;
    return this.httpClient.get<Deliverable[]>(urlEndpoint);
  }

  public addDeliverable(deliverable: Deliverable): Observable<Deliverable[]> {
    const urlEndpoint = `${environment.backendUrl}/api/deliverable`;
    return this.httpClient.post<Deliverable[]>(urlEndpoint, deliverable);
  }

  public updateDeliverable(deliverable: Deliverable, deliverableId: string): Observable<Deliverable> {
    const urlEndpoint = `${environment.backendUrl}/api/deliverable/` + deliverableId;
    return this.httpClient.put<Deliverable>(urlEndpoint, deliverable);
  }
  public deleteDeliverable(deliverableId: string): Observable<Deliverable> {
    const urlEndpoint = `${environment.backendUrl}/api/deliverable/` + deliverableId;
    return this.httpClient.delete<Deliverable>(urlEndpoint);
  }
  public getTeckersforBatch(): Observable<Tecker[]> {
    // const urlEndpoint = `${environment.backendUrl}/api/deliverable/`;
    const urlEndpoint = 'https://demo1677366.mockable.io/api/batch/teckers';
    return this.httpClient.get<Tecker[]>(urlEndpoint);
  }
}
