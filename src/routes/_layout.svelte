<script context="module">
  export function preload(_, { user }) {
    return { user }
  }
</script>

<script>
	import Navbar from '../components/layout/Navbar.svelte'

	export let user
</script>

<Navbar {user} />

<main>
	<slot></slot>
</main>
