<script context="module">
  import { getArticles, getCategory, getUser } from '../../../../api'

  export async function preload({ params: { login } }, { user }) {
    const profile = await getUser(login, this.fetch)

    const { totalCount, articles } = await getArticles(
      `?userId=${profile.id}`,
      { user: profile },
      this.fetch
    )

    return { user, totalCount, articles, profile }
  }
</script>

<script>
  import Article from '../../../../components/Article.svelte'

  import { getArticles as getArticles_ } from '../../../../api'

  export let user
  export let totalCount
  export let articles
  export let profile

  let page = 0
  let size = 10

  async function loadMore() {
    const res = await getArticles_(
      `?userId=${profile.id}&page=${page++}&size=${size}`,
      { user }
    )
    articles = [...articles, res.articles]
  }
</script>

<svelte:head>
  <title>@{profile.login}'s Blog - Artaeum</title>
</svelte:head>

<div class="row">
  <div class="col-md-6 mx-auto">
    {#each articles as article}
      <Article {article} {user}></Article>
    {/each}
  </div>
</div>
{#if totalCount > articles.length}
  <div class="row">
    <div class="col-md-6 mx-auto">
      <button class="btn btn-dark" on:click={loadMore}>Load More</button>
    </div>
  </div>
{/if}
{#if articles.lenght === 0}
  <div class="row">
    <div class="col-md-6 mx-auto">
      <div class="alert alert-dark font-weight-bold" role="alert">
        There are no articles
      </div>
    </div>
  </div>
{/if}
