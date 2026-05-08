<template>
  <span class="severity-tag" :class="levelClass">{{ label }}</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  label: {
    type: String,
    required: true
  }
})

const levelClass = computed(() => {
  if (['高危', '危险'].includes(props.label)) return 'is-high'
  if (['中危', '警告'].includes(props.label)) return 'is-medium'
  if (['低危', '安全'].includes(props.label)) return 'is-low'
  return 'is-neutral'
})
</script>
