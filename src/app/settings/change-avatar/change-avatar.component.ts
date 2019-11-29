import { Component, OnInit } from '@angular/core'

import { Principal, User, ProfileImagesService } from '../../core'

@Component({
  selector: 'ae-change-avatar',
  templateUrl: './change-avatar.component.html'
})
export class ChangeAvatarComponent implements OnInit {

  title = 'Profile image - Artaeum'

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
    await this.profileImagesService.changeAvatar(this.image).toPromise()
    this.image = null
  }
}
