<template>
  <ProfileHeaderSkeleton v-if="!userData" />
  <div class="profile-header-wrapper" v-else>

    <!-- ── Cover ── -->
    <div class="cover-section">
      <div class="cover-image-container">
        <img :src="userData?.cover" alt="Profile Cover" class="cover-img" />
        <div class="cover-overlay"></div>
      </div>

      <!-- Avatar sits on top of cover -->
      <div class="avatar-container">
        <img class="avatar-image" :src="userData?.avatar || ''" alt="Profile" />
      </div>
    </div>

    <!-- ── Name + Role ── -->
    <div class="profile-info-section">
      <div class="profile-info">
        <h1 class="user-name">{{ userData?.full_name || 'User Name' }}</h1>
        <p class="user-role">
          {{ userData?.professional?.job_title || 'Position' }} •
          {{ userData?.professional?.company_name || 'Company' }}
        </p>
      </div>
      <!-- no action buttons -->
    </div>

    <!-- ── Tabs ── -->
    <div class="profile-nav-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="['nav-tab', { active: activeTab === tab.key }]"
        @click="$emit('change-tab', tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

  </div>
</template>

<script setup>
import ProfileHeaderSkeleton from './ProfileHeaderSkeleton.vue';
defineProps({
  activeTab: {
    type: String,
    default: 'overview',
  },
  userData: {
    type: Object,
    required: true,
  },
})

defineEmits(['change-tab'])

const tabs = [
  { key: 'overview',      label: 'Overview' },
  { key: 'professional', label: 'Professional' },
  { key: 'education',    label: 'Education' },
  { key: 'project',      label: 'Project' },
  { key: 'cv',           label: 'CV' },
]
</script>

<style scoped>
/* ====================================
   MAIN WRAPPER
   ==================================== */
.profile-header-wrapper {
  background: var(--color-surface);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow-sm);
  margin-bottom: 24px;
}

/* ====================================
   COVER SECTION
   ==================================== */
.cover-section {
  position: relative;
  height: 240px;
  background: var(--color-accent);
}

.cover-image-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.cover-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cover-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 100%);
  pointer-events: none;
}

/* ====================================
   AVATAR
   ==================================== */
.avatar-container {
  position: absolute;
  bottom: -50px;
  left: 32px;
}

.avatar-image {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid var(--color-surface);
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: var(--color-accent);
  display: block;
}

/* ====================================
   PROFILE INFO
   ==================================== */
.profile-info-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 64px 32px 24px;
  gap: 20px;
}

.profile-info {
  flex: 1;
}

.user-name {
  font-size: 24px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 4px 0;
  letter-spacing: -0.5px;
}

.user-role {
  font-size: 15px;
  color: var(--color-muted);
  margin: 0;
  font-weight: 500;
}

/* ====================================
   NAVIGATION TABS
   ==================================== */
.profile-nav-tabs {
  display: flex;
  gap: 0;
  padding: 0 32px;
  border-top: 1px solid var(--color-border);
  overflow-x: auto;
  scrollbar-width: none;
}

.profile-nav-tabs::-webkit-scrollbar {
  display: none;
}

.nav-tab {
  padding: 16px 24px;
  border: none;
  background: transparent;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-muted);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.nav-tab:hover {
  color: var(--color-text);
}

.nav-tab.active {
  color: var(--color-text);
}

.nav-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-text);
}

/* ====================================
   RESPONSIVE
   ==================================== */
@media (max-width: 768px) {
  .cover-section {
    height: 200px;
  }

  .avatar-container {
    left: 20px;
    bottom: -40px;
  }

  .avatar-image {
    width: 100px;
    height: 100px;
  }

  .profile-info-section {
    padding: 52px 20px 20px;
  }

  .user-name {
    font-size: 20px;
  }

  .user-role {
    font-size: 14px;
  }

  .profile-nav-tabs {
    padding: 0 20px;
  }

  .nav-tab {
    padding: 14px 16px;
    font-size: 14px;
  }
}
</style>