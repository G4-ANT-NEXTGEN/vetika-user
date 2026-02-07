<template>
  <select ref="selectEl" class="form-select tom-select" :multiple="multiple">
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import TomSelect from 'tom-select'

const props = defineProps({
  modelValue: [String, Array],
  options: { type: Array, required: true },
  multiple: Boolean,
  placeholder: String,
})

const emit = defineEmits(['update:modelValue'])

const selectEl = ref(null)
let tom

onMounted(() => {
  tom = new TomSelect(selectEl.value, {
    maxItems: props.multiple ? null : 1,
    placeholder: props.placeholder || 'Select...',
    items: props.modelValue ? [].concat(props.modelValue) : [],
    closeAfterSelect: !props.multiple,
    plugins: props.multiple ? ['remove_button'] : [],
    onChange(value) {
      emit('update:modelValue', props.multiple ? value : value[0])
    },
  })
})

const updateOptions = () => {
  if (!tom) return
  tom.clearOptions()
  tom.addOptions(props.options)
  tom.refreshOptions(false)
}

watch(() => props.options, updateOptions, { deep: true })

watch(
  () => props.modelValue,
  (val) => {
    tom?.setValue(val ? [].concat(val) : [], true)
  }
)

onBeforeUnmount(() => tom?.destroy())
</script>

<style>
/* Main Wrapper */
.ts-wrapper {
  width: 100%;
}

/* Control Input Area */
.ts-control {
  background: var(--color-surface) !important;
  border: 1px solid var(--color-border) !important;
  border-radius: 14px !important;
  min-height: 52px !important;
  padding: 8px 12px !important;
  box-shadow: var(--shadow-sm) !important;
  color: var(--color-text) !important;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  display: flex !important;
  flex-wrap: wrap !important;
  gap: 6px !important;
}

/* Focus State */
.ts-wrapper.focus .ts-control {
  border-color: var(--color-primary) !important;
  box-shadow: 0 0 0 4px rgba(var(--color-primary-rgb), 0.1) !important;
  background: var(--color-surface) !important;
}

/* Input Styles */
.ts-control input {
  font-size: 0.95rem !important;
  color: var(--color-text) !important;
  padding: 4px 0 !important;
}

.ts-control input::placeholder {
  color: var(--color-muted) !important;
  opacity: 0.7 !important;
}

/* Selected Items (Tags/Pills) */
.ts-control .item {
  background: var(--color-accent) !important;
  color: var(--color-text) !important;
  border: 1px solid var(--color-border) !important;
  border-radius: 10px !important;
  padding: 4px 10px !important;
  font-size: 0.875rem !important;
  font-weight: 600 !important;
  display: inline-flex !important;
  align-items: center !important;
  gap: 6px !important;
  transition: all 0.2s ease !important;
  margin: 0 !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02) !important;
}

.ts-control .item:hover {
  background: var(--color-border) !important;
  transform: translateY(-1px) !important;
}

/* Remove button on tags */
.ts-control .item .remove {
  border: none !important;
  margin-left: 4px !important;
  border-radius: 4px !important;
  padding: 0 4px !important;
  font-size: 1.1rem !important;
  line-height: 1 !important;
  color: var(--color-muted) !important;
  opacity: 0.6 !important;
  transition: all 0.2s ease !important;
}

.ts-control .item .remove:hover {
  background: rgba(239, 68, 68, 0.1) !important;
  color: #ef4444 !important;
  opacity: 1 !important;
}

/* Dropdown Container */
.ts-dropdown {
  margin-top: 8px !important;
  border-radius: 16px !important;
  border: 1px solid var(--color-border) !important;
  background: var(--color-surface) !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
  overflow: hidden !important;
  z-index: 1000 !important;
  animation: slideDown 0.2s ease-out !important;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Dropdown Content */
.ts-dropdown-content {
  padding: 6px !important;
  max-height: 250px !important;
}

/* Options */
.ts-dropdown .option {
  padding: 10px 14px !important;
  border-radius: 10px !important;
  font-size: 0.925rem !important;
  font-weight: 500 !important;
  color: var(--color-text-secondary) !important;
  cursor: pointer !important;
  transition: all 0.2s ease !important;
  margin-bottom: 2px !important;
}

.ts-dropdown .option:last-child {
  margin-bottom: 0 !important;
}

/* Option States */
.ts-dropdown .option.active {
  background: var(--color-accent) !important;
  color: var(--color-primary) !important;
}

.ts-dropdown .option.selected {
  background: rgba(var(--color-primary-rgb), 0.05) !important;
  color: var(--color-primary) !important;
  font-weight: 700 !important;
}

/* Scrollbar Styling */
.ts-dropdown-content::-webkit-scrollbar {
  width: 5px !important;
}

.ts-dropdown-content::-webkit-scrollbar-track {
  background: transparent !important;
}

.ts-dropdown-content::-webkit-scrollbar-thumb {
  background: var(--color-border) !important;
  border-radius: 10px !important;
}

/* Select Arrow */
.ts-wrapper .ts-control::after {
  content: '\F282' !important;
  font-family: 'bootstrap-icons' !important;
  border: none !important;
  width: auto !important;
  height: auto !important;
  top: 50% !important;
  right: 15px !important;
  transform: translateY(-50%) !important;
  color: var(--color-muted) !important;
  font-size: 0.9rem !important;
  transition: transform 0.3s ease !important;
}

.ts-wrapper.dropdown-active .ts-control::after {
  transform: translateY(-50%) rotate(180deg) !important;
}
</style>
