import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, Actions, ofActionSuccessful, ofActionCompleted, ofActionErrored } from '@ngxs/store';
import { NotificationService } from 'carbon-components-angular';
import { RoomType, RoomAction, LocataireAction } from 'src/app/shared/store';
import { UtilsString } from 'src/app/shared/utils';
import { AddPropertyRoomComponent } from '../add-property-room/add-property-room.component';

@Component({
  selector: 'app-add-property-locataire',
  templateUrl: './add-property-locataire.component.html',
  styleUrls: ['./add-property-locataire.component.scss']
})
export class AddPropertyLocataireComponent implements OnInit {

  public formGroup: FormGroup;
  layout: string = 'horizontal'
  theme: string = 'light'

  roomList =[];
  waittingResponse = false;

  constructor(
    private dialogRef: MatDialogRef<AddPropertyLocataireComponent>,
    protected formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
  private _store:Store,
  private _ngxsAction:Actions) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      fullName:['',[Validators.required]],
      email: ['', [Validators.email]],
      phoneNumber:['', [Validators.required]],
      roomId:[''],
      description:['']
    }, {updateOn: 'blur'})
    this.roomList= Object.values(RoomType).map((value)=>({content:UtilsString.getStringOfRoomType(value), valueType:value, selected:value==RoomType.ROOM}));
    this._ngxsAction.pipe(ofActionSuccessful(LocataireAction.AddLocataire)).subscribe((value)=>{
      // Navigate to the parent
      this.waittingResponse=false;
      this.onClose()
      this.notificationService.showToast({
        type: "success",
        title: "Locataire",
        subtitle: "Locataire ajouté avec success!",
        target: "body",
        message: "message",
        duration: 2000,
      })
      }
    );
    this._ngxsAction.pipe(ofActionCompleted(LocataireAction.AddLocataire)).subscribe(
      (value) => {
        this.waittingResponse=false;
        
      }
    )

    this._ngxsAction.pipe(ofActionErrored(LocataireAction.AddLocataire)).subscribe(
      (value) => {
        this.waittingResponse=false;
        this.notificationService.showToast({
          type: "error",
          title: "Locataire",
          subtitle: "Locataire ajouté avec success!",
          target: "body",
          message: "message",
          duration: 2000,
        })
      })
  }

  onClose() {
    this.formGroup.reset();
    this.dialogRef.close(false)
  }

  isValid(name) {
    const instance = this.formGroup.get(name)
    return instance.invalid && (instance.dirty || instance.touched)
  }

  onSubmit() {
    this.formGroup.markAllAsTouched()
    if(this.formGroup.invalid) return;
    this.waittingResponse=true;
    this._store.dispatch(new LocataireAction.AddLocataire(this.formGroup.value));
    
  }

  getRowLayout(num) {
    if (this.layout === 'vertical') {
      return '100%'
    }
    return num + '%'
  }

}
