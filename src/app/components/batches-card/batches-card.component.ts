import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Batch } from 'src/app/model/batch';
import { Program } from 'src/app/model/program';
import { BatchesService } from 'src/app/services/batches/batches.service';
import swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-batches-card',
  templateUrl: './batches-card.component.html',
  styles: []
})

export class BatchesCardComponent {

  @Input() batch: Batch;
  @Output() public batchDeleted = new EventEmitter();
  @Input()  listPrograms: Program[];
  public updatingBatch = false;
  public deletingBatch = false;
  optionProgram: Program;
  messageError: string;
  yesdelete: string;

  constructor(private batchService: BatchesService, private translate: TranslateService) {
  }

   updateBatch() {
    this.updatingBatch = !this.updatingBatch;
    this.batchService.update(this.batch).subscribe(() => {
      this.updatingBatch = false;
      this.batchDeleted.emit();
    });
  }

  deleteBatch() {
    this.batchService.delete(this.batch.id).subscribe(data => {
      this.deletingBatch = false;
      this.batchDeleted.emit();
      this.translate.get('DELETED_BATCH').subscribe((text => {
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

  showAlertDelete() {
    this.translate.get('DELETE_BATCH').subscribe((text: string) => { this.messageError = text; });
    this.translate.get('YES').subscribe((text: string) => { this.yesdelete = text; });
    swal.fire({
      title: this.messageError,
      text: this.batch.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: this.yesdelete
    }).then((result) => {
      if (result.value) {
        this.deleteBatch();
      }
    } );
   }
}
