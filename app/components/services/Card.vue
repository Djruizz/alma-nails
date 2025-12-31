<script setup lang="ts">
const { updateService, deleteService } = useServices();
import { formatDuration } from "~/utils/format";
import { type Database } from "~/types/database.types";
type Service = Database["public"]["Tables"]["services"]["Row"];
const { openEditModal } = useServiceModal();

defineProps<{
  service: Service;
}>();
</script>
<template>
  <UCard :key="service.id" class="hover:shadow-lg transition-shadow">
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="font-semibold text-lg">
          {{ service.name || "Sin nombre" }}
        </h3>
        <UBadge :color="service.is_active ? 'success' : 'neutral'">
          {{ service.is_active ? "Activo" : "Inactivo" }}
        </UBadge>
      </div>
    </template>

    <div class="space-y-2">
      <div class="flex items-center justify-between pt-2">
        <span class="text-lg font-bold">
          Precio:
          <span class="text-lg font-bold text-primary">
            {{ service.price ? `$${service.price}` : "Precio no disponible" }}
          </span>
        </span>
      </div>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ formatDuration(service.duration_min) || "Sin duración" }}
      </p>
    </div>

    <template #footer>
      <div class="flex gap-2">
        <UButton
          icon="i-heroicons-pencil"
          color="neutral"
          variant="ghost"
          size="sm"
          label="Editar"
          @click="openEditModal(service)"
        />
        <UButton
          icon="i-heroicons-trash"
          color="error"
          variant="ghost"
          size="sm"
          label="Eliminar"
          @click="deleteService(service.id)"
        />
      </div>
    </template>
  </UCard>
</template>
