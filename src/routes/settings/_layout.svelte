<script context="module">
  export function preload(_, { user }) {
    // if (!user) {
    //   return this.redirect(401, '/login')
    // }
  }
</script>

<script>
  export let segment
</script>

<section class="mt-4 mb-4">
  <div class="container">
    <div class="row">
      <div class="col-md-3">
        <div class="list-group">
          <a
            class="list-group-item list-group-item-action"
            href="/settings"
            class:active={!segment}
          >Common settings</a>
          <a
            class="list-group-item list-group-item-action"
            href="/settings/change-password"
            class:active={segment === 'change-password'}
          >Change password</a>
          <a
            class="list-group-item list-group-item-action"
            href="/settings/change-avatar"
            class:active={segment === 'change-avatar'}
          >Change profile image</a>
          <a
            class="list-group-item list-group-item-action"
            href="/settings/change-background"
            class:active={segment === 'change-background'}
          >Change background image</a>
        </div>
      </div>
      <div class="col-md-9">
        <div class="card">
          <div class="card-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
