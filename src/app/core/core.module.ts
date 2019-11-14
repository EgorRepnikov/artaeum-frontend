import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { HasAuthorityDirective } from './directive'
import { DateConverterPipe, ImageAppenderPipe } from './pipe'
import {
  ApiInterceptor,
  ApplyTokenInterceptor,
  AuthExpiredInterceptor
} from './interceptor'

@NgModule({
  imports: [CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApplyTokenInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthExpiredInterceptor,
      multi: true
    }, {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    }
  ],
  declarations: [
    HasAuthorityDirective,
    DateConverterPipe,
    ImageAppenderPipe
  ],
  exports: [
    HasAuthorityDirective,
    DateConverterPipe,
    ImageAppenderPipe
  ]
})
export class CoreModule {}
