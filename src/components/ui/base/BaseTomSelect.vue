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
    onChange(value) {
      emit('update:modelValue', props.multiple ? value : value[0])
    },
  })
})

watch(
  () => props.modelValue,
  (val) => {
    tom?.setValue(val ? [].concat(val) : [], true)
  }
)

onBeforeUnmount(() => tom?.destroy())
</script>

<style>
/* wrapper */
.ts-wrapper {
  width: 100%;
}

/* input area */
.ts-control {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  min-height: 48px;
  padding: 6px 10px;
  box-shadow: none;
  color: var(--color-text);
}

/* focus */
.ts-control.focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.06);
}

[data-theme='dark'] .ts-control.focus {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.04);
}

/* placeholder */
.ts-control input::placeholder {
  color: var(--color-text-tertiary);
  font-size: 0.9rem;
}

/* selected tag */
.ts-control .item {
  background: var(--color-hover);
  color: var(--color-text);
  border-radius: 10px;
  padding: 10px;
  font-size: 0.85rem;
  border: 1px solid var(--color-border);
}

/* remove button */
.ts-control .remove {
  color: var(--color-muted);
  font-size: 14px;
}

/* dropdown */
.ts-dropdown {
  margin-top: 6px;
  border-radius: 12px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: var(--shadow-md);
  color: var(--color-text);
}

/* dropdown items */
.ts-dropdown .option {
  padding: 12px 14px;
  font-size: 0.9rem;
  color: var(--color-text);
}

/* hover */
.ts-dropdown .option.active {
  background: var(--color-hover);
}

/* selected */
.ts-dropdown .option.selected {
  background: var(--bg-tag);
  font-weight: 500;
}

/* scrollbar */
.ts-dropdown-content::-webkit-scrollbar {
  width: 6px;
}

.ts-dropdown-content::-webkit-scrollbar-thumb {
  background: var(--color-border);
  border-radius: 10px;
}

.ts-wrapper.multi .ts-control > div {
  padding: 6px !important;
}
</style>
