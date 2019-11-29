import { Component } from '@angular/core'
import { Router } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { LoginService } from '../../core'

@Component({
  selector: 'ae-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  title = 'Login - Artaeum'

  form = new FormGroup({
    'username': new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50),
      Validators.pattern('^[_\'.@A-Za-z0-9-]*$')
    ]),
    'password': new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50)
    ])
  })

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  async onSubmit() {
    await this.loginService.login(this.form.value)
    await this.router.navigate(['/'])
    location.reload()
  }
}
