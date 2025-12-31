<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

// Navigation items - easily extensible for future additions
const navigationItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Servicios',
    to: '/admin/services',
    icon: 'i-heroicons-scissors',
    active: route.path.startsWith('/admin/services'),
    tooltip: {
      text: 'Gestionar servicios',
    }
  },
  // Future navigation items can be added here:
  // {
  //   label: 'Citas',
  //   to: '/admin/appointments',
  //   icon: 'i-heroicons-calendar',
  //   active: route.path.startsWith('/admin/appointments'),
  // },
  // {
  //   label: 'Clientes',
  //   to: '/admin/clients',
  //   icon: 'i-heroicons-user-group',
  //   active: route.path.startsWith('/admin/clients'),
  // },
  // {
  //   label: 'Galería',
  //   to: '/admin/gallery',
  //   icon: 'i-heroicons-photo',
  //   active: route.path.startsWith('/admin/gallery'),
  // },
  // {
  //   label: 'Configuración',
  //   to: '/admin/settings',
  //   icon: 'i-heroicons-cog-6-tooth',
  //   active: route.path.startsWith('/admin/settings'),
  // }
])

// User menu items for future implementation
const userMenuItems = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Mi Perfil',
    icon: 'i-heroicons-user-circle',
    to: '/admin/profile',
  },
  {
    label: 'Configuración',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/admin/settings',
  },
  {
    type: 'label',
    label: 'Sesión'
  },
  {
    label: 'Cerrar Sesión',
    icon: 'i-heroicons-arrow-right-on-rectangle',
    // Future: onClick: () => handleLogout()
  }
])

// For future notifications feature
const notificationsCount = ref(0)
const hasUnreadNotifications = computed(() => notificationsCount.value > 0)
</script>

<template>
  <UHeader 
    title="Administración" 
    to="/admin"
    class="border-b border-gray-200 dark:border-gray-800"
    mode="slideover"
    :ui="{ body: 'h-full' }"
  >
    <!-- Logo/Title on the left -->
    <template #title>
      <div class="flex items-center gap-2">
        <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-linear-to-br from-pink-500 to-purple-600 shadow-lg">
          <span class="text-white font-bold text-sm">AD</span>
        </div>
        <span class="font-semibold text-gray-900 dark:text-white hidden sm:inline">
          Administración
        </span>
      </div>
    </template>

    <!-- Desktop Navigation Menu (hidden on mobile) -->
    <UNavigationMenu 
      :items="navigationItems" 
      class="hidden md:flex"
      color="primary"
      variant="pill"
    />

    <!-- Right side actions -->
    <template #right>
      <div class="flex items-center gap-2">
        <!-- Search button - for future implementation -->
        <UTooltip text="Buscar" :kbds="['meta', 'K']">
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-heroicons-magnifying-glass"
            aria-label="Buscar"
            class="hidden sm:inline-flex"
          />
        </UTooltip>

        <!-- Notifications - for future implementation -->
        <UTooltip text="Notificaciones">
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-heroicons-bell"
            aria-label="Notificaciones"
            class="relative inline-flex"
          >
            <span 
              v-if="hasUnreadNotifications"
              class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-gray-900"
            />
          </UButton>
        </UTooltip>

        <!-- Color mode toggle -->
        <UColorModeButton />

        <!-- User menu - for future implementation -->
        <UDropdownMenu 
          :items="[userMenuItems]" 
          :popper="{ placement: 'bottom-end' }"
          class="hidden sm:inline-flex"
        >
          <UButton
            color="neutral"
            variant="ghost"
            icon="i-heroicons-user-circle"
            trailing-icon="i-heroicons-chevron-down"
            aria-label="Menú de usuario"
          >
            <span class="hidden lg:inline">Admin</span>
          </UButton>
        </UDropdownMenu>
      </div>
    </template>

    <!-- Mobile Navigation Menu (shown in modal/drawer) -->
    <template #body>
      <div class="flex flex-col justify-between gap-4 h-full">
        <!-- Mobile Navigation -->
        <UNavigationMenu 
          :items="navigationItems" 
          orientation="vertical"
          class="-mx-2.5"
        />

        <!-- Mobile User Menu -->
        <div class="px-2.5">
          <div class="flex items-center gap-3 mb-4 p-3 rounded-lg bg-gray-100 dark:bg-gray-800">
            <div class="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-pink-500 to-purple-600 text-white font-semibold">
              A
            </div>
            <div>
              <p class="text-sm font-semibold text-gray-900 dark:text-white">Admin</p>
              <p class="text-xs text-gray-500 dark:text-gray-400">admin@almanails.com</p>
            </div>
          </div>

          <UNavigationMenu 
            :items="userMenuItems" 
            orientation="vertical"
            class="-mx-2.5"
          />
        </div>
      </div>
    </template>
  </UHeader>
</template>
