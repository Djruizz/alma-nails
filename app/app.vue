<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' }
  ],
  htmlAttrs: {
    lang: 'es'
  }
})

const title = 'Alma Nails - Salón de Uñas, Pestañas y Spa'
const description = 'Descubre la belleza en cada detalle. Servicios profesionales de uñas, pestañas, manicure y pedicure en un ambiente relajante y acogedor. ¡Reserva tu cita hoy!'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
