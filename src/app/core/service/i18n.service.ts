import { Injectable, EventEmitter } from '@angular/core'
import { TranslateService, LangChangeEvent } from '@ngx-translate/core'
import { environment as env } from '../../../environments/environment'

import { AccountService } from './account.service'
import { Principal } from '../auth/principal.service'

@Injectable({ providedIn: 'root' })
export class I18nService {

  constructor(
    public readonly translateService: TranslateService,
    private principal: Principal,
    private accountService: AccountService
  ) {
    this.translateService.setDefaultLang('en')
  }

  async init() {
    if (this.principal.isAuthenticated()) {
      const user = await this.principal.identity()
      this.translateService.use(user.langKey)
    } else if (typeof window !== 'undefined' && window.localStorage.getItem('lang_key')) {
      this.translateService.use(window.localStorage.getItem('lang_key'))
    } else if (typeof navigator !== 'undefined') {
      const userLang = navigator.language.substring(0, 2)
      if (env.LANG_KEYS.includes(userLang)) {
        this.translateService.use(userLang)
      }
    }
  }

  async changeLanguage(lang: string) {
    window.localStorage.setItem('lang_key', lang)
    if (this.principal.isAuthenticated()) {
      const user = await this.principal.identity()
      user.langKey = lang
      this.accountService.save(user).subscribe()
    }
    this.translateService.use(lang)
  }

  getDefaultLang(): string {
    return this.translateService.defaultLang
  }

  getCurrentLang(): string {
    return this.translateService.currentLang
  }

  getOnLangChange(): EventEmitter<LangChangeEvent> {
    return this.translateService.onLangChange
  }
}
