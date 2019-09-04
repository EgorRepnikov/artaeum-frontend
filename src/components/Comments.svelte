<script>
  export let comments
</script>

<div class="comments">
  <div class="action-box">
    <ul class="comment-list">
      {#each comments as c}
        <li>
          <div class="comment-image">
            <img src="/storage/article/mock" onError="this.src = '/ae.jpg'" />
          </div>
          <div class="comment-text">
            <a href={'/user/' + c.user.login}>{c.user.firstName} {c.user.lastName}</a>
            <div>{@html c.text}</div>
            <span class="date sub-text">{c.createdDate}</span>
          </div>
        </li>
      {/each}
    </ul>
    <!-- <form class="form-inline">
      <div class="form-group">
        Comment Form
      </div>
      <div class="form-group">
        <button class="btn btn-link">Submit</button>
      </div>
    </form> -->
  </div>      
</div>
