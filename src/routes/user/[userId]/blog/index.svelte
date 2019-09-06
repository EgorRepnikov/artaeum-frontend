<script context="module">
  import { get } from '../../../../utils'

  export async function preload({ params: { userId } }, user) {
    const articlesResponse = await get(`blog/articles?userId=${userId}`, this.fetch)
    const totalArticles = articlesResponse.headers.get('x-total-count')
    const articles = await articlesResponse.json()

    for (const article of articles) {
      const categoryResponse = await get(`blog/categories/${article.category}`, this.fetch)
      article.category = await categoryResponse.json()
    }

    const profileResponse = await get(`uaa/users/${userId}`, this.fetch)
    const profile = await profileResponse.json()

    return { user, totalArticles, articles, profile }
  }
</script>

<script>
  import Article from '../../../../components/Article.svelte'

  import { get as get_ } from '../../../../utils'

  export let user
  export let totalArticles
  export let articles
  export let profile

  let page = 0
  let size = 10

  async function loadMore() {
    const articlesResponse = await get_(
      `blog/articles?userId=${user.id}&page=${page++}&size=${size}`
    )
    articles = [...articles, await articlesResponse.json()]
  }
</script>

<div class="row">
  <div class="col-md-6 mx-auto">
    {#each articles as article}
      <Article {article} author={profile} {user}></Article>
    {/each}
  </div>
</div>
{#if totalArticles > articles.length}
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
        There isn't articles
      </div>
    </div>
  </div>
{/if}
