import { Injectable } from '@angular/core'
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http'
import { Observable } from 'rxjs'

import { User } from '../model'

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private http: HttpClient) {}

  get(): Observable<HttpResponse<User>> {
    return this.http.get<User>('uaa/account', { observe: 'response' })
  }

  save(user: any): Observable<HttpResponse<any>> {
    return this.http.post('uaa/account', user, { observe: 'response' })
  }

  register(user: any): Observable<HttpResponse<any>> {
    return this.http.post('uaa/register', user, { observe: 'response' })
  }

  changePassword(password: string): Observable<HttpResponse<any>> {
    return this.http.post('uaa/account/change-password', password, { observe: 'response' })
  }

  activate(key: string): Observable<any> {
    return this.http.get('uaa/activate', {
      params: new HttpParams().set('key', key)
    })
  }

  initReset(mail: string): Observable<any> {
    return this.http.post('uaa/account/reset-password/init', mail)
  }

  finishReset(keyAndPassword: any): Observable<any> {
    return this.http.post('uaa/account/reset-password/finish', keyAndPassword)
  }
}
