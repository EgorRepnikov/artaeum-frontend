<script context="module">
  import { get } from '../../../utils'

  export async function preload({ params: { userId } }, { user }) {
    const response = await get(`uaa/users/${userId}`, this.fetch)
    if (response.status === 404) {
      return this.error(404, 'Not Found')
    }
    const profile = await response.json()
    return { profile, user }
  }
</script>

<script>
  export let profile
  export let user
  export let segment
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
                <a class="text-dark" href={`/user/${profile.login}/subscribers`}>
                  <i class="fa fa-users" title="Subscribers"></i>
                </a>
              </div>
            </div>
            <div class="mb-4">
              <!-- TODO -->
              {#if user && user.id !== profile.id}
                <button class="btn btn-dark">Subscribe</button>
                <!-- <button class="btn btn-dark">Unsubscribe</button> -->
              {/if}
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="tab-nav">
          <a
            href={`/user/${profile.login}`}
            class:active={!segment}
          >Wall</a>
          <a
            href={`/user/${profile.login}/blog`}
            class:active={segment === 'blog'}
          >Blog</a>
        </div>
      </div>
      <div class="row justify-content-center">
        <slot></slot>
      </div>
    </div>
  </div>
</section>
