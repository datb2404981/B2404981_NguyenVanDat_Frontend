<template>
  <Form :validation-schema="contactFormSchema" :initial-values="contactLocal" @submit="submitContact">
    <div class="form-group">
      <label for="name">Tên</label>
      <Field id="name" v-model="contactLocal.name" name="name" type="text" class="form-control" />
      <ErrorMessage name="name" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="email">E-mail</label>
      <Field id="email" v-model="contactLocal.email" name="email" type="email" class="form-control" />
      <ErrorMessage name="email" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="address">Địa chỉ</label>
      <Field id="address" v-model="contactLocal.address" name="address" type="text" class="form-control" />
      <ErrorMessage name="address" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="phone">Điện thoại</label>
      <Field id="phone" v-model="contactLocal.phone" name="phone" type="tel" class="form-control" placeholder="0987 654 321 hoặc +84 987 654 321" />
      <ErrorMessage name="phone" class="error-feedback" />
    </div>

    <div class="form-group form-check">
      <input id="favorite" v-model="contactLocal.favorite" name="favorite" type="checkbox" class="form-check-input" />
      <label for="favorite" class="form-check-label"><strong>Liên hệ yêu thích</strong></label>
    </div>

    <div class="form-group">
      <button class="btn btn-primary" type="submit" :disabled="saving">Lưu</button>
      <button v-if="'_id' in contactLocal && contactLocal._id" type="button" class="ml-2 btn btn-danger" :disabled="saving" @click="deleteContact">Xóa</button>
      <button type="button" class="ml-2 btn btn-danger" :disabled="saving" @click="cancel">Thoát</button>
    </div>
  </Form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import * as yup from 'yup'
import { Form, Field, ErrorMessage } from 'vee-validate'
import type { Contact, ContactInput } from '@/service/contact.types'

function normalizePhone(value: string): string {
  const digits = value.trim().replace(/[\s().-]/g, '')
  if (digits.startsWith('+84')) return `0${digits.slice(3)}`
  if (digits.startsWith('84') && digits.length >= 11) return `0${digits.slice(2)}`
  return digits
}

export default defineComponent({
  components: { Form, Field, ErrorMessage },
  props: {
    contact: { type: Object as PropType<Contact | ContactInput>, required: true },
    saving: { type: Boolean, default: false },
  },
  emits: ['submit:contact', 'delete:contact'],
  data() {
    const contactFormSchema = yup.object().shape({
      name: yup.string().trim().required('Tên phải có giá trị.').min(2, 'Tên phải ít nhất 2 ký tự.').max(50, 'Tên có nhiều nhất 50 ký tự.'),
      email: yup.string().email('E-mail không đúng.').max(50, 'E-mail tối đa 50 ký tự.'),
      address: yup.string().max(100, 'Địa chỉ tối đa 100 ký tự.'),
      phone: yup.string().test('phone', 'Số điện thoại không hợp lệ.', value =>
        !value || /^(0[35789]\d{8}|02\d{8,9})$/.test(normalizePhone(value))),
    })
    return { contactLocal: { ...this.contact }, contactFormSchema }
  },
  methods: {
    submitContact() {
      this.$emit('submit:contact', {
        ...this.contactLocal,
        phone: normalizePhone(this.contactLocal.phone),
      })
    },
    deleteContact() {
      if ('_id' in this.contactLocal) this.$emit('delete:contact', this.contactLocal._id)
    },
    cancel() {
      if (window.confirm('Bạn có thay đổi chưa lưu. Bạn muốn thoát?')) {
        void this.$router.push({ name: 'contactbook' })
      }
    },
  },
})
</script>

<style scoped>
@import '@/assets/form.css';
</style>
