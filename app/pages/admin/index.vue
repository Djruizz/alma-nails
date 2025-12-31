<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

// Quick stats for dashboard
const stats = ref([
  {
    label: 'Total Servicios',
    value: '12',
    icon: 'i-heroicons-scissors',
    color: 'pink',
    change: '+2 este mes'
  },
  {
    label: 'Citas Hoy',
    value: '8',
    icon: 'i-heroicons-calendar',
    color: 'purple',
    change: '3 pendientes'
  },
  {
    label: 'Clientes Activos',
    value: '145',
    icon: 'i-heroicons-user-group',
    color: 'blue',
    change: '+12 este mes'
  },
  {
    label: 'Ingresos del Mes',
    value: '$12,450',
    icon: 'i-heroicons-currency-dollar',
    color: 'green',
    change: '+15% vs anterior'
  }
])

const quickActions = ref([
  {
    label: 'Gestionar Servicios',
    description: 'Administra los servicios disponibles',
    icon: 'i-heroicons-scissors',
    to: '/admin/services',
    color: 'pink'
  },
  {
    label: 'Ver Citas',
    description: 'Revisa el calendario de citas',
    icon: 'i-heroicons-calendar',
    to: '/admin/appointments',
    color: 'purple'
  },
  {
    label: 'Clientes',
    description: 'Gestiona tu base de clientes',
    icon: 'i-heroicons-user-group',
    to: '/admin/clients',
    color: 'blue'
  },
  {
    label: 'Galería',
    description: 'Administra las imágenes del portafolio',
    icon: 'i-heroicons-photo',
    to: '/admin/gallery',
    color: 'green'
  }
])
</script>

<template>
  <UContainer>
    <UPage>
      <!-- Dashboard Header -->
      <template #header>
        <UPageHeader
          title="Panel de Administración"
          description="Bienvenido a Alma Nails Admin"
        />
      </template>

      <!-- Stats Overview -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <UCard 
          v-for="(stat, index) in stats" 
          :key="index"
          class="hover:shadow-lg transition-all duration-200"
        >
          <div class="flex items-start justify-between">
            <div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">{{ stat.label }}</p>
              <p class="text-3xl font-bold text-gray-900 dark:text-white mb-2">{{ stat.value }}</p>
              <p class="text-xs text-gray-600 dark:text-gray-400">{{ stat.change }}</p>
            </div>
            <div 
              class="p-3 rounded-lg"
              :class="`bg-${stat.color}-100 dark:bg-${stat.color}-900/20`"
            >
              <UIcon 
                :name="stat.icon" 
                class="w-6 h-6"
                :class="`text-${stat.color}-600 dark:text-${stat.color}-400`"
              />
            </div>
          </div>
        </UCard>
      </div>

      <!-- Quick Actions -->
      <div class="mb-8">
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Acciones Rápidas</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <UCard 
            v-for="(action, index) in quickActions" 
            :key="index"
            class="hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer"
            @click="$router.push(action.to)"
          >
            <div class="flex items-start gap-4">
              <div 
                class="p-4 rounded-xl shrink-0"
                :class="`bg-${action.color}-100 dark:bg-${action.color}-900/20`"
              >
                <UIcon 
                  :name="action.icon" 
                  class="w-6 h-6"
                  :class="`text-${action.color}-600 dark:text-${action.color}-400`"
                />
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 dark:text-white mb-1">{{ action.label }}</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">{{ action.description }}</p>
              </div>
              <UIcon 
                name="i-heroicons-chevron-right" 
                class="w-5 h-5 text-gray-400 shrink-0 mt-1"
              />
            </div>
          </UCard>
        </div>
      </div>

      <!-- Recent Activity (placeholder for future) -->
      <div>
        <h2 class="text-xl font-semibold text-gray-900 dark:text-white mb-4">Actividad Reciente</h2>
        <UCard>
          <div class="text-center py-8">
            <UIcon name="i-heroicons-clock" class="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p class="text-gray-500 dark:text-gray-400">
              No hay actividad reciente para mostrar
            </p>
          </div>
        </UCard>
      </div>
    </UPage>
  </UContainer>
</template>