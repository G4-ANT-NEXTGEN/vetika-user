<template>
  <div class="base-select-container" :class="{ 'mb-3': !error }">
    <!-- Label -->
    <label v-if="label" class="select-label">
      {{ label }}
      <span v-if="required" class="required-mark">*</span>
    </label>

    <!-- Select Wrapper for Custom Arrow -->
    <div class="select-wrapper" :class="{ 'has-error': error, 'is-disabled': disabled }">
      <select class="custom-select" :value="modelValue" :disabled="disabled" @change="onChange">
        <option v-if="placeholder" disabled value="">
          {{ placeholder }}
        </option>

        <option v-for="option in options" :key="option.value" :value="option.value">
          {{ option.label }}
        </option>
      </select>

      <!-- Custom Arrow Icon -->
      <div class="select-arrow">
        <i class="bi bi-chevron-down"></i>
      </div>
    </div>

    <!-- Error Message -->
    <Transition name="fade-slide">
      <p v-if="error" class="error-message">
        <i class="bi bi-exclamation-circle me-1"></i>
        {{ error }}
      </p>
    </Transition>
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
.base-select-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  transition: all 0.3s ease;
}

/* Label Styling */
.select-label {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

.required-mark {
  color: var(--color-danger);
  margin-left: 4px;
  font-size: 16px;
}

/* Select Wrapper */
.select-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}

/* Custom Select Styling */
.custom-select {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 100%;
  padding: 16px 45px 16px 18px;
  /* Extra right padding for the arrow */
  font-size: 15px;
  font-weight: 500;
  color: var(--input-text);
  background: var(--input-bg);
  border: 1px solid var(--input-border);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
}

/* Hover State */
.custom-select:hover:not(:disabled) {
  border-color: var(--color-muted);
  background-color: var(--color-surface);
}

/* Focus State */
.custom-select:focus {
  border-color: var(--input-focus-border);
  box-shadow: 0 0 0 4px var(--input-focus-shadow);
  transform: translateY(-1px);
}

/* Disabled State */
.is-disabled .custom-select {
  background-color: var(--color-hover);
  border-color: var(--color-border);
  color: var(--color-muted);
  cursor: not-allowed;
  opacity: 0.7;
}

/* Error State */
.has-error .custom-select {
  border-color: var(--color-danger);
  background-color: rgba(220, 53, 69, 0.02);
}

.has-error .custom-select:focus {
  box-shadow: 0 0 0 4px rgba(220, 53, 69, 0.1);
}

/* Custom Arrow Icon */
.select-arrow {
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  color: var(--color-muted);
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-select:focus+.select-arrow {
  color: var(--input-focus-border);
  transform: translateY(-50%) rotate(180deg);
}

/* Error Message Styling */
.error-message {
  font-size: 13px;
  font-weight: 500;
  color: var(--color-danger);
  margin-top: 8px;
  display: flex;
  align-items: center;
}

/* Transitions */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Dark Theme Adjustments if needed specifically */
[data-theme='dark'] .custom-select:hover:not(:disabled) {
  background-color: var(--color-hover);
}
</style>
