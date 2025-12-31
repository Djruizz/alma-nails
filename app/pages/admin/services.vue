<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const supabase = useSupabaseClient()
const services = ref<any>([])
const loading = ref(true)

const getServices = async () => {
  loading.value = true
  const { data, error } = await supabase.from('services').select('*')
  if (!error) {
    services.value = data
  }
  loading.value = false
}

onMounted(() => {
  getServices()
})
</script>

<template>
  <UContainer>
    <UPage>
      <!-- Page Header -->
      <template #header>
        <UPageHeader
          title="Gestión de Servicios"
          description="Administra todos los servicios disponibles en Alma Nails"
        >
          <template #actions>
            <UButton
              icon="i-heroicons-plus"
              color="primary"
              label="Nuevo Servicio"
            />
          </template>
        </UPageHeader>
      </template>

      <!-- Services Content -->
      <div class="grid grid-cols-1 gap-6">
        <!-- Loading State -->
        <div v-if="loading" class="flex items-center justify-center py-12">
          <UIcon name="i-heroicons-arrow-path" class="w-8 h-8 animate-spin text-primary" />
        </div>

        <!-- Services List -->
        <div v-else-if="services.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <UCard v-for="service in services" :key="service.id" class="hover:shadow-lg transition-shadow">
            <template #header>
              <h3 class="font-semibold text-lg">{{ service.name || 'Sin nombre' }}</h3>
            </template>
            
            <div class="space-y-2">
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ service.description || 'Sin descripción' }}</p>
              <div class="flex items-center justify-between pt-2">
                <span class="text-lg font-bold text-primary">
                  {{ service.price ? `$${service.price}` : 'Precio no disponible' }}
                </span>
                <UBadge :color="service.active ? 'success' : 'neutral'">
                  {{ service.active ? 'Activo' : 'Inactivo' }}
                </UBadge>
              </div>
            </div>

            <template #footer>
              <div class="flex gap-2">
                <UButton
                  icon="i-heroicons-pencil"
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  label="Editar"
                />
                <UButton
                  icon="i-heroicons-trash"
                  color="error"
                  variant="ghost"
                  size="sm"
                  label="Eliminar"
                />
              </div>
            </template>
          </UCard>
        </div>

        <!-- Empty State -->
        <div v-else class="flex flex-col items-center justify-center py-12 text-center">
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
          />
        </div>
      </div>
    </UPage>
  </UContainer>
</template>
