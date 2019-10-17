import { Component, OnInit } from '@angular/core';
import {BatchesService} from '../../services/batches/batches.service';
import { Batch } from 'src/app/model/batch';
import {ProgramsService} from '../../services/programs/programs.service';
import { Program } from 'src/app/model/program';

@Component({
  selector: 'app-batches',
  templateUrl: './batches.component.html',
  styleUrls: ['./batches.component.css']
})
export class BatchesComponent {

  protected listBatches: Batch[];
  protected listPrograms: Program[];
  public filterBatch = '';
  addingBatch = false;
  optionProgram: Program;
  startDate: string;
  batch: Batch = new Batch();

  constructor(public batchesService: BatchesService, public programsService: ProgramsService) {
    this.refreshBatches();
  }


  refreshBatches() {
    this.batchesService.getBatches().subscribe(data => {
      this.listBatches = data;
      this.getNameProgram();
    });
  }

  addBatch() {
    console.log(this.batch);
      this.batchesService.addBatch(this.batch).subscribe(data => {
        this.addingBatch = false;
        this.refreshBatches();
      });
  }

  getNameProgram() {
    this.programsService.getPrograms().subscribe(dataProgram => {
      this.listPrograms = dataProgram;
      for (const program of this.listPrograms) {
        for (const batch of this.listBatches) {
          if (program.id === batch.programId) {
            batch.nameProgram = program.name;
          }
        }
      }
    });
  }
}
