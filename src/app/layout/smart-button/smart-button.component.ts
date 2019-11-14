import { Component, OnInit } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'

import { Principal, SmartButtonService, User, SmartButtonElement } from '../../core'

@Component({
  selector: 'ae-smart-button',
  templateUrl: './smart-button.component.html',
  styleUrls: ['./smart-button.component.css']
})
export class SmartButtonComponent implements OnInit {

  currentUser: User
  isOpen = false
  extraElements: SmartButtonElement[]

  constructor(
    private principal: Principal,
    private smartButtonService: SmartButtonService,
    router: Router
  ) {
    router.events.subscribe(v => {
      if (v instanceof NavigationEnd) {
        this.extraElements = this.smartButtonService.get()
      }
    })
  }

  async ngOnInit() {
    this.currentUser = await this.principal.identity()
  }

  reverseIsOpen() {
    this.isOpen = !this.isOpen
  }
}
