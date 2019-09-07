<script context="module">
	import { getArticles, getUser, getCategory } from '../api'

	export async function preload(_, { user }) {
		const { totalCount, articles } = await getArticles('', this.fetch)
		for (const article of articles) {
			article.user = await getUser(article.userId, this.fetch)
			if (article.category) {
				article.category = await getCategory(article.category, this.fetch)
			}
		}
		return { user, totalCount, articles }
	}
</script>

<script>
	import Article from '../components/Article.svelte'

	import { getArticles as getArticles_ } from '../api'

	export let user
	export let totalCount
	export let articles

	let page = 0
	let size = 10

	async function loadMore() {
    const res = await getArticles_(`?page=${page++}&size=${size}`)
    articles = [...articles, res.articles]
  }
</script>

<svelte:head>
	<title>Artaeum</title>
</svelte:head>

<section class="pt-4">
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
				{#each articles as article}
					<Article {article} {user} />
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
  </div>
</section>
