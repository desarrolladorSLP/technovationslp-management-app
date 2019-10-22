import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Batch } from 'src/app/model/batch';
import { Program } from 'src/app/model/program';
import { BatchesService } from 'src/app/services/batches/batches.service';
import swal from 'sweetalert2';
import {TranslateService} from '@ngx-translate/core';
import { UserRole } from 'src/app/model/user-role';
import { UserRoleService } from 'src/app/services/user/user-role.service';
import { RegisterTecker } from 'src/app/model/register-tecker';

@Component({
  selector: 'app-batches-card',
  templateUrl: './batches-card.component.html',
  styles: []
})

export class BatchesCardComponent {

  @Input() batch: Batch;
  @Output() public batchDeleted = new EventEmitter();
  @Input()  listPrograms: Program[];

  protected listTeckers: UserRole[];
  protected registerTeckers: RegisterTecker;
  public updatingBatch = false;
  public deletingBatch = false;
  public addingTeckers = false;
  optionProgram: Program;
  messageError: string;
  yesdelete: string;

  constructor(private batchService: BatchesService, private translate: TranslateService, private userRoleService: UserRoleService) {
    this.getTeckers();
  }

   updateBatch() {
    this.updatingBatch = !this.updatingBatch;
    this.batchService.update(this.batch).subscribe(() => {
      this.updatingBatch = false;
      this.batchDeleted.emit();
    });
  }
  registeringTeckers() {
     for (const tecker of this.listTeckers) {
      this.registerTeckers.register.push(tecker.id);
     }
      this.batchService.registerTeckers(this.registerTeckers).subscribe();
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

   getTeckers() {
    this.userRoleService.getUsersTecker().subscribe(data => {
      this.listTeckers = data;
  });
   }
}
