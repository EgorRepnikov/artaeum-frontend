<script context="module">
  export function preload(_, { user }) {
    return { user }
  }
</script>

<script>
  import { saveUser } from '../../api'

  export let user

  let success, error

  let { login, email, firstName, lastName, langKey } = user

  async function submit() {
    if (await saveUser({ login, email, firstName, lastName, langKey })) {
      success = true
    } else {
      error = true
    }
  }
</script>

<svelte:head>
	<title>Common settings - Artaeum</title>
</svelte:head>

<div class="row">
  <div class="col-md-12">
    <h4>Common Settings</h4>
    <hr>
  </div>
</div>
<div class="row">
  <div class="col-md-12">
    {#if error}
      <div class="alert alert-danger">Error. Try again.</div>
    {/if}
    {#if success}
      <div class="alert alert-success">Account has been updated.</div>
    {/if}
    <form on:submit|preventDefault={submit}>
      <div class="form-group row">
        <label for="login" class="col-4 col-form-label">Login</label>
        <div class="col-8">
          <input id="login" class="form-control here" type="text" placeholder="Login" bind:value={login}>
        </div>
      </div>
      <div class="form-group row">
        <label for="email" class="col-4 col-form-label">Email</label>
        <div class="col-8">
          <input id="email" class="form-control here" type="text" placeholder="Email" bind:value={email}>
        </div>
      </div>
      <div class="form-group row">
        <label for="firstName" class="col-4 col-form-label">First Name</label>
        <div class="col-8">
          <input id="firstName" class="form-control here" type="text" placeholder="First Name" bind:value={firstName}>
        </div>
      </div>
      <div class="form-group row">
        <label for="lastName" class="col-4 col-form-label">Last Name</label>
        <div class="col-8">
          <input id="lastName" class="form-control here" type="text" placeholder="Last Name" bind:value={lastName}>
        </div>
      </div>
      <div class="form-group row">
        <label for="language" class="col-4 col-form-label">Language</label>
        <div class="col-8">
          <select id="language" class="custom-select" bind:value={langKey}>
            <option value="en">English</option>
            <option value="ru">Russian</option>
          </select>
        </div>
      </div>
      <div class="form-group row">
        <div class="offset-4 col-8">
          <button type="submit" class="btn btn-dark">Save</button>
        </div>
      </div>
    </form>
  </div>
</div>
