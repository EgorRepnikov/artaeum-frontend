<script context="module">
  export function preload({ params: { key } }, { user }) {
    if (user) {
      return this.error(400, 'You are already authorized')
    }
    return { resetKey: key }
  }
</script>

<script>
  import { finishReset } from '../../../api'

  export let resetKey

  let error, success

  let password

  async function submit() {
    if (await finishReset({ resetKey, password })) {
      success = true
    } else {
      error = true
    }
  }
</script>

<svelte:head>
	<title>Password Reset - Artaeum</title>
</svelte:head>

<section class="mt-4 mb-4">
  <div class="row justify-content-center">
    <div class="col-md-6">
      <h1>Password reset</h1>
      {#if error}
        <div class="alert alert-danger">Error. Try again.</div>
      {/if}
      {#if success}
        <p class="alert alert-success">
          <span><strong>Password reset was successful.</strong> Let's </span>
          <a class="alert-link" href="/login">Log In</a>.
        </p>
      {/if}
      <form on:submit|preventDefault={submit}>
        <div class="form-group">
          <input
            type="password"
            class="form-control"
            style="border: 1px solid #ced4da"
            placeholder="New Password"
            bind:value={password} />
        </div>
        <button type="submit" class="btn btn-dark">Reset</button>
      </form>
    </div>
  </div>
</section>
