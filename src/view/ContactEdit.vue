<template>
  <div v-if="contact" class="page">
    <h4>Hiệu chỉnh Liên hệ</h4>
    <ContactForm
      :contact="contact"
      :saving="saving"
      @submit:contact="updateContact"
      @delete:contact="deleteContact"
    />
    <p v-if="message" role="alert">{{ message }}</p>
  </div>
  <p v-else-if="message" class="page alert alert-danger" role="alert">{{ message }}</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { isAxiosError } from 'axios'
import ContactForm from '@/components/ContactForm.vue'
import ContactService from '@/service/contact.service'
import type { Contact, ContactInput } from '@/service/contact.types'

export default defineComponent({
  components: { ContactForm },
  props: { id: { type: String, required: true } },
  data() {
    return {
      contact: null as Contact | null,
      message: '',
      saving: false,
    }
  },
  methods: {
    async getContact(id: string) {
      try {
        this.contact = await ContactService.get(id)
        this.message = ''
      } catch (error) {
        if (isAxiosError(error) && error.response?.status === 404) {
          await this.$router.replace({ name: 'notfound', params: { pathMatch: this.$route.path.split('/').slice(1) }, query: this.$route.query, hash: this.$route.hash })
        } else {
          this.message = 'Không tải được liên hệ. Hãy kiểm tra máy chủ.'
        }
      }
    },
    async updateContact(data: ContactInput) {
      if (!this.contact) return
      this.saving = true
      try {
        await ContactService.update(this.contact._id, data)
        window.alert('Liên hệ được cập nhật thành công.')
        await this.$router.push({ name: 'contactbook' })
      } catch {
        this.message = 'Không cập nhật được liên hệ.'
      } finally {
        this.saving = false
      }
    },
    async deleteContact() {
      if (!this.contact || !window.confirm('Bạn muốn xóa Liên hệ này?')) return
      this.saving = true
      try {
        await ContactService.delete(this.contact._id)
        await this.$router.push({ name: 'contactbook' })
      } catch {
        this.message = 'Không xóa được liên hệ.'
      } finally {
        this.saving = false
      }
    },
  },
  created() { void this.getContact(this.id) },
})
</script>
