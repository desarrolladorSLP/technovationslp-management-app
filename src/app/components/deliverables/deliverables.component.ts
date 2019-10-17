import { Component, OnInit } from '@angular/core';
import { Deliverable } from 'src/app/model/deliverables';
import { DeliverablesService } from 'src/app/services/deliverables/deliverables.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';
import { BatchesService } from 'src/app/services/batches/batches.service';
import { Batch } from 'src/app/model/batch';

@Component({
  selector: 'app-deliverables',
  templateUrl: './deliverables.component.html',
  styleUrls: ['./deliverables.component.css']
})
export class DeliverablesComponent implements OnInit {
  messageErrorName: string;
  messageErrorDesription: string;

  constructor(private bachesService: BatchesService, private deliverable: DeliverablesService, private translate: TranslateService) {
    this.getBaches();
    this.getDeliverables();
  }
  isNew = false;
  addingProgram = false;
  filterPrograms = '';
  listBaches: Batch[];
  ngOnInit() {
  }

  getBaches() {
    this.bachesService.getBatches().subscribe(data => {
      this.listBaches = data;
    });
  }

  getDeliverables() {
    this.deliverable.getDeliverables().subscribe(data => {
      console.log(data);
    })
  }

  addDeliverable(name: string, description: string) {
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
      }
    }
    console.log(name);
    console.log(description);
  }
}
