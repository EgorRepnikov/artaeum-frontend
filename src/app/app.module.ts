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
import { HomeModule } from './home'
import { NotFoundModule } from './not-found'
import { PostModule } from './post'
import { ProfileModule } from './profile'
import { SearchModule } from './search'
import { SettingsModule } from './settings'
import { TimelineModule } from './timeline'

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
    AuthorModule,
    HomeModule,
    NotFoundModule,
    PostModule,
    ProfileModule,
    SearchModule,
    SettingsModule,
    TimelineModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
