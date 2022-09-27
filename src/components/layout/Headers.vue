<template>
    <header>
      <!-- Fixed navbar -->
      <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <a class="navbar-brand" href="#">Dashbord</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link to="/suppliers" class="text-white text-hover-primary nav-link">Suppliers</router-link>
            </li>
            <li class="nav-item active">
              <router-link to="/quotes" class="text-white text-hover-primary nav-link">Quotes</router-link>
            </li>
          </ul>
          <div class="nav-item dropdown mr-3">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <font-awesome-icon icon="user" class="text-white" /><span class="ml-2 text-white">{{user.name}}</span>
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#" @click="signOut()">Logout</a>
            </div>
          </div>
         
        </div>
      </nav>
    </header>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    import { useStore } from "vuex";
    import { useRouter } from "vue-router";
    import { Actions } from "@/store/enums/storeEnums";

    export default defineComponent({
      name: "Headers",
      components: {},

      setup() {
        const user = { name: localStorage.getItem("userName") } 
        const store = useStore();
        const router = useRouter();

        const signOut = async () => {
          store.dispatch(Actions.LOGOUT);
          if (!store.getters.isUserAuthenticated) {
            return await router.push({ name: "sign-in" });
          }
        }

        return {
          user,
          signOut
        };
      }

    });
    
</script>
    

<style lang="css" scoped>
  .dropdown-toggle::after {
     color: white;
  }
  .dropdown-menu{
    min-width: 8rem;
    border: solid 1px #ccc;
  }
</style>
