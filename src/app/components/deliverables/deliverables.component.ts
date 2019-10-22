import { Component, OnInit } from '@angular/core';
import { Deliverable } from 'src/app/model/deliverables';
import { DeliverablesService } from 'src/app/services/deliverables/deliverables.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { BatchesService } from 'src/app/services/batches/batches.service';
import { Batch } from 'src/app/model/batch';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { Program } from 'src/app/model/program';

@Component({
  selector: 'app-deliverables',
  templateUrl: './deliverables.component.html',
  styleUrls: ['./deliverables.component.css']
})
export class DeliverablesComponent implements OnInit {
  messageErrorName: string;
  messageErrorDesription: string;
  listDeliverables: Deliverable[];
  listPrograms: Program[];
  selectedProgram: string;
  isSelectedProgram: boolean;
  deliverable: Deliverable;
  batchId: string;
  currentDate = new Date();
  isNew = false;
  addingProgram = false;
  filterPrograms = '';
  listBaches: Batch[];

  constructor(private batchService: BatchesService, private deliverableService: DeliverablesService, private translate: TranslateService,
    private programService: ProgramsService) {
    this.getPrograms();
  }

  ngOnInit() {
  }

  getPrograms() {
    this.programService.getPrograms().subscribe(data => {
      this.listPrograms = data;
    });
  }

  getBachesbyPrograms() {
    this.batchService.getBatchbyProgram(this.selectedProgram).subscribe(data => {
      this.listBaches = data;
    });
  }

  getDeliverablesforBatch(batchId) {
    this.batchId = batchId;
    this.deliverableService.getDeliverablesforBatch(batchId).subscribe(data => {
      this.listDeliverables = data;
    });
  }

  addDeliverable(name: string, description: string, batch: string) {
    this.translate.get('ERROR_DELIVERABLE_TITLE').subscribe((text: string) => { this.messageErrorName = text; });
    this.translate.get('ERROR_DELIVERABLE_DESCRIPTION').subscribe((text: string) => { this.messageErrorDesription = text; });
    if (name.length === 0) {
      Swal.fire(
        'Error',
        this.messageErrorName,
        'error'
      );
    } else {
      if (description.length === 0) {
        Swal.fire(
          'Error',
          this.messageErrorDesription,
          'error'
        );
      } else {
        this.deliverable.batchId = batch;
        this.deliverable.description = description;
        this.deliverable.title = name;
        this.deliverable.dueDate = this.currentDate.getFullYear() + '-' + this.currentDate.getMonth() + '-' + this.currentDate.getDay()
         + 'T' + this.currentDate.getHours() + ':' + this.currentDate.getMinutes() + ':' + this.currentDate.getSeconds() + 'Z';
        this.deliverableService.addDeliverable(this.deliverable).subscribe();
        console.log(this.deliverable);
      }
    }
  }
}
