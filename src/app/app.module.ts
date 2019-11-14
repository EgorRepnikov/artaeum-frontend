import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { HeaderComponent, FooterComponent, SmartButtonComponent } from './layout'

import { AppRoutingModule } from './app-routing.module'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SmartButtonComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    CoreModule,
    SharedModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
