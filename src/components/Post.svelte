<script>
  export let post
  export let author
  export let user
</script>

<div class="card post-card">
  <div class="card-header">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex justify-content-between align-items-center">
        <div class="mr-2">
          <img class="rounded-circle" width="45" src="/storage/profile/avatar/mock" onError="this.src = '/ae.jpg'" alt={post.id}>
        </div>
        <div class="ml-2">
          <div class="h5 m-0">
            <a class="login-link" href={`/user/${author.login}`}>@{author.login}</a>
          </div>
          <div class="h7 text-muted">
            {author.firstName} {author.lastName} | {post.createdDate}
          </div>
        </div>
      </div>
      {#if user && user.id === author.id}
        <button class="btn btn-link dropdown-toggle" type="button" id={`post${post.id}`} data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-ellipsis-h"></i>
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby={`post${post.id}`}>
          <a role="button" class="dropdown-item">Remove</a>
        </div>
      {/if}
    </div>
  </div>
  <div class="card-body">
    <p class="card-text">{@html post.text}</p>
  </div>
  <div class="card-footer">
    <span class="card-link">
      <!-- Like -->
    </span>
    <span class="card-link">
      <!-- Comment -->
    </span>
    <span class="card-link post-button">
      <a href={`/post/${post.id}`}>
        <i class="fa fa-link"></i>
      </a>
    </span>
  </div>
</div>
