BaseModal.vue
<template>
  <teleport to="body">
    <div
      class="modal fade show d-block"
      tabindex="-1"
      style="background-color: rgba(0, 0, 0, 0.5)"
      @click.self="close"
    >
      <div class="modal-dialog modal-dialog-centered" :class="sizeClass">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ title }}</h5>
            <button type="button" class="btn-close" @click="close"></button>
          </div>
          <div class="modal-body">
            <slot />
          </div>
          <div class="modal-footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  title: String,
  size: { type: String, default: '' },
})

const emit = defineEmits(['close'])

const close = () => emit('close')

const sizeClass = computed(() => (props.size ? `modal-${props.size}` : ''))
</script>

<style>
/* Modal body */
.modal-body {
  max-height: calc(100vh - 250px);
  overflow-y: auto;
  overflow-x: hidden;
  color: var(--color-text);
  background: var(--color-accent);
}

/* Modal content */
.modal-content {
  background: var(--color-accent);
  color: var(--color-text);
  border-radius: 10px;
  border: 1px solid var(--border-color);
}

/* Header */
.modal-header {
  border-bottom: 1px solid var(--border-color);
  background: var(--color-accent);
}

.modal-title {
  color: var(--color-text);
}

/* Footer */
.modal-footer {
  border-top: 1px solid var(--border-color);
  background: var(--color-accent);
}

/* Close button (Bootstrap override-safe) */
.btn-close {
  filter: invert(0);
}

[data-theme='dark'] .btn-close {
  filter: invert(1);
}

/* Scrollbar styling */
.modal-body::-webkit-scrollbar {
  width: 8px;
}

.modal-body::-webkit-scrollbar-track {
  background: var(--color-secondary);
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb {
  background: var(--color-muted);
  border-radius: 4px;
}

.modal-body::-webkit-scrollbar-thumb:hover {
  background: var(--color-gray);
}
</style>
