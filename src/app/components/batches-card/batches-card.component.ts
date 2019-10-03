import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Batch } from 'src/app/model/batch';
import { Program } from 'src/app/model/program';
import { BatchesService } from 'src/app/services/batches/batches.service';
import swal from 'sweetalert2';

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


  constructor(private batchService: BatchesService) {
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
      swal.fire(
        'Deleted!',
        'The program has been deleted.',
        'success'
      );
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
    swal.fire({
      title: 'Are you sure to delete this program?',
      text: this.batch.name,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.deleteBatch();
      }
    } );
   }
}
