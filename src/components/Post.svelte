<script>
  import { createEventDispatcher } from 'svelte'
  import Swal from 'sweetalert2'

  export let post
  export let author
  export let user

  const dispatch = createEventDispatcher()

  async function onDeleteClick() {
    const result = await Swal.fire({
      title: 'Post Deletion',
      text: 'Are you sure you want to delete this post?',
      confirmButtonText: 'Remove',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      type: 'warning'
    })
    result.value && dispatch('deletion')
  }
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
            <a class="login-link" href="/user/{author.login}">@{author.login}</a>
          </div>
          <div class="h7 text-muted">
            <a href="/posts/{post.id}" class="text-muted">
              {author.firstName} {author.lastName} | {post.createdDate}
            </a>
          </div>
        </div>
      </div>
      {#if user && user.id === author.id}
        <button class="btn btn-link dropdown-toggle" type="button" id="post{post.id}" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fa fa-ellipsis-h"></i>
        </button>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="post{post.id}">
          <a
            role="button"
            class="dropdown-item"
            on:click={onDeleteClick}
          >Remove</a>
        </div>
      {/if}
    </div>
  </div>
  <div class="card-body">
    <p class="card-text">{@html post.text}</p>
  </div>
</div>
