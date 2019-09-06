<script context="module">
  import { get } from '../../../utils'

  export async function preload({ params: { userId } }) {
    const profileResponse = await get(`uaa/users/${userId}`, this.fetch)
    const profile = await profileResponse.json()

    const subscriptionsResponse = await get(
      `profile/subscriptions?profileId=${userId}`,
      this.fetch
    )
    const subscriptions = await subscriptionsResponse.json()
    for (const subscription of subscriptions) {
      subscription.profile = profile

      const userResponse = await get(`uaa/users/${subscription.subscriberId}`, this.fetch)
      subscription.subscriber = await userResponse.json()
    }

    return { subscriptions, userId }
  }
</script>

<script>
  export let subscriptions
  export let userId
</script>

<svelte:head>
  <title>@{userId}'s subscribers - Artaeum</title>
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
