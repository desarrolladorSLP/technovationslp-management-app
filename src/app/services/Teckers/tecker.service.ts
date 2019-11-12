import { Injectable } from '@angular/core';
import { ParentTecker } from 'src/app/model/parent-tecker';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeckerService {

  protected urlEndpoint = `${environment.backendUrl}/api/parent/`;
  constructor(private httpClient: HttpClient) {
  }

  save(parentId: string, teckerId: string []) {
    alert( teckerId);
    return this.httpClient.put< string []>(this.urlEndpoint + parentId, teckerId );
  }

  teckersByParents(parentId): Observable<ParentTecker[]> {
    return this.httpClient.get<ParentTecker[]>(this.urlEndpoint + parentId);
  }
}
