<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import tooltip from "./mixins/tooltip";

export default {
  mixins: [tooltip]
};
</script>


<style lang="scss">
#app {
  height: 100%;
}
</style>
