<template>
    <footer id="sticky-footer" class="flex-shrink-0 py-4 fixed-bottom">
    <div class="container text-center">
      <small>Copyright &copy; Opply</small>
    </div>
  </footer>
</template>

<script lang="ts">
    import { defineComponent } from "vue";
    export default defineComponent({
        name: "Footer",
    });

</script>

<style lang="css">
   #sticky-footer {
    z-index: 1;
   }
</style>
    