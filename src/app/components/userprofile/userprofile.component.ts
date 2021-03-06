import { Component, OnInit } from '@angular/core';
import { LoggedUser } from '../../model/logged-user';
import { AuthService } from '../../services';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from 'src/app/model';
import { UsersService } from '../../services/Users/users.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {
  loggedUser: LoggedUser;
  isUser = false;
  user: User;
  messageErrorName: string;
  messageErrorEmail: string;
  messageErrorNumber: string;
  name: string;
  preferredEmail: string;
  phoneNumber: string;
  pictureUrl: string;
  messageSuccess: string;

  constructor(private authService: AuthService, private storage: AngularFireStorage,
    private UserActive: UsersService, private translate: TranslateService) {
    if (this.authService.isAuthenticated()) {
      this.loggedUser = this.authService.getLoggedUser();
      if (!this.isUser) {
        this.refreshInformation();
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
    this.translate.get('MESSAGE_NAME').subscribe((text: string) => { this.messageErrorName = text; });
    this.translate.get('MESSAGE_EMAIL').subscribe((text: string) => { this.messageErrorEmail = text; });
    this.translate.get('MESSAGE_NUMBER').subscribe((text: string) => { this.messageErrorNumber = text; });
    this.translate.get('MESSAGE_SUCCESS').subscribe((text: string) => { this.messageSuccess = text; });
    if (this.user.name === '') {
      Swal.fire(
        'Error!',
        this.messageErrorName,
        'error'
      );
    } else {
      if (!this.user.preferredEmail.includes('@')) {
        Swal.fire(
          'Error!',
          this.messageErrorEmail,
          'error'
        );
      } else {
        if (this.user.phoneNumber.length !== 10) {
          Swal.fire(
            'Error!',
            this.messageErrorNumber,
            'error'
          );
        } else {
          this.UserActive.updateProfileInformation(this.user).subscribe(data => {
            if (data) {
              this.refreshInformation();
              Swal.fire({
                position: 'top',
                type: 'success',
                title: this.messageSuccess,
                showConfirmButton: false,
                timer: 1500
              });
            }
          });
        }
      }
    }
  }

  public refreshInformation() {
    this.UserActive.getProfileInformation().subscribe(data => {
      this.user = data;
      this.name = this.user.name;
      this.preferredEmail = this.user.preferredEmail;
      this.phoneNumber = this.user.phoneNumber;
      this.pictureUrl = this.user.pictureUrl;
    });
  }

  public onUpload(e) {
    const file = e.target.files[0];
    const filePath = 'upload/image.png';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  }

}
