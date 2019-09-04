<script context="module">
  import Comments from '../../components/Comments.svelte'

  import { get, loadComments } from '../../utils'

  export async function preload({ params: { slug } }, { user }) {
    const articleResponse = await get(`blog/articles/${slug}`, this.fetch)
    if (articleResponse.status === 404) {
      return this.error(404, 'Not Found')
    }
    const article = await articleResponse.json()

    const authorResponse = await get(`uaa/users/${article.userId}`, this.fetch)
    const author = await authorResponse.json()

    const categoryResponse = await get(
      `blog/categories/${article.category}`,
      this.fetch
    )
    const category = await categoryResponse.json()

    const comments = await loadComments('article', article._id, this.fetch)

    return { article, author, category, comments, user }
  }
</script>

<script>
  export let article
  export let author
  export let category
  export let comments
  export let user
</script>

<style>
  section {
    padding-top: 0;
  }

  article {
    line-height: 1.5;
    margin: 30px 0 20px;
    font-size: 20px;
    color: #212529;
    font-family: Lora, "Times New Roman", serif;
  }

  p a {
    text-decoration: underline;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 800;
    font-family: "Open Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  }

  a {
    color: #212529;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
  }

  a:focus,
  a:hover {
    color: #0085a1;
  }

  blockquote {
    font-style: italic;
    color: #868e96;
  }

  header.masthead {
    margin-bottom: 25px;
    background: no-repeat center center;
    background-color: #868e96;
    background-attachment: scroll;
    position: relative;
    background-size: cover;
  }

  header.masthead .overlay {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: #212529;
    opacity: 0.5;
  }

  header.masthead .post-heading {
    padding: 200px 0 150px;
    color: #fff;
  }

  @media only screen and (min-width: 768px) {
    header.masthead .post-heading {
      padding: 200px 0;
    }
  }

  header.masthead .post-heading h1 {
    font-size: 35px;
  }

  header.masthead .post-heading .meta {
    line-height: 1.1;
    display: block;
  }

  header.masthead .post-heading .meta,
  header.masthead .post-heading .meta a {
    font-size: 20px;
    font-weight: 300;
    color: #fafafa;
    font-family: "Times New Roman", serif;
  }

  @media only screen and (min-width: 768px) {
    header.masthead .post-heading h1 {
      font-size: 55px;
    }
  }
</style>

<svelte:head>
  <title>{article.title} - Artaeum</title>
</svelte:head>

<section class="article-section">
  <header class="masthead" style="background-image: url(/ae-widescreen.jpg)">
    <div class="overlay" />
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto">
          <div class="post-heading">
            <h1>{article.title}</h1>
            <span class="meta">
              Posted by
              <a href={'/user/' + author.login}>@{author.login}</a>
              on {article.createdDate}
              <span>
                in
                <a href={`/user/${author.login}/blog/${category.name}`}>
                  {category.name}
                </a>
              </span>
              {#if user && user.id === author.id}
                |
                <a role="button" href={'/author/article/' + article._id}>
                  <i class="fa fa-pencil" title="Edit" />
                </a>
                |
                <a>
                  <i class="fa fa-remove" title="Remove" />
                </a>
              {/if}
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
  <article>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 col-md-10 mx-auto content">
          {@html article.body}
        </div>
      </div>
    </div>
  </article>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 col-md-10 mx-auto">
        <h4>Comments</h4>
        <Comments {comments} />
      </div>
    </div>
  </div>
</section>
