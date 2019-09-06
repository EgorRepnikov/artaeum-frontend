<script>
  export let article
  export let author
  export let user
</script>

<div class="post">
  <a href="/articles/{article._id}">
    <h2>{article.title}</h2>
  </a>
  <p>Posted by
    <a href="/user/{author.login}">@{author.login}</a>
    on {article.createdDate}
    {#if article.category}
      in
      <a href="/user/{author.login}/blog/{article.category.name}">{article.category.name}</a>
    {/if}
    {#if user && user.id === author.id}
      |
      <a href="/author/article/{article._id}">
        <i class="fa fa-pencil" title="Edit"></i>
      </a>
    {/if}
  </p>
  <img class="w-100" src="/storage/blog/article/mock" onError="this.src = '/ae-widescreen.jpg'" alt={article.title}>
  <hr>
</div>