<script setup lang="ts">
definePageMeta({
  layout: "admin",
});
const { services, error, fetchServices, createService } = useServices();
const { openCreateModal } = useServiceModal();
onMounted(() => {
  fetchServices();
});
</script>

<template>
  <UContainer>
    <UPage>
      <UPageHeader
        title="Gestión de Servicios"
        description="Administra todos los servicios disponibles en Alma Nails"
      >
        <template #links>
          <UButton
            icon="i-heroicons-plus"
            color="primary"
            label="Nuevo Servicio"
            class="w-full"
            @click="
              openCreateModal()
            "
          />
        </template>
      </UPageHeader>

      <div class="grid grid-cols-1 gap-6 mt-5">
        <div
          v-if="services.length > 0"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <ServicesCard
            v-for="service in services"
            :key="service.id"
            :service="service"
          />
        </div>

        <div
          v-else
          class="flex flex-col items-center justify-center py-12 text-center"
        >
          <UIcon
            name="i-heroicons-scissors"
            class="w-16 h-16 text-gray-400 mb-4"
          />
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
          />
        </div>
      </div>
    </UPage>
    <ServicesModal />
  </UContainer>
</template>
