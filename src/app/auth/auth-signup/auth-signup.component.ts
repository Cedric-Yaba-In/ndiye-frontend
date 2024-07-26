import {Component, OnInit, ViewEncapsulation} from '@angular/core'
import {FormBuilder, FormGroup, Validators} from "@angular/forms"
import {Router} from "@angular/router"
import { Store } from '@ngxs/store'
import {NotificationService} from "carbon-components-angular"

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
            private _store:Store) {
  }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      fullName: ['', [Validators.required,]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],

      condition: [true],
    }, {updateOn: 'blur'})
  }

  onSubmit() {
    this.formGroup.markAllAsTouched()

    this._store.dispatch(new UserProfileAction.SignupSimpleUserProfile(this.formGroup.value.email,this.formGroup.value.password,this.formGroup.value.fullName));

    /*this.router.navigate(['/app'])
    this.notificationService.showToast({
      type: "info",
      title: "Sample toast",
      subtitle: "Sample subtitle message",
      caption: "Sample caption",
      target: "body",
      message: "message",
      duration: 2000,
    })*/
  }

  isValid(name) {
    const instance = this.formGroup.get(name)
    return instance.invalid && (instance.dirty || instance.touched)
  }

}
