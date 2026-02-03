<template>
  <div class="base-select">
    <!-- Label -->
    <label v-if="label" class="select-label">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>

    <!-- Select -->
    <select
      class="form-select select-input"
      :value="modelValue"
      :disabled="disabled"
      @change="onChange"
    >
      <option v-if="placeholder" disabled value="">
        {{ placeholder }}
      </option>

      <option v-for="option in options" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>

    <!-- Error -->
    <p v-if="error" class="error-text">
      {{ error }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  modelValue: [String, Number],
  label: String,
  placeholder: String,
  options: {
    type: Array,
    required: true,
  },
  error: String,
  disabled: Boolean,
  required: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const onChange = (e) => {
  emit('update:modelValue', e.target.value)
}
</script>

<style scoped>
.base-select {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

/* label */
.select-label {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
}

.required {
  color: var(--color-danger);
  margin-left: 2px;
}

/* select input */
.select-input {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  min-height: 44px;
  padding: 8px 12px;
  font-size: 14px;
  color: var(--color-text);
}

/* focus */
.select-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.06);
  outline: none;
}

[data-theme='dark'] .select-input:focus {
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.04);
}

/* disabled */
.select-input:disabled {
  background: var(--bg-dropdown-hover);
  cursor: not-allowed;
  opacity: 0.9;
}

/* error */
.error-text {
  font-size: 13px;
  color: var(--color-danger);
}
</style>
