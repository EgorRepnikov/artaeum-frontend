import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { environment as env } from '../../../environments/environment'

import { AccountService } from '../../core'

@Component({
  selector: 'ae-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  title = 'Registration - Artaeum'

  form = new FormGroup({
    'login': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('^[_\'.@A-Za-z0-9-]*$')
    ]),
    'email': new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(100)
    ]),
    'firstName': new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]),
    'lastName': new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ]),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ]),
    'langKey': new FormControl('default', (c: FormControl) => {
      return env.LANG_KEYS.includes(c.value) ? null : {
        validateLangKey: {
          valid: false
        }
      }
    })
  })

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {}

  async onSubmit() {
    this.form.disable()
    const res = await this.accountService.register(this.form.value).toPromise()
    if (res.status === 201) {
      this.router.navigate(['/login'])
    } else {
      this.form.enable()
    }
  }
}
