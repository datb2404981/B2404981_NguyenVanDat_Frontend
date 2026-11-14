<script lang="ts">
import type { Contact } from '@/service/contact.types'
import type { PropType } from 'vue'

export default {
  props: {
    contacts: { type: Array as PropType<Contact[]>, default: () => [] },
    activeIndex: { type: Number, default: -1 },
  },
  emits: ['update:activeIndex'],
  methods: {
    updateActiveIndex(index: number) {
      this.$emit('update:activeIndex', index)
    },
  },
}
</script>

<template>
  <ul class="list-group">
    <li
      v-for="(contact, index) in contacts"
      :key="contact._id"
      class="list-group-item"
      :class="{ active: index === activeIndex }"
      tabindex="0"
      role="button"
      :aria-current="index === activeIndex ? 'true' : undefined"
      @click="updateActiveIndex(index)"
      @keydown.enter="updateActiveIndex(index)"
      @keydown.space.prevent="updateActiveIndex(index)"
    >
      {{ contact.name }}
    </li>
  </ul>
</template>
