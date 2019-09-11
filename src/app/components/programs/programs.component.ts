import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../../services/programs/programs.service';
import {Router} from '@angular/router';
import { Program } from 'src/app/model/program';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})

export class ProgramsComponent implements OnInit{

  public addingProgram = false;
  public updatingProgram = false;
  protected listPrograms: Program[];

  ngOnInit(): void {
    this.refreshPrograms();
  }

  constructor(private router: Router, private programService: ProgramsService) {
      this.refreshPrograms();
  }

  addProgram(name: string, description: string, responsible: string){

    const newProgram = new Program();
    newProgram.name = name;
    newProgram.description = description;
    newProgram.responsible = responsible;
    this.programService.addProgram(newProgram).subscribe(data => {
      console.log(data);
      this.refreshPrograms();
    });
  }

   refreshPrograms() {
    this.programService.getPrograms().subscribe(data => {this.listPrograms = data; });
    console.log(this.listPrograms);
   }

   formUpdate() {

   }
}
