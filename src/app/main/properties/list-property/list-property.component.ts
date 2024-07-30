import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PropertyModel, PropertyState } from 'src/app/shared/store';
import { AddPropertyComponent } from '../add-property/add-property.component';

@Component({
  selector: 'app-list-property',
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ListPropertyComponent implements OnInit {


  @Select(PropertyState.setlectStateProperties) properties$:Observable<PropertyModel[]>;
  private addPropertyDialogRef: MatDialogRef<AddPropertyComponent>;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  onCreate() {
    this.addPropertyDialogRef = this.dialog.open(AddPropertyComponent, {
      viewContainerRef:null,
      disableClose: true,
      role: 'alertdialog',
      width: '500px'
    })
  }
}
