<script setup lang="ts">
const supabase = useSupabaseClient()
const services = ref<any>([])
const getServices = async () => {
  const { data } = await supabase.from('services').select('*')
  services.value = data
}
onMounted(() => {
  getServices()
})
</script>
<template>
  servicios
  <p v-for="service in services" :key="service.id">{{ service }}</p>
</template>