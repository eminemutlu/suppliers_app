<template>
      <main role="main">
        <div class="container">
          <div class="row dashbord">
            <div class="col bg-light">
              <router-link
                class="menu-link"
                active-class="active"
                to="/suppliers"
                >
                <span class="menu-title text-muted" style="font-size: 3rem; margin-left: 20px;">Suppliers</span>
              </router-link>
            </div>
            <div class="col bg-light">
              <router-link
                class="menu-link"
                active-class="active"
                to="/quotes"
                >
                <span class="menu-title text-muted" style="font-size: 3rem; margin-left: 20px;">Quotes</span>
              </router-link>
            </div>
          </div>
        </div>
      </main>

</template>

<script lang="ts">
    import { defineComponent } from "vue";
  
    export default defineComponent({
      name: "dashboard",
      components: { },

      setup() {

        return { };

      }

    });
</script>

<style lang="css">
  main > .container {
    padding-top: 100px;
  } 
  .dashbord {
    display: flex;
    flex-direction: row;
    /* padding: 50px; */
  }
  .dashbord div {
    padding: 50px;
    border: solid 1px #ccc;
    margin: 25px;
  }
  .dashbord a:hover {
    text-decoration: none;
  }
</style>
    