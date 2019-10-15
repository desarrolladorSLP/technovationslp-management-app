import { Component, OnInit, Input } from '@angular/core';
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

  @Input() session: Session;
  messageDelete: string;
  yesdelete: string;
  updatingSession = false;
  @Input() batchId: string;

  constructor(private sessionsService: SessionsService, private translate: TranslateService) { }

  updateSession() {
    this.session.batchId = this.batchId;
    console.log(this.session);
    this.sessionsService.save(this.session).subscribe(() => {
      this.updatingSession = false;
    });
  }

  showAlertDelete() {
    this.translate.get('DELETE_SESSION').subscribe((text: string) => { this.messageDelete = text; });
    this.translate.get('YES').subscribe((text: string) => { this.yesdelete = text; });
    swal.fire({
       title: this.messageDelete ,
       text: this.session.title,
       type: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       cancelButtonText: 'No',
       confirmButtonText: this.yesdelete,
     }).then((result) => {
       if (result.value) {
         // this.deleteProgram();
       }
     } );
  }

}
