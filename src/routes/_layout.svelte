<script context="module">
  export function preload(_, { user }) {
    return { user }
  }
</script>

<script>
	import Navbar from '../components/layout/Navbar.svelte'
	import Footer from '../components/layout/Footer.svelte'

	export let user
</script>

<Navbar {user} />

<main>
	<slot></slot>
</main>

<Footer {user} />
