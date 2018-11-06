<template>
  <div>
    <NavBar/>
    <Alert/>
    <div class="container-fluid">
      <div class="row">
        <SideBar/>

        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
          <router-view/>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import SideBar from '@/components/SideBar'
import Alert from '@/components/Alert'
export default {
  components: {
    Alert,
    NavBar,
    SideBar
  }
}
</script>

<style>

</style>
