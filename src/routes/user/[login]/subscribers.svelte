<script context="module">
  import { getUser, getSubscriptions } from '../../../api'

  export async function preload({ params: { login } }) {
    const profile = await getUser(login, this.fetch)
    const subscriptions = await getSubscriptions(`?profileId=${profile.id}`, this.fetch)
    for (const subscription of subscriptions) {
      subscription.profile = profile
      subscription.subscriber = await getUser(subscription.subscriberId, this.fetch)
    }
    return { login, subscriptions }
  }
</script>

<script>
  export let login
  export let subscriptions
</script>

<svelte:head>
  <title>@{login}'s subscribers - Artaeum</title>
</svelte:head>

<div class="row">
  <div class="col-md-6 mx-auto">
    {#if subscriptions.length > 0}
      <div class="panel panel-default">
        <div class="panel-body">
          <div class="table-container">
            <table class="table-users table">
              <tbody>
                {#each subscriptions as s}
                  <tr>
                    <td width="10">
                      <img class="pull-left rounded-circle" width="50" src="/storage/profile/avatar/mock" onError="this.src = '/ae.jpg'" />  
                    </td>
                    <td>
                      <a href="/user/{s.subscriber.login}">@{s.subscriber.login}</a>
                      <br>
                      {s.subscriber.firstName} {s.subscriber.lastName}
                    </td>
                    <td>
                      subscribed on {s.createdDate}
                    </td>
                  </tr>
                {/each}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    {/if}
    {#if subscriptions.length === 0}
      <div class="alert alert-dark font-weight-bold" role="alert">
        User has no subscribers
      </div>
    {/if}
  </div>
</div>
