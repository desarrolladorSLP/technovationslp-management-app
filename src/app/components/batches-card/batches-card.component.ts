import { Component, OnInit, Input } from '@angular/core';
import { Batch } from 'src/app/model/batch';
import { Program } from 'src/app/model/program';

@Component({
  selector: 'app-batches-card',
  templateUrl: './batches-card.component.html',
  styles: []
})
export class BatchesCardComponent {

  @Input() batch: Batch;
  @Input()  listPrograms: Program[];
  public updatingBatch = false;

  constructor() { }


}
