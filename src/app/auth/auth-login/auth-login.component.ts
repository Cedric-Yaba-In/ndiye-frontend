import {Component, OnInit} from '@angular/core'
import {
  FormGroup,
  FormBuilder,
  FormControl,
  ReactiveFormsModule,
  Validators
} from "@angular/forms"
import {Router} from '@angular/router'
import { Actions, ofActionCompleted, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store'

import {NotificationService} from "carbon-components-angular"
import { UserProfileAction } from 'src/app/shared/store'

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit {

  public formGroup: FormGroup
  waittingResponse = false;


  constructor(protected formBuilder: FormBuilder,
              private router: Router,
              private notificationService: NotificationService,
              private _store:Store,
              private _ngxsAction:Actions
          ) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    }, {updateOn: 'blur'})

    this._ngxsAction.pipe(ofActionSuccessful(UserProfileAction.LoginUserProfile)).subscribe((value)=>{
      // Navigate to the parent
      this.waittingResponse=false;
      this.router.navigate(['/dasboard']);
      this.notificationService.showToast({
        type: "success",
        title: "Ndiye",
        subtitle: "Bienvenue sur Ndiye! ",
        target: "body",
        message: "message",
        duration: 2000,
      })
      }
    );
    this._ngxsAction.pipe(ofActionCompleted(UserProfileAction.LoginUserProfile)).subscribe(
      (value) => {
        this.waittingResponse=false;
        
      }
    )

    this._ngxsAction.pipe(ofActionErrored(UserProfileAction.LoginUserProfile)).subscribe(
      (value) => {
        this.waittingResponse=false;
        this.notificationService.showToast({
          type: "error",
          title: "Connexion",
          subtitle: "Une erreur c'est produite ",
          target: "body",
          message: "message",
          duration: 2000,
        })
      })
  }

  onSubmit() {
    this.formGroup.markAllAsTouched()
    this.waittingResponse=true;    
    this._store.dispatch(new UserProfileAction.LoginUserProfile(this.formGroup.value.email,this.formGroup.value.password));
    
  }

  isValid(name) {
    const instance = this.formGroup.get(name)
    return instance.invalid && (instance.dirty || instance.touched)
  }
}
