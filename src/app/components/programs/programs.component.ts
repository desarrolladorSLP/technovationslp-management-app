import { Component, OnInit } from '@angular/core';
import { ProgramsService } from '../../services/programs.service';
import {Router} from "@angular/router";
import { programs } from 'src/app/model/program';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css']
})
export class ProgramsComponent implements OnInit {

  protected listProgram: programs[];

  constructor(private router: Router,
  private programService: ProgramsService) {
        this.programService.getPrograms().subscribe(data => {this.listProgram = data;});
        console.log(this.listProgram);
  }

  ngOnInit() {
  }
}
