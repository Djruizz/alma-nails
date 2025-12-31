<script setup lang="ts">
const { openCreateModal } = useServiceModal();
</script>
<template>
  <div
    class="flex flex-col items-center justify-center py-12 text-center"
  >
    <UIcon name="i-heroicons-scissors" class="w-16 h-16 text-gray-400 mb-4" />
    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">
      No hay servicios registrados
    </h3>
    <p class="text-gray-500 dark:text-gray-400 mb-4">
      Comienza agregando tu primer servicio
    </p>
    <UButton
      icon="i-heroicons-plus"
      color="primary"
      label="Crear Primer Servicio"
      @click="openCreateModal"
    />
  </div>
</template>
