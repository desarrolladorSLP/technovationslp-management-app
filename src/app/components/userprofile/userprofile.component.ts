import { Component, OnInit } from '@angular/core';
import { LoggedUser } from "../../model/logged-user";
import { AuthService } from '../../services';
import { environment } from 'src/environments/environment';
import { AngularFireStorage } from '@angular/fire/storage';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/model';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  loggedUser: LoggedUser;
  isUser = false;
  imageProfile: string;
  user: User;
  newUser: User;
  name: string;
  preferredEmail: string;
  phoneNumber: string;
  pictureUrl: string;

  constructor(private authService: AuthService, private httpClient: HttpClient, private storage: AngularFireStorage) {
    if (this.authService.isAuthenticated()) {
      this.loggedUser = this.authService.getLoggedUser();
      if (!this.isUser) {
        this.getMyInformation().subscribe();
      }
    }
  }

  ngOnInit() {
  }
  protected getMyInformation(): Observable<User> {
    const urlEndpoint = `${environment.backendUrl}/api/user/me`;
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.loggedUser.access_token}`,
    });
    return this.httpClient.get<User>(urlEndpoint, { headers: httpHeaders })
      .pipe(
        tap(response => {
          this.user = response;
          this.imageProfile = this.loggedUser.pictureUrl;
          this.name = this.user.name;
          this.preferredEmail = this.user.preferredEmail;
          this.phoneNumber = this.user.phoneNumber;
          this.pictureUrl = this.user.pictureUrl;
        }));
  }

  private assignNewUser() {
    this.user.name = this.name;
    this.user.pictureUrl = this.pictureUrl;
    this.user.preferredEmail = this.preferredEmail;
    this.user.phoneNumber = this.phoneNumber;
    this.UpdateUserActive(this.user).subscribe();
    console.log(this.user);
  }

  onUpload(e) {
    const file = e.target.files[0];
    const filePath = 'upload/image.png';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  }
  private UpdateUserActive(user: User): Observable<User> {
    const urlEndpoint = `${environment.backendUrl}/api/user/me`;
    const httpHeaders = new HttpHeaders({
      'Authorization': `Bearer ${this.loggedUser.access_token}`,
    });
    return this.httpClient.post<User>(urlEndpoint, user, { headers: httpHeaders }).pipe(
      tap(response => {
        console.log(response);
      })
    );
  }

}
