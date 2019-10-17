import { Component, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/services/programs/programs.service';
import { Program } from 'src/app/model/program';
import { Deliverable } from 'src/app/model/deliverables';
import { DeliverablesService } from 'src/app/services/deliverables/deliverables.service';
import Swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-deliverables',
  templateUrl: './deliverables.component.html',
  styleUrls: ['./deliverables.component.css']
})
export class DeliverablesComponent implements OnInit {
  messageErrorName: string;
  messageErrorDesription: string;

  constructor(private programService: ProgramsService, private deliverable: DeliverablesService, private translate: TranslateService) {
    this.getPrograms();
    this.getDeliverables();
  }
  isNew = false;
  addingProgram = false;
  filterPrograms = '';
  listPrograms: Program[];
  ngOnInit() {
  }

  getPrograms() {
    this.programService.getPrograms().subscribe(data => {
      this.listPrograms = data;
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
