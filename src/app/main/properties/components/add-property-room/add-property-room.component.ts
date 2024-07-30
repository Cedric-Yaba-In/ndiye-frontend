import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, Actions, ofActionSuccessful, ofActionCompleted, ofActionErrored } from '@ngxs/store';
import { NotificationService } from 'carbon-components-angular';
import { RoomAction, RoomType } from 'src/app/shared/store';
import { UtilsString } from 'src/app/shared/utils';

@Component({
  selector: 'app-add-property-room',
  templateUrl: './add-property-room.component.html',
  styleUrls: ['./add-property-room.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AddPropertyRoomComponent implements OnInit {

  public formGroup: FormGroup;
  layout: string = 'horizontal'
  theme: string = 'light'

  roomList =[];
  waittingResponse = false;

  constructor(
    private dialogRef: MatDialogRef<AddPropertyRoomComponent>,
    protected formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
  private _store:Store,
  private _ngxsAction:Actions) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      code:[''],
      description: ['', ],
      type:[RoomType.ROOM,Validators.required],
      price:[5000,Validators.required],
      locataireId:['']
    }, {updateOn: 'blur'})
    this.roomList= Object.values(RoomType).map((value)=>({content:UtilsString.getStringOfRoomType(value), valueType:value, selected:value==RoomType.ROOM}));
    this._ngxsAction.pipe(ofActionSuccessful(RoomAction.CreateRoom)).subscribe((value)=>{
      // Navigate to the parent
      this.waittingResponse=false;
      this.onClose()
      this.notificationService.showToast({
        type: "success",
        title: "Biens Immobilier",
        subtitle: "Bien crée avec success!",
        target: "body",
        message: "message",
        duration: 2000,
      })
      }
    );
    this._ngxsAction.pipe(ofActionCompleted(RoomAction.CreateRoom)).subscribe(
      (value) => {
        this.waittingResponse=false;
        
      }
    )

    this._ngxsAction.pipe(ofActionErrored(RoomAction.CreateRoom)).subscribe(
      (value) => {
        this.waittingResponse=false;
        this.notificationService.showToast({
          type: "error",
          title: "Biens Immobilier",
          subtitle: "Une erreur c'est produite ",
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
    this._store.dispatch(new RoomAction.CreateRoom(this.formGroup.value));
    
  }

  getRowLayout(num) {
    if (this.layout === 'vertical') {
      return '100%'
    }
    return num + '%'
  }

  

  getMoney()
  {
    return UtilsString.getDefaultCurrency()
  }

  onSelectedType(roomType)
  {
    if(roomType.length>0) this.formGroup.get('type').setValue(this.roomList.find((value)=>value.content==roomType.item.content))
    else this.formGroup.get('type').setValue(null)
  }
}
