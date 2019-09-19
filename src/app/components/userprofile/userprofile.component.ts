import { Component, OnInit } from '@angular/core';
import { LoggedUser } from '../../model/logged-user';
import { AuthService } from '../../services';
import { AngularFireStorage } from '@angular/fire/storage';
import { User } from 'src/app/model';
import { ActiveService } from '../../services/Users/myinformation.service';

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
        UserActive.getMyInformation().subscribe(data => {
          this.user = data;
          this.name = data.name;
          this.preferredEmail = data.preferredEmail;
          this.phoneNumber = data.phoneNumber;
          this.imageProfile = data.pictureUrl;
        });
      }
    }
  }

  ngOnInit() {
  }

  public updateInformationUser() {
    if (this.name) {
      if (this.preferredEmail && this.preferredEmail.includes('@')) {
        if (this.phoneNumber && this.phoneNumber.toString().length === 10) {
          this.user.name = this.name;
          this.user.pictureUrl = this.pictureUrl;
          this.user.preferredEmail = this.preferredEmail;
          this.user.phoneNumber = this.phoneNumber;
          this.UserActive.updateUserActive(this.user).subscribe(data => {
            if (data) {
              alert('informacion actualizada correctamente');
            } else {
              alert('Hubo un problema al intentar actualizar la información');
            }
          });
        } else {
          console.log(this.phoneNumber.toString().length);
          alert('el numero de telefono no cuenta con el formato correcto');
        }
      } else {
        alert('por favor ingresa el un email valido');
      }
    } else {
      alert('por favor ingresa un nombre');
    }
  }

  public onUpload(e) {
    const file = e.target.files[0];
    const filePath = 'upload/image.png';
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
  }

}
