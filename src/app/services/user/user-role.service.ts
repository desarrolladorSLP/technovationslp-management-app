import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {UserRole} from '../../model/user-role';

@Injectable({
  providedIn: 'root'
})
export class UserRoleService {

  protected urlEndpoint = `${environment.backendUrl}/api/user/role/`;

  constructor(private httpClient: HttpClient) { }

  getUserRole(): Observable<UserRole[]> {
    return this.httpClient.get<UserRole[]>(this.urlEndpoint + 'ROLE_ADMINISTRATOR');
  }

  getUsersTecker(): Observable<UserRole[]> {
    return this.httpClient.get<UserRole[]>(this.urlEndpoint + 'ROLE_TECKER');
  }
}
