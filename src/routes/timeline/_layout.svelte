<script context="module">
  export function preload(_, { user }) {
    if (!user) {
      return this.error(401, 'Unauthorized')
    }
  }
</script>

<section class="mt-4">
  <div class="container">
    <div class="row justify-content-md-center">
      <slot></slot>
    </div>
  </div>
</section>
