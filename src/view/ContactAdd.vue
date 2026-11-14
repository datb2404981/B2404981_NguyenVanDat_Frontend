<template>
  <div class="page">
    <h4>Thêm mới Liên hệ</h4>
    <ContactForm :contact="contact" :saving="saving" @submit:contact="createContact" />
    <p v-if="message" role="alert">{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContactForm from '@/components/ContactForm.vue'
import ContactService from '@/service/contact.service'
import type { ContactInput } from '@/service/contact.types'

export default defineComponent({
  components: { ContactForm },
  data() {
    return {
      contact: { name: '', email: '', address: '', phone: '', favorite: false } as ContactInput,
      message: '',
      saving: false,
    }
  },
  methods: {
    async createContact(data: ContactInput) {
      this.saving = true
      this.message = ''
      try {
        await ContactService.create(data)
        window.alert('Liên hệ được thêm thành công.')
        await this.$router.push({ name: 'contactbook' })
      } catch {
        this.message = 'Không thêm được liên hệ. Hãy kiểm tra máy chủ và thử lại.'
      } finally {
        this.saving = false
      }
    },
  },
})
</script>
