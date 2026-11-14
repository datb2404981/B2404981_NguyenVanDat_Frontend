<script lang="ts">
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: { AppHeader },
}
</script>

<template>
  <div>
    <AppHeader />
    <div class="container mt-3">
      <RouterView />
    </div>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
