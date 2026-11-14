<script setup lang="ts">
withDefaults(defineProps<{ modelValue?: string }>(), { modelValue: '' })
const emit = defineEmits<{
  'update:modelValue': [value: string]
  submit: []
}>()

function updateModelValue(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function submit() {
  emit('submit')
}
</script>

<template>
  <div class="input-group">
    <input
      type="text"
      class="form-control"
      placeholder="Nhập thông tin cần tìm"
      aria-label="Nhập thông tin cần tìm"
      :value="modelValue"
      @input="updateModelValue"
      @keyup.enter="submit"
    />
    <div class="input-group-append">
      <button class="btn btn-outline-secondary" type="button" @click="submit">
        <i class="fas fa-search" aria-hidden="true"></i> Tìm kiếm
      </button>
    </div>
  </div>
</template>
