<script context="module">
  export function preload(_, { user }) {
    if (user) {
      this.redirect(200, '/')
    }
  }
</script>

<script>
  import { goto, stores } from '@sapper/app'

  import { login } from '../../utils'

  const { session } = stores()

  let username = ''
  let password = ''

  async function submit() {
    if (await login(username, password, session)) {
      goto('/')
    }
  }
</script>

<svelte:head>
	<title>Log In - Artaeum</title>
</svelte:head>

<section>
  <div class="container-auth">
    <div class="wrap-auth">
      <form on:submit|preventDefault={submit}>
        <div class="wrap-input">
          <input class="input" type="text" bind:value={username} />
          {#if username.length === 0}
            <span class="focus-input" data-placeholder="Email or Login" />
          {/if}
        </div>
        <div class="wrap-input">
          <input class="input" type="text" bind:value={password} />
          {#if password.length === 0}
            <span class="focus-input" data-placeholder="Password" />
          {/if}
        </div>
        <div class="container-auth-form-btn">
          <div class="wrap-auth-form-btn">
            <div class="auth-form-bgbtn" />
            <button type="submit" class="auth-form-btn">Submit</button>
          </div>
        </div>
        <div class="text-center pt-4 register-link">
          Don’t have an account? <a href="/register">Sign Up</a>
        </div>
        <div class="text-center pt-4 register-link">
          Forgot your password? <a href="/reset/request">Reset</a>
        </div>
      </form>
    </div>
  </div>
</section>
