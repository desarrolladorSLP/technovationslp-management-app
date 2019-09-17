import { Component, OnInit } from '@angular/core';
import { LoggedUser } from '../../model/logged-user';
import { AuthService } from '../../services';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from 'src/app/model';
import { ActiveService } from '../../services/Users/active.service';

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
  name: string;
  preferredEmail: string;
  phoneNumber: string;
  pictureUrl: string;

  constructor(private authService: AuthService, private storage: AngularFireStorage, private UserActive: ActiveService) {
    if (this.authService.isAuthenticated()) {
      this.loggedUser = this.authService.getLoggedUser();
      if (!this.isUser) {
        UserActive.getMyInformation().subscribe();
      }
    }
  }

  ngOnInit() {
  }

  public updateInformationUser() {
    this.user.name = this.name;
    this.user.pictureUrl = this.pictureUrl;
    this.user.preferredEmail = this.preferredEmail;
    this.user.phoneNumber = this.phoneNumber;
   //this.updateUserActive(this.user).subscribe();
  }

  public onUpload(e) {
    const file = e.target.files[0];
    const filePath = 'upload/image.png';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  }

}
