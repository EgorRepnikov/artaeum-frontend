import { Component, OnInit } from '@angular/core'

import { Principal, User, ProfileImagesService } from '../../core'

@Component({
  selector: 'ae-change-background',
  templateUrl: './change-background.component.html'
})
export class ChangeBackgroundComponent implements OnInit {

  title = 'Profile background image - Artaeum'

  image: string
  currentUser: User

  constructor(
    private principal: Principal,
    private profileImagesService: ProfileImagesService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.principal.identity()
  }

  setImage(image: string) {
    this.image = image
  }

  async save() {
    await this.profileImagesService.changeBackground(this.image).toPromise()
    this.image = null
  }
}
