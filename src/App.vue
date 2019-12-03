<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark border-bottom fixed-top shadow-sm">
      <router-link class="navbar-brand" to="/" exact>
        <!-- Logo Image -->
        <img src="./assets/logo.png" width="45" alt="" class="d-inline-block align-middle mr-2">
        <!-- Logo Text -->
        <span class="text-uppercase font-weight-bold">Guiela</span>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/" exact><i class="fas fa-home"></i> Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/dashboard"><i class="fas fa-desktop"></i> Dashboard</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/how-to"><i class="fas fa-question"></i> How To</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about"><i class="fas fa-exclamation"></i> About</router-link>
          </li>
        </ul>
      </div>
    </nav>
    
    <router-view/>

    <footer class="navbar navbar-expand navbar-light bg-white fixed-bottom border-top border-left-0 border-right-0">
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarText">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <a class="nav-link" href="#" title="Facebook"><span style="color: skyblue;"><i class="fab fa-facebook"></i></span> Facebook</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" title="Github"><span style="color: black;"><i class="fab fa-github"></i></span> Github</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/guiela/guiela-ui" title="UI git repository"><i class="fas fa-code-branch"></i> UI Repository</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://github.com/guiela/guiela-api" title="API git Repository"><i class="fas fa-code-branch"></i> API Repository</a>
          </li>
        </ul>
          <span class="navbar-text ml-right">
            Developed and maintained with <span style="color: red"><i class="fas fa-heart"></i></span> by <a href="https://www.facebook.com/groups/DevCOuagadougou" title="Facebook Developer Circle Ouagadougou" target="_blank">Facebook Developer Circle Ouagadougou</a>, Burkina Faso.
          </span>
      </div>
    </footer>
  </div>
</template>

<script>
  // Import and configure toaster.
  import toastr from 'toastr'
  toastr.options.progressBar = true
  toastr.options.closeDuration = 300

  window.toastr = toastr

  export default {
    
  }
</script>

<style>
	@import '~@fortawesome/fontawesome-free/css/all.min.css';
  @import '~toastr/build/toastr.min.css';
  @import '~bootstrap-vue/dist/bootstrap-vue.css';

  body {
    padding-top: 86.91px;
    padding-bottom: 60px;
  }

  .blog-post-title {
    margin-bottom: .25rem;
    font-size: 2.5rem;
    font-family: "Playfair Display", Georgia, "Times New Roman", serif;
  }

  .blog-post-meta {
      margin-bottom: 1.25rem;
      color: #999;
  }
</style>