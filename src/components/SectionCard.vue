<template>
  <section class="glass-card section-card" :class="[`tone-${tone}`]">
    <div v-if="title || subtitle" class="section-header">
      <div>
        <h3 class="section-title">{{ title }}</h3>
        <p v-if="subtitle" class="section-subtitle">{{ subtitle }}</p>
      </div>
      <slot name="extra" />
    </div>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subtitle: {
    type: String,
    default: ''
  },
  tone: {
    type: String,
    default: 'cyan'
  }
})
</script>
