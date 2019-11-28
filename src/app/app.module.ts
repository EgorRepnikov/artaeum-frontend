import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './app.component'
import { HeaderComponent, FooterComponent, SmartButtonComponent } from './layout'

import { AppRoutingModule } from './app-routing.module'
import { CoreModule } from './core/core.module'
import { SharedModule } from './shared/shared.module'
import { AccountModule } from './account'
import { ArticleModule } from './article'
import { AuthorModule } from './author'

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
    SharedModule,
    AccountModule,
    ArticleModule,
    AuthorModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
