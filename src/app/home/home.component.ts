import { Component } from '@angular/core'

@Component({
  selector: 'ae-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  title = 'Home - Artaeum'
  showVal = 'articles'

  show(val: string) {
    this.showVal = val
  }
}
