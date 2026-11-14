<script lang="ts">
import { defineComponent } from 'vue'
import InputSearch from '@/components/InputSearch.vue'
import ContactList from '@/components/ContactList.vue'
import ContactCard from '@/components/ContactCard.vue'
import ContactService from '@/service/contact.service'
import type { Contact } from '@/service/contact.types'

export default defineComponent({
  components: { ContactCard, InputSearch, ContactList },
  data() {
    return {
      contacts: [] as Contact[],
      activeIndex: -1,
      searchText: '',
      error: '',
    }
  },
  watch: {
    searchText() { this.activeIndex = -1 },
  },
  computed: {
    contactStrings(): string[] {
      return this.contacts.map(({ name, email, address, phone }) =>
        [name, email, address, phone].join('').toLowerCase())
    },
    filteredContacts(): Contact[] {
      if (!this.searchText) return this.contacts
      return this.contacts.filter((_contact, index) =>
        this.contactStrings[index]?.includes(this.searchText.toLowerCase()))
    },
    activeContact(): Contact | null {
      if (this.activeIndex < 0) return null
      return this.filteredContacts[this.activeIndex] ?? null
    },
    filteredContactsCount(): number { return this.filteredContacts.length },
  },
  methods: {
    async retrieveContacts() {
      try {
        this.error = ''
        this.contacts = await ContactService.getAll()
      } catch {
        this.error = 'Không tải được danh bạ. Hãy kiểm tra máy chủ.'
      }
    },
    refreshList() {
      this.activeIndex = -1
      void this.retrieveContacts()
    },
    async removeAllContacts() {
      if (!window.confirm('Bạn muốn xóa tất cả Liên hệ?')) return
      try {
        await ContactService.deleteAll()
        this.refreshList()
      } catch {
        this.error = 'Không xóa được danh bạ.'
      }
    },
    goToAddContact() { void this.$router.push({ name: 'contact.add' }) },
  },
  mounted() { this.refreshList() },
})
</script>
<template>
  <div class="page row">
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
      <p v-if="error" class="alert alert-danger mt-3" role="alert">{{ error }}</p>
    </div>

    <div class="mt-3 col-md-6">
      <h4>Danh bạ <i class="fas fa-address-book" aria-hidden="true"></i></h4>
      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>

      <div class="mt-3 row justify-content-around align-items-center">
        <button class="btn btn-sm btn-primary" type="button" @click="refreshList()">
          <i class="fas fa-redo" aria-hidden="true"></i> Làm mới
        </button>
        <button class="btn btn-sm btn-success" type="button" @click="goToAddContact">
          <i class="fas fa-plus" aria-hidden="true"></i> Thêm mới
        </button>
        <button class="btn btn-sm btn-danger" type="button" @click="removeAllContacts">
          <i class="fas fa-trash" aria-hidden="true"></i> Xóa tất cả
        </button>
      </div>
    </div>

    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>Chi tiết Liên hệ <i class="fas fa-address-card" aria-hidden="true"></i></h4>
        <ContactCard :contact="activeContact" />
        <RouterLink :to="{ name: 'contact.edit', params: { id: activeContact._id } }">
          <span class="mt-2 badge badge-warning"><i class="fas fa-edit" aria-hidden="true"></i> Hiệu chỉnh</span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
