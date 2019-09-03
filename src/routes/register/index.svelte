<script context="module">
  export function preload(page, { user }) {
    if (user) {
      this.redirect(200, '/')
    }
  }
</script>

<script>
  import { goto } from '@sapper/app'

  import { post } from '../../utils'

  let login = ''
  let email = ''
  let firstName = ''
  let lastName = ''
  let password = ''
  let langKey = 'en'

  async function submit() {
    const response = await post('register', {
      login, email, firstName, lastName, password, langKey
    })
    if (response.status === 201) {
      goto('/login')
    }
  }
</script>

<section>
  <div class="container-auth">
    <div class="wrap-auth">
      <form on:submit|preventDefault={submit}>
        <div class="wrap-input">
          <input class="input" type="text" bind:value={login} />
          {#if login.length === 0}
            <span class="focus-input" data-placeholder="Login" />
          {/if}
        </div>
        <div class="wrap-input">
          <input class="input" type="text" bind:value={email} />
          {#if email.length === 0}
            <span class="focus-input" data-placeholder="Email" />
          {/if}
        </div>
        <div class="wrap-input">
          <input class="input" type="text" bind:value={firstName} />
          {#if firstName.length === 0}
            <span class="focus-input" data-placeholder="First Name" />
          {/if}
        </div>
        <div class="wrap-input">
          <input class="input" type="text" bind:value={lastName} />
          {#if lastName.length === 0}
            <span class="focus-input" data-placeholder="Last Name" />
          {/if}
        </div>
        <div class="wrap-input">
          <input class="input" type="text" bind:value={password} />
          {#if password.length === 0}
            <span class="focus-input" data-placeholder="Password" />
          {/if}
        </div>
        <div class="input-group">
          <select class="form-control" bind:value={langKey}>
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </select>
        </div>
        <div class="container-auth-form-btn">
          <div class="wrap-auth-form-btn">
            <div class="auth-form-bgbtn" />
            <button type="submit" class="auth-form-btn">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</section>
