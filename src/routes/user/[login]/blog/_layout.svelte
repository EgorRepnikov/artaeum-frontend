<script context="module">
  import { getUser, getCategories } from '../../../../api'

  export async function preload({ params: { login } }, { user }) {
    const { id } = await getUser(login, this.fetch)
    const categories = await getCategories(`?userId=${id}`, this.fetch)
    return { login, user, categories }
  }
</script>

<script>
  export let segment
  export let login
  export let user
  export let categories
</script>

<div class="row">
  <div class="col-md-6 mx-auto tab-nav">
    <a href="/user/{login}/blog" class:active={!segment}>All</a>
    {#each categories as c}
      <a href="/user/{login}/blog/{c.name}" class:active={segment === c.name}>{c.name}</a>
    {/each}
  </div>
</div>
<slot></slot>
