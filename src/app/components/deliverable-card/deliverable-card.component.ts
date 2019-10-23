import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Batch } from 'src/app/model/batch';
import { Program } from 'src/app/model/program';
import swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';
import { Deliverable } from 'src/app/model/deliverables';
import { DeliverablesService } from 'src/app/services/deliverables/deliverables.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deliverable-card',
  templateUrl: './deliverable-card.component.html',
  styles: []
})

export class DeliverableCardComponent {

  @Input() deliverable: Deliverable;
  @Output() public batchDeleted = new EventEmitter();
  @Input()  listBatch: Batch[];
  public updatingBatch = false;
  public deletingBatch = false;
  yesdelete: string;
  batch: string;
  messageSucess: string;
  messageDeleted: string;

  constructor(private deliverableService: DeliverablesService, private translate: TranslateService) {
  }

   updateDeliverable() {
    this.translate.get('MESSAGE_SUCCESS').subscribe((text: string) => { this.messageSucess = text; });
     this.updatingBatch = !this.updatingBatch;
      this.deliverableService.updateDeliverable(this.deliverable, this.deliverable.id).subscribe(data => {
        this.updatingBatch = false;
        this.batchDeleted.emit();
        Swal.fire({
          position: 'top',
          type: 'success',
          title: this.messageSucess,
          showConfirmButton: false,
          timer: 1500
        });
      });
  }

  deleteDeliverable() {
    this.translate.get('MESSAGE_SUCCESS').subscribe((text: string) => { this.messageSucess = text; });
    this.deliverableService.deleteDeliverable(this.deliverable.id).subscribe(data => {
      this.deletingBatch = false;
      this.batchDeleted.emit();
      Swal.fire({
        position: 'top',
        type: 'success',
        title: this.messageSucess,
        showConfirmButton: false,
        timer: 1500
      });
    });
  }

  showAlertDelete() {
    this.translate.get('DELETED_DELIVERABLE').subscribe((text: string) => { this.messageDeleted = text; });
    this.translate.get('YES').subscribe((text: string) => { this.yesdelete = text; });
    swal.fire({
      title: this.messageDeleted,
      text: this.deliverable.title,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.yesdelete
    }).then((result) => {
      if (result.value) {
        this.deleteDeliverable();
      }
    } );
  }
}
