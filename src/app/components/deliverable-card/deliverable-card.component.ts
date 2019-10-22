import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Batch } from 'src/app/model/batch';
import { Program } from 'src/app/model/program';
import { BatchesService } from 'src/app/services/batches/batches.service';
import swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';
import { Deliverable } from 'src/app/model/deliverables';

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
  optionProgram: Program;
  messageError: string;
  yesdelete: string;
  batch: string;

  constructor(private batchService: BatchesService, private translate: TranslateService) {
    // this.listBatch.forEach(element => {
    //   if (this.deliverable.batchId === element.id) {
    //     this.batch = element.name;
    //   }
    // });
    console.log(this.listBatch);
  }

   updateBatch() {
     this.updatingBatch = !this.updatingBatch;
    // this.batchService.update(this.batch).subscribe(() => {
    //   this.updatingBatch = false;
    //   this.batchDeleted.emit();
    // });
  }

  deleteBatch() {
    // this.batchService.delete(this.batch.id).subscribe(data => {
    //   this.deletingBatch = false;
    //   this.batchDeleted.emit();
    //   this.translate.get('DELETED_BATCH').subscribe((text => {
    //     swal.fire(
    //       {
    //         type: 'success',
    //         text: text,
    //       }
    //     );
    //   }));
    // },
    // error => swal.fire(
    //   {
    //     title: 'Error',
    //     text: error.message,
    //   }
    // )
    // );
  }

  showAlertDelete() {
  //   this.translate.get('DELETE_BATCH').subscribe((text: string) => { this.messageError = text; });
  //   this.translate.get('YES').subscribe((text: string) => { this.yesdelete = text; });
  //   swal.fire({
  //     title: this.messageError,
  //     text: this.batch.name,
  //     type: 'warning',
  //     showCancelButton: true,
  //     confirmButtonColor: '#3085d6',
  //     cancelButtonColor: '#d33',
  //     confirmButtonText: this.yesdelete
  //   }).then((result) => {
  //     if (result.value) {
  //       this.deleteBatch();
  //     }
  //   } );
  }
}
