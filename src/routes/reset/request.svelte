<script context="module">
  export function preload(_, { user }) {
    if (user) {
      return this.error(400, 'You are already authorized')
    }
  }
</script>

<script>
  import { initReset } from '../../api'

  let error, success

  let email

  async function submit() {
    if (await initReset(email)) {
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
        <div class="alert alert-success" *ngIf="success">
          <strong>Check your email</strong>
        </div>
      {/if}
      <form on:submit|preventDefault={submit}>
        <div class="form-group">
          <input
            type="email"
            class="form-control"
            style="border: 1px solid #ced4da"
            placeholder="Email"
            bind:value={email} />
        </div>
        <button type="submit" class="btn btn-dark">Reset</button>
      </form>
    </div>
  </div>
</section>
