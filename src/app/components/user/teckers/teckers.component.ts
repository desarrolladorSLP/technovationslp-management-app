import { Component, ViewChild } from '@angular/core';
import {UserRole} from 'src/app/model/user-role';
import { UserRoleService } from 'src/app/services/user/user-role.service';
import * as $ from 'jquery';
import DataSource from 'devextreme/data/data_source';
import ArrayStore from 'devextreme/data/array_store';
import { DxListComponent } from 'devextreme-angular';
import { TeckerService } from 'src/app/services/Teckers/tecker.service';
import { ParentTecker } from 'src/app/model/parent-tecker';

@Component({
  selector: 'app-teckers',
  templateUrl: './teckers.component.html',
  styleUrls: ['./teckers.component.css']
})

export class TeckersComponent {
  @ViewChild(DxListComponent) list: DxListComponent;
  protected listTeckers: UserRole[];
  protected listParents: UserRole[];
  protected listTeckersByParent: ParentTecker[];
  parentId = '';
  filterName = '';
  filterEmail = '';
  allowDeleting = false;
  selectedTeckers: any[] = [];
  deleteType: 'toggle';
  tecker: DataSource;

  constructor(private userRoleService: UserRoleService, private teckerService: TeckerService) {
    this.getTeckers();
    this.getParents();
   }

  getTeckers() {
    this.userRoleService.getUsersTecker().subscribe(data => {
      this.listTeckers = data;
      this.tecker = new DataSource({
        store: new ArrayStore({
          key: 'id',
          data: this.listTeckers
        })
      });
    });
  }

  getTeckersByParent() {
    this.teckerService.teckersByParents(this.parentId).subscribe( data => {
       this.listTeckersByParent = data;
       this.listTeckersByParent.forEach(tecker => {
        this.selectedTeckers.push(tecker.teckerId);
        this.list.selectedItems.push(tecker.teckerId);
       });
    });
  }

  getParents() {
    this.userRoleService.getUsersParent().subscribe(data => {
      this.listParents = data;
    });
  }

  public assignedParent() {
    this.list.selectedItems.forEach(tecker => {
      this.selectedTeckers.push(tecker.id);
    });
    this.teckerService.save(this.parentId, this.selectedTeckers )
    this.list.instance.unselectAll();
    this.list.instance.reload();
  }

  public clickName() {
    $('#Sname').toggleClass('d-none');
  }

  getSelectedUser(parentId: string) {
    this.parentId = parentId;
    this.getTeckersByParent();
  }
}
