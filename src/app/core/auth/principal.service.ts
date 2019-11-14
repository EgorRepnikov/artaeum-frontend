import { Injectable } from '@angular/core'

import { AccountService } from '../service'

@Injectable({ providedIn: 'root' })
export class Principal {

  private userIdentity: any
  private authenticated = false

  constructor(private accountService: AccountService) {}

  authenticate(identity): void {
    this.userIdentity = identity
    this.authenticated = identity !== null
  }

  hasAuthorities(authorities: string[]): boolean {
    if (this.authenticated && this.userIdentity && this.userIdentity.authorities) {
      for (let i = 0; i < authorities.length; i++) {
        if (this.userIdentity.authorities.includes(authorities[i])) {
          return true
        }
      }
    }
    return false
  }

  hasAuthority(authority: string): boolean {
    return this.hasAuthorities([authority])
  }

  async identity() {
    if (this.userIdentity) {
      return this.userIdentity
    }
    try {
      const response = await this.accountService.get().toPromise()
      const account = response.body
      if (account) {
        this.userIdentity = account
        this.authenticated = true
      } else {
        this.userIdentity = null
        this.authenticated = false
      }
      return this.userIdentity
    } catch (err) {
      this.userIdentity = null
      this.authenticated = false
      return null
    }
  }

  isAuthenticated(): boolean {
    return this.authenticated
  }
}
