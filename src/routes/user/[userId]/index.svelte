<script context="module">
  import { get } from '../../../utils'

  export async function preload({ params: { userId } }, { user }) {
    const postsResponse = await get(`media/posts?userId=${userId}`, this.fetch)
    const totalPosts = postsResponse.headers.get('x-total-count')
    const posts = await postsResponse.json()

    const profileResponse = await get(`uaa/users/${userId}`, this.fetch)
    const profile = await profileResponse.json()

    return { posts, totalPosts, profile, user }
  }
</script>

<script>
  import Post from '../../../components/Post.svelte'

  import { get as get_ } from '../../../utils'

  export let posts
  export let totalPosts
  export let profile
  export let user

  let page = 0
  let size = 10

  async function loadMore() {
    const postsResponse = await get_(
      `media/posts?userId=${user.id}&page=${page++}&size=${size}`
    )
    posts = [...posts, await postsResponse.json()]
  }
</script>

<div class="row">
  <div class="col-md-6 mx-auto">
    {#each posts as p}
      <!-- TODO emit on deletion of Post -->
      <Post post={p} author={profile} {user} />
    {/each}
  </div>
</div>
{#if totalPosts > posts.length}
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
        There isn't posts
      </div>
    </div>
  </div>
{/if}
