<script context="module">
  import { getSubscriptions, getArticles, getUser, getCategory } from '../../api'

  export async function preload(_, { user }) {
    const subscriptions = await getSubscriptions(`?subscriberId=${user.id}`, this.fetch)
    const subscriptionIds = subscriptions.map((s) => s.profileId).join(',')
    const { totalCount, articles } = await getArticles(`?users=${subscriptionIds}`, this.fetch)
    for (const article of articles) {
      article.user = await getUser(article.userId, this.fetch)
      if (article.category) {
        article.category = await getCategory(article.category, this.fetch)
      }
    }
    return { user, subscriptionIds, totalCount, articles }
  }
</script>

<script>
  import Article from '../../components/Article.svelte'

  import { getArticles as getArticles_ } from '../../api'

  export let user
  export let subscriptionIds
  export let totalCount
  export let articles

  const size = 10
  let page = 0

  async function loadMore() {
    const res = await getArticles_(`?users=${subscriptionIds}&page=${page++}&size=${size}`)
    articles = [...articles, res.articles]
  }
</script>

<svelte:head>
	<title>Articles from subscriptions - Artaeum</title>
</svelte:head>

<div class="col-md-6 mx-auto">
  {#each articles as article}
    <Article {article} {user} />
  {/each}
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
