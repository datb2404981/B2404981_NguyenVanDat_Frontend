<script lang="ts">
import type { Contact } from '@/service/contact.types'
import type { PropType } from 'vue'

export default {
  props: {
    contact: { type: Object as PropType<Contact>, required: true },
  },
}
</script>

<template>
  <div>
    <div class="p-1"><strong>Tên:</strong> {{ contact.name }}</div>
    <div class="p-1"><strong>E-mail:</strong> {{ contact.email }}</div>
    <div class="p-1"><strong>Địa chỉ:</strong> {{ contact.address }}</div>
    <div class="p-1"><strong>Điện thoại:</strong> {{ contact.phone }}</div>
    <div class="p-1">
      <strong>Liên hệ yêu thích:&nbsp;</strong>
      <i v-if="contact.favorite" class="fas fa-check" aria-label="Có" />
      <i v-else class="fas fa-times" aria-label="Không" />
    </div>
  </div>
</template>
