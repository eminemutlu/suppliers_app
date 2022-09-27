<template>
  
  <div class="container">
    <!-- p-10 p-lg-15 col-sm-8 col-10 -->
    <div class="d-flex justify-content-center mx-auto login-style mt-5 row">
      <div class="bg-white rounded shadow-sm p-3 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-12">
          <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
            />
          <router-view></router-view>
      </div>
    </div>
  </div>

  <Footer></Footer>

</template>
  
  <script lang="ts">
  import { defineComponent, onMounted, onUnmounted } from "vue";
  import Footer from "./layout/Footer.vue"
  
  export default defineComponent({
    name: "auth",
    components: { Footer },
    setup() {
      onMounted(() => {});
  
      onUnmounted(() => {});
  
      return {

      };
    },
  });
  </script>

  <style lang="css">
    .profile-img-card {
        width: 96px;
        height: 96px;
        margin: 0 auto 10px;
        display: block;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
    }
  </style>