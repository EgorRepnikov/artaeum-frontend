<script>
  import { changePassword } from '../../api'

  let success, error

  let password = ''

  async function submit() {
    if (await changePassword(password)) {
      success = true
      password = ''
    } else {
      error = true
    }
  }
</script>

<svelte:head>
	<title>Change password - Artaeum</title>
</svelte:head>

<div class="row">
  <div class="col-md-12">
    <h4>Change password - Artaeum</h4>
    <hr>
  </div>
</div>
<div class="row">
  <div class="col-md-12">
    {#if error}
      <div class="alert alert-danger">Error. Try again.</div>
    {/if}
    {#if success}
      <div class="alert alert-success">Password has been updated.</div>
    {/if}
    <form on:submit|preventDefault={submit}>
      <div class="form-group row">
        <label for="password" class="col-4 col-form-label">New Password</label>
        <div class="col-8">
          <input id="password" class="form-control here" type="password" placeholder="New Password" bind:value={password}>
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
