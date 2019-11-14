import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Principal } from './principal.service'

@Injectable({ providedIn: 'root' })
export class LoginService {

  constructor(
    private http: HttpClient,
    private principal: Principal
  ) {}

  login(credentials): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post('login', {
        username: credentials.username,
        password: credentials.password,
        rememberMe: credentials.rememberMe
      }).subscribe((data) => {
        window.localStorage.setItem('access_token', data.access_token)
        this.principal.identity().then(() => resolve(data))
      }, (err) => {
        this.logout()
        reject(err)
      })
    })
  }

  logout(): void {
    window.localStorage.removeItem('access_token')
    this.principal.authenticate(null)
  }
}
