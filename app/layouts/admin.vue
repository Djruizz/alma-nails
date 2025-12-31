<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-950">
    <!-- Admin Header -->
    <NavbarsAdminHeader />
    
    <!-- Main Content -->
    <UMain class="mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <slot />
    </UMain>
  </div>
</template>