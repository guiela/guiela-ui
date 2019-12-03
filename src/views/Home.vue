<template>
  <div>
    <!-- Full Page Image Header with Vertically Centered Content -->
    <header class="masthead">
      <div class="container h-100">
        <div class="row h-100 align-items-center">
          <div class="col-12 text-center">
            <img src="../assets/logo.jpeg" width="160px" height="auto" />
            <h1 class="font-weight-bold">Guiela <small class="text-muted">by Dev Circle Ouaga</small></h1>
            <p class="lead">Opensource project for automated bank reconciliations.</p>
          </div>
        </div>
      </div>
    </header>

    <!-- Page Content -->
    <!-- <section class="py-5">
      <div class="container">
        <h2 class="font-weight-light">Page Content</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus ab nulla dolorum autem nisi officiis blanditiis voluptatem hic, assumenda aspernatur facere ipsam nemo ratione cumque magnam enim fugiat reprehenderit expedita.</p>
      </div>
    </section> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
    //
  }
}
</script>

<style scoped>
  .masthead {
    height: 81vh;
    min-height: 500px;
    background-image: url('../assets/wallpaper.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
</style>
