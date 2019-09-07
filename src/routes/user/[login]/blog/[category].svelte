<script context="module">
  import { getCategories, getArticles, getUser } from '../../../../api'

  export async function preload({ params: { login, category } }, { user }) {
    const profile = await getUser(login, this.fetch)

    const categories = await getCategories(`?userId=${profile.id}`, this.fetch)
    category = categories.find((c) => c.name === category)
    if (!category) {
      return this.error(404, 'Category hasn\'t been found')
    }

    const { totalCount, articles} = await getArticles(
      `?userId=${profile.id}&category=${category._id}`, this.fetch
    )
    for (const article of articles) {
      article.user = profile
      article.category = category
    }

    return { user, profile, category, totalCount, articles }
  }
</script>

<script>
  import Article from '../../../../components/Article.svelte'

  import { getArticles as getArticles_ } from '../../../../api'

  export let user
  export let profile
  export let category
  export let totalCount
  export let articles

  let page = 0
  let size = 10

  async function loadMore() {
    const res = await getArticles_(
      `?userId=${profile.id}&category=${category._id}&page=${page++}&size=${size}`
    )
    articles = [...articles, res.articles]
  }
</script>

<svelte:head>
  <title>@{profile.login}'s Blog, {category.name} - Artaeum</title>
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
{#if articles.length === 0}
  <div class="row">
    <div class="col-md-6 mx-auto">
      <div class="alert alert-dark font-weight-bold" role="alert">
        There are no articles
      </div>
    </div>
  </div>
{/if}
