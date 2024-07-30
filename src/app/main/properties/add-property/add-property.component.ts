import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store, Actions, ofActionCompleted, ofActionErrored, ofActionSuccessful } from '@ngxs/store';
import { NotificationService } from 'carbon-components-angular';
import { PropertyAction } from 'src/app/shared/store';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddPropertyComponent implements OnInit {
  public formGroup: FormGroup;

  waittingResponse = false;

  constructor(
    private dialogRef: MatDialogRef<AddPropertyComponent>,
    protected formBuilder: FormBuilder,
    private router: Router,
    private notificationService: NotificationService,
  private _store:Store,
  private _ngxsAction:Actions) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required,]],
      localisation: ['', [Validators.required, ]],
      description: ['', ],
    }, {updateOn: 'blur'})

    this._ngxsAction.pipe(ofActionSuccessful(PropertyAction.CreateProperty)).subscribe((value)=>{
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
    this._ngxsAction.pipe(ofActionCompleted(PropertyAction.CreateProperty)).subscribe(
      (value) => {
        this.waittingResponse=false;
        
      }
    )

    this._ngxsAction.pipe(ofActionErrored(PropertyAction.CreateProperty)).subscribe(
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
    this.waittingResponse=true;
    this._store.dispatch(new PropertyAction.CreateProperty(this.formGroup.value));
    
  }

}
