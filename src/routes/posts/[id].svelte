<script context="module">
  import { getPost, getUser, getComments } from '../../api'

  export async function preload({ params: { id } }, { user }) {
    const post = await getPost(id, this.fetch)
    if (!post) {
      return this.error(404, 'Not Found')
    }
    const author = await getUser(post.userId, this.fetch)
    const comments = await getComments('post', post._id, this.fetch)
    for (const comment of comments) {
      comment.user = await getUser(comment.userId, this.fetch)
    }
    return { user, post, author, comments }
  }
</script>

<script>
  import Comments from '../../components/Comments.svelte'
  import Post from '../../components/Post.svelte'

  export let user
  export let post
  export let author
  export let comments
</script>

<svelte:head>
  <title>@{author.login}'s Post - Artaeum</title>
</svelte:head>

<section class="mt-4">
  <div class="container">
    <div class="row justify-content-md-center">
      <div class="col-lg-6 col-md-8 col-xs-12">
        <Post {post} {author} {user} />
        <Comments {comments} />
      </div>
    </div>
  </div>
</section>
