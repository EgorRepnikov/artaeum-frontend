<script context="module">
  import { activateAccount } from '../../api'

  export async function preload({ params: { key } }, { user }) {
    if (user) {
      return this.error(400, 'Account already activated')
    }
    const isActivated = await activateAccount(key, this.fetch)
    return { isActivated }
  }
</script>

<script>
  export let isActivated
</script>

<svelte:head>
	<title>Account Activation - Artaeum</title>
</svelte:head>

<section class="mt-4 mb-2">
  <div class="row justify-content-center">
    <div class="col-md-8">
      <h1>Account Activation</h1>
      {#if isActivated}
        <div class="alert alert-success">
          <span><strong>Your account has been activated. Let's </strong></span>
          <a href="/login" class="alert-link">Log In</a>.
        </div>
      {/if}
      {#if !isActivated}
        <div class="alert alert-danger">
          <strong>Your account has not been activated.</strong>
          You should use the registration form again.
        </div>
      {/if}
    </div>
  </div>
</section>
