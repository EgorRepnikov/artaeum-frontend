import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { Principal, User, LoginService } from '../../core'

@Component({
  selector: 'ae-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  currentUser: User
  searchQuery: string
  isShowSearch = false

  constructor(
    private router: Router,
    private principal: Principal,
    private loginService: LoginService
  ) {}

  async ngOnInit() {
    this.currentUser = await this.principal.identity()
  }

  reverseIsShowSearch() {
    this.isShowSearch = !this.isShowSearch
  }

  search() {
    this.reverseIsShowSearch()
    this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } })
  }

  async logout() {
    this.loginService.logout()
    await this.router.navigate(['/'])
    location.reload()
  }
}
