<script context="module">
  export function preload(_, { user }) {
    if (!user) {
      return this.error(401, 'Unauthorized')
    }
  }
</script>

<script>
  export let segment
</script>

<section class="mt-4">
  <div class="container">
    <div class="row">
      <div class="tab-nav">
        <a href="/timeline" class:active={!segment}>Article</a>
        <a href="/timeline/posts" class:active={segment === 'posts'}>Posts</a>
      </div>
    </div>
    <div class="row justify-content-md-center">
      <slot></slot>
    </div>
  </div>
</section>
