<script setup lang="ts">
const { loading } = useLoading()
</script>
<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <NavbarsAdminHeader />
    <div v-show="loading" class="flex items-center justify-center py-12">
      <UIcon
        name="i-heroicons-arrow-path"
        class="w-8 h-8 animate-spin text-primary"
      />
    </div>
    <UMain v-show="!loading" class="mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <slot />
    </UMain>
  </div>
</template>
