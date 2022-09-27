<template>
    <Headers></Headers>
      <!-- Begin page content -->
      <main role="main" id="page-content">
        <div class="container">
          <div class="row d-flex justify-content-center">
            <router-view></router-view>
            <SupplierDetail />
          </div>
        </div>
      </main>
    <Footer></Footer>
</template>

<script lang="ts">
    import { defineComponent, onMounted } from "vue";
    import { useStore } from "vuex";
    import {  useRouter } from "vue-router";
    import Headers from "./layout/Headers.vue";
    import Footer from "./layout/Footer.vue";
    import SupplierDetail from "./content/SupplierDetail.vue"
    
    export default defineComponent({
      name: "Overview",
      components: {
        Headers,
        Footer,
        SupplierDetail
      },

      setup() {
        const store = useStore();
        const router = useRouter();
        
        onMounted(() => {
          //check if current user is authenticated
          if (!store.getters.isUserAuthenticated) {
            router.push({ name: "sign-in" });
          }
        });

        return { };

      }

    });
</script>

<style lang="css">
  main > .container {
    padding-top: 100px;
  }
  #page-content{
    margin-bottom: 30px;
  }
</style>
    