import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Session } from 'src/app/model/session';
import swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';
import { SessionsService } from 'src/app/services/sessions/sessions.service';

@Component({
  selector: 'app-session-card',
  templateUrl: './session-card.component.html',
  styles: []
})
export class SessionCardComponent  {
  @Output() public sessionDeleted = new EventEmitter();
  @Input() session: Session;
  messageDelete: string;
  yesDelete: string;
  updatingSession = false;


  constructor(private sessionsService: SessionsService, private translate: TranslateService) { }

  updateSession() {
    this.sessionsService.save(this.session).subscribe(() => {
      this.updatingSession = false;
    });
  }

  showAlertDelete() {
    this.translate.get('DELETE_SESSION').subscribe((text: string) => { this.messageDelete = text; });
    this.translate.get('YES').subscribe((text: string) => { this.yesDelete = text; });
    swal.fire({
       title: this.messageDelete ,
       text: this.session.title,
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       cancelButtonText: 'No',
       confirmButtonText: this.yesDelete,
     }).then((result) => {
       if (result.value) {
          this.deleteSession();
       }
     } );
  }

  deleteSession() {
      this.sessionsService.delete(this.session.id).subscribe(data => {
      this.sessionDeleted.emit();
        this.translate.get('DELETED').subscribe((text => {
        swal.fire(
          {
            type: 'success',
            text: text,
          }
        );
      }));
    },
    error => swal.fire(
      {
        title: 'Error',
        text: error.message,
      }
    )
    );
  }

}
