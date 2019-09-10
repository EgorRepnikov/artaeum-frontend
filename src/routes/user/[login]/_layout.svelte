<script context="module">
  import { getUser, getSubscriptions } from '../../../api'

  export async function preload({ params: { login } }, { user }) {
    const profile = await getUser(login, this.fetch)
    if (!profile) {
      return this.error(404, 'Not Found')
    }
    let isSubscribed = false
    if (user) {
      const subscriptions = await getSubscriptions(
        `?profileId=${profile.id}&subscriberId=${user.id}`,
        this.fetch
      )
      if (subscriptions.length === 1) {
        isSubscribed = true
      }
    }
    return { user, profile, isSubscribed }
  }
</script>

<script>
  import { subscribe, unsubscribe } from '../../../api'

  export let segment
  export let user
  export let profile
  export let isSubscribed

  async function onSubscribe() {
    await subscribe(profile.id) && (isSubscribed = true)
  }

  async function onUnsubscribe() {
    await unsubscribe(profile.id) && (isSubscribed = false)
  }
</script>

<section class="profile-page">
  <div
    class="page-header"
    style="background-image: url(/ae-widescreen.jpg)"
  ></div>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="profile">
            <img
              src="/storage/profile/mock"
              onError="this.src = '/ae.jpg'"
              alt={profile.login}
              class="img-raised rounded-circle img-fluid"
            >
            <div class="name">
              <h3 class="title">{profile.firstName} {profile.lastName}</h3>
              <div class="d-inline-flex">
                <h6>@{profile.login}</h6>
                <a class="text-dark" href="/user/{profile.login}/subscribers">
                  <i class="fa fa-users" title="Subscribers"></i>
                </a>
              </div>
            </div>
            <div class="mb-4">
              {#if user && user.id !== profile.id}
                {#if isSubscribed}
                  <button class="btn btn-dark" on:click={onUnsubscribe}>Unsubscribe</button>
                {:else}
                  <button class="btn btn-dark" on:click={onSubscribe}>Subscribe</button>
                {/if}
              {/if}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="tab-nav">
          <a href="/user/{profile.login}" class:active={!segment}>Wall</a>
          <a href="/user/{profile.login}/blog" class:active={segment === 'blog'}>Blog</a>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</section>
