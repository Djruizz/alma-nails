<script setup lang="ts">
const { isOpen, mode, service, closeModal } = useServiceModal();

const { createService, updateService, fetchServices } = useServices();

const state = reactive({
  name: "",
  price: 0,
  duration_min: 0,
  is_active: true,
});
watch(service, () => {
  state.name = service.value?.name ?? "";
  state.price = service.value?.price ?? 0;
  state.duration_min = service.value?.duration_min ?? 0;
  state.is_active = service.value?.is_active ?? true;
});
const handleSubmit = async () => {
  if (mode.value === "create") {
    await createService(state);
    cleanState();
  } else {
    await updateService(service.value!.id, state);
    cleanState();
  }
  closeModal();
};
const cleanState = () => {
  state.name = "";
  state.price = 0;
  state.duration_min = 0;
  state.is_active = true;
};
const title = computed(() => {
  return mode.value === "create" ? "Nuevo Servicio" : "Editar Servicio";
});
const description = computed(() => {
  return mode.value === "create"
    ? "Agrega un nuevo servicio"
    : "Edita el servicio";
});
</script>

<template>
  <UModal v-model:open="isOpen" :title="title" :description="description">
    <template #body>
      <UInput v-model="state.name" label="Nombre" />
      <UInput v-model="state.price" label="Precio" type="number" />
      <UInput v-model="state.duration_min" label="Duración" type="number" />
      <UCheckbox v-model="state.is_active" label="Activo" v-if="mode === 'edit'"/>
    </template>
    <template #footer>
      <UButton
        label="Cancelar"
        @click="closeModal"
        class="mx-auto"
        variant="outline"
        color="neutral"
      />
      <UButton label="Guardar" @click="handleSubmit" class="mx-auto" />
    </template>
  </UModal>
</template>
