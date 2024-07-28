import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {Router} from "@angular/router"
import { Actions, ofActionCompleted, ofActionErrored, ofActionSuccessful, Store } from '@ngxs/store'
import {NotificationService} from "carbon-components-angular"
import {UserProfileAction} from "src/app/shared/store"

/**
 * Signup component
 */
@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthSignupComponent implements OnInit {

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
      fullName: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

      condition: [true],
    }, {updateOn: 'blur'})

    this._ngxsAction.pipe(ofActionSuccessful(UserProfileAction.SignupSimpleUserProfile)).subscribe((value)=>{
      // Navigate to the parent
      this.waittingResponse=false;
      this.router.navigate(['/dasboard']);
      this.notificationService.showToast({
        type: "success",
        title: "Création de compte",
        subtitle: "Compte créer avec success! Veuillez vous connecter! ",
        target: "body",
        message: "message",
        duration: 2000,
      })
      }
    );
    this._ngxsAction.pipe(ofActionCompleted(UserProfileAction.SignupSimpleUserProfile)).subscribe(
      (value) => {
        this.waittingResponse=false;
        
      }
    )

    this._ngxsAction.pipe(ofActionErrored(UserProfileAction.SignupSimpleUserProfile)).subscribe(
      (value) => {
        this.waittingResponse=false;
        this.notificationService.showToast({
          type: "error",
          title: "Création de compte",
          subtitle: "Une erreur c'est produite ",
          target: "body",
          message: "message",
          duration: 2000,
        })
      })
  }

  onSubmit() {
    this.formGroup.markAllAsTouched()
  
    this._store.dispatch(new UserProfileAction.SignupSimpleUserProfile(this.formGroup.value.email,this.formGroup.value.password,this.formGroup.value.fullName));
    
  }

  isValid(name) {
    const instance = this.formGroup.get(name)
    return instance.invalid && (instance.dirty || instance.touched)
  }

}
