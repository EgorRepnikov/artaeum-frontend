<script context="module">
  import { get } from '../../../../utils'

  export async function preload({ params: { userId } }, { user }) {
    const categoriesResponse = await get(`blog/categories?userId=${userId}`, this.fetch)
    const categories = await categoriesResponse.json()
    return { user, userId, categories }
  }
</script>

<script>
  export let segment
  export let user
  export let userId
  export let categories
</script>

<div class="row">
  <div class="col-md-6 mx-auto tab-nav">
    <a href="/user/{userId}/blog" class:active={!segment}>All</a>
    {#each categories as c}
      <a href="/user/{userId}/blog/{c.name}" class:active={segment === c.name}>{c.name}</a>
    {/each}
  </div>
</div>
<slot></slot>
