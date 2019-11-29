import { Component, OnInit } from '@angular/core'

import { I18nService } from './core'

@Component({
  selector: 'ae-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'Artaeum'

  constructor(private i18nService: I18nService) {}

  ngOnInit() {
    this.i18nService.init()
  }
}
