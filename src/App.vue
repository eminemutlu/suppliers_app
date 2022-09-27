
<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "app",
  setup() {},
});

</script>
<style lang="css">
  .container {
    z-index: 2;
    position: relative;
  }
</style>
