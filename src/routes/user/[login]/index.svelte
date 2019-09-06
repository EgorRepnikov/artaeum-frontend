<script context="module">
  import { getPosts, getUser } from '../../../api'

  export async function preload({ params: { login } }, { user }) {
    const profile = await getUser(login, this.fetch)
    const { posts, totalCount } = await getPosts(`?userId=${profile.id}`, this.fetch)
    return { user, profile, posts, totalCount }
  }
</script>

<script>
  import Post from '../../../components/Post.svelte'

  import { getPosts as getPosts_ } from '../../../api'

  export let user
  export let profile
  export let posts
  export let totalCount

  let page = 0
  let size = 10

  async function loadMore() {
    const res = await getPosts_(
      `?userId=${profile.id}&page=${page++}&size=${size}`
    )
    posts = [...posts, res.posts]
  }
</script>

<svelte:head>
  <title>@{profile.login} - Artaeum</title>
</svelte:head>

<div class="row">
  <div class="col-md-6 mx-auto">
    {#each posts as post}
      <!-- TODO emit on deletion of Post -->
      <Post {post} author={profile} {user} />
    {/each}
  </div>
</div>
{#if totalCount > posts.length}
  <div class="row">
    <div class="col-md-6 mx-auto">
      <button class="btn btn-dark" on:click={loadMore}>Load More</button>
    </div>
  </div>
{/if}
{#if posts.lenght === 0}
  <div class="row">
    <div class="col-md-6 mx-auto">
      <div class="alert alert-dark font-weight-bold" role="alert">
        There are no posts
      </div>
    </div>
  </div>
{/if}
