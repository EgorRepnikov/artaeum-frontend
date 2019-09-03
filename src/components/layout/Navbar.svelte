<script>
  export let user
</script>

<nav class="navbar navbar-dark navbar-expand-lg">
  <div class="container">
    <a class="navbar-brand" href="/">Artæum</a>
    <button
      class="navbar-toggler navbar-toggler-right"
      type="button"
      data-toggle="collapse"
      data-target="#navbarResponsive"
      aria-controls="navbarResponsive"
      aria-expanded="false"
      aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
    <div class="collapse navbar-collapse" id="navbarResponsive">
      <ul class="navbar-nav ml-auto">
        {#if user}
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarAccountDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false">
              Account
            </a>
            <div
              class="dropdown-menu dropdown-menu-right animate slideIn"
              aria-labelledby="navbarAccountDropdown">
              <a class="dropdown-item" href="/">Profile</a>
              <a class="dropdown-item" href="/">Blog</a>
              <a class="dropdown-item" href="/">Settings</a>
              <a class="dropdown-item" href="/">Log Out</a>
            </div>
          </li>
        {:else}
          <li class="nav-item">
            <a class="nav-link" href="/register">Sign Up</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/login">Log In</a>
          </li>
        {/if}
      </ul>
    </div>
  </div>
</nav>
