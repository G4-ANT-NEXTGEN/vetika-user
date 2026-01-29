<script setup>
import { useTheme } from '@/composables/useTheme'
import { Moon, Sun } from 'lucide-vue-next'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <button class="theme-toggler" type="button" @click="toggleTheme" title="Toggle theme">
    <div class="icon-container">
      <Sun class="icon sun-icon" :class="theme === 'light' ? 'icon-active' : 'icon-hidden-sun'" />
      <Moon class="icon moon-icon" :class="theme === 'dark' ? 'icon-active' : 'icon-hidden-moon'" />
    </div>
    <span class="sr-only">Toggle theme</span>
  </button>
</template>

<style scoped>
.theme-toggler {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1px solid var(--color-border);
  background: var(--nav-surface);
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
  overflow: hidden;
}

.theme-toggler:hover {
  background: var(--bg-hover);
  border-color: var(--color-text);
}

.icon-container {
  position: relative;
  width: 20px;
  height: 20px;
  display: grid;
  place-items: center;
}

.icon {
  grid-area: 1 / 1;
  width: 100%;
  height: 100%;
  transition: transform 0.5s cubic-bezier(0.23, 1, 0.32, 1), opacity 0.5s ease;
  transform-origin: center center;
  position: absolute;
}

/* Active State (Visible) */
.icon-active {
  transform: rotate(0deg) scale(1);
  opacity: 1;
}

/* Hidden States */
.icon-hidden-sun {
  transform: rotate(-90deg) scale(0);
  opacity: 0;
}

.icon-hidden-moon {
  transform: rotate(90deg) scale(0);
  opacity: 0;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>
