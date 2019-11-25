import { Component, OnInit, ViewChild } from '@angular/core';
import { Batch } from 'src/app/model/batch';
import { BatchesService } from 'src/app/services/batches/batches.service';
import { Mentor } from 'src/app/model/mentor';
import { TeckerBatch } from 'src/app/model/tecker-batch';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { MentorService } from 'src/app/services/mentor/mentor.service';
import { DxListComponent } from 'devextreme-angular';
import { TeckerMentor } from 'src/app/model/tecker-mentor';
import { Program } from 'src/app/model/program';
import { ProgramsService } from 'src/app/services/programs/programs.service';

@Component({
  selector: 'app-mentor-tecker',
  templateUrl: './mentor-tecker.component.html',
  styleUrls: ['./mentor-tecker.component.css']
})

export class MentorTeckerComponent  {
  protected listBatches: Batch[];
  protected listMentors: Mentor[];
  protected listTeckers: TeckerBatch[];
  protected listPrograms: Program[];

  @ViewChild(DxListComponent) list: DxListComponent;
  selectedTeckers: TeckerBatch[] = [];
  assignedTecker: TeckerMentor;
  mentorId = '';
  programId: string;
  teckers: DataSource;
  popupVisible = false;

  constructor(private programService: ProgramsService, public batchesService: BatchesService, public mentorServices: MentorService) {
    this.refreshPrograms();
  }
  refreshPrograms() {
    this.programService.getPrograms().subscribe(data => {
      this.listPrograms = data;
    });
  }
  onProgramChange(programId: string) {
    this.refreshBatches(programId);
  }
  refreshBatches(programId: string) {
    this.batchesService.getBatchByPrograms(programId).subscribe(data => {
      this.listBatches = data;
      this.listBatches.sort();
      this.refreshMentors(this.listBatches[0].id);
      this.refreshTeckers(this.listBatches[0].id);
    });
  }

  refreshMentors(batchId: string) {
    this.batchesService.getMentorsByBatch(batchId).subscribe( data => {
      this.listMentors = data;
      this.listMentors.forEach(mentor => {
        mentor.listTeckers = [ ];
        this.mentorServices.getTeckersByMentor(mentor.mentorId).subscribe( teckerList => {
          mentor.listTeckers = teckerList;
        });
      });
    });
  }

  refreshTeckers(batchId: string) {
    this.batchesService.getTeckersByBatch(batchId).subscribe( data => {
      this.listTeckers = data;
      this.teckers = new DataSource({
        store: new ArrayStore({
          key: 'teckerId',
          data: this.listTeckers
        })
      });
    });
  }

  getInformationByBatch(batchId: string) {
    this.refreshMentors(batchId);
    this.refreshTeckers(batchId);
  }

  getSelectedMentor(mentorId: string) {
    this.mentorId = mentorId;
    this.popupVisible = true;
    this.selectedTeckers = [];
    this.mentorServices.getTeckersByMentor(mentorId).subscribe(data => {
      this.selectedTeckers = data,
      console.log(this.selectedTeckers);
    });
  }

  assignedTeckersToMentor() {
    this.assignedTecker = new TeckerMentor();
    this.list.selectedItems.forEach(tecker => {
      this.selectedTeckers.push(tecker);
    });
    this.selectedTeckers.forEach(tecker => {
      tecker.isChecked = true;
      this.assignedTecker.assign.push(tecker.teckerId);
    });
    console.log(this.assignedTecker);


    this.listTeckers.forEach(tecker => {
      if ( this.selectedTeckers.includes(tecker) ) {
        tecker.isChecked = false;
        this.assignedTecker.unassign.push(tecker.teckerId);
      }
    });

    this.mentorServices.updateTeckersToMentor(this.mentorId, this.assignedTecker).subscribe(data => {
      console.log(data);
    });
    this.popupVisible  = false;
    this.list.instance.unselectAll();
    this.list.instance.reload();
  }
}
