import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment as env } from '../../../environments/environment'

@Injectable({ providedIn: 'root' })
export class ApplyTokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = typeof window !== 'undefined' ?
      window.localStorage.getItem('access_token') : false
    if (!req.url.startsWith(env.SERVER_API_URL) && !token) {
      return next.handle(req)
    }
    return next.handle(req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    }))
  }
}