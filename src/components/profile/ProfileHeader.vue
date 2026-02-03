<template>
  <ProfileHeaderSkeleton v-if="profileStore.isLoading" />
  <div v-else class="profile-header-wrapper">
    <!-- Cover Section -->
    <div class="cover-section">
      <div class="cover-image-container">
        <img :src="coverUrl" alt="Profile Cover" class="cover-img" />
        <div class="cover-overlay"></div>
      </div>

      <button class="edit-cover-btn" @click="openEditCover">
        <i class="bi bi-camera"></i>
        <span>Edit Cover</span>
      </button>

      <!-- Avatar positioned over cover -->
      <div class="avatar-container">
        <div class="avatar-wrapper">
          <img class="avatar-image" :src="avatarUrl" alt="Profile Avatar" />
          <button class="avatar-edit-btn" @click="showImageCropper = true">
            <i class="bi bi-camera"></i>
          </button>
        </div>
      </div>
    </div>

    <!-- Update Cover Modal -->
    <BaseModal v-if="editCover" title="Update Cover Photo" size="lg" @close="closeEditCover">
      <div class="modal-content-wrapper">
        <div class="cropper-container">
          <Cropper
            v-if="uploadedImage"
            ref="cropperCoverRef"
            :src="uploadedImage"
            :stencil-props="{ aspectRatio: 16 / 5, resizable: true }"
          />
          <div v-else class="upload-placeholder">
            <i class="bi bi-image"></i>
            <p>Select an image to crop</p>
          </div>
        </div>

        <div class="modal-actions">
          <label for="coverUpload" class="upload-btn">
            <i class="bi bi-upload"></i>
            Choose Image
          </label>
          <input
            id="coverUpload"
            type="file"
            class="d-none"
            accept="image/*"
            @change="handleFileSelect"
          />

          <button class="delete-btn" @click="deleteCover = true">
            <i class="bi bi-trash"></i>
            Remove Cover
          </button>
        </div>
      </div>

      <template #footer>
        <base-button @click="closeEditCover" variant="secondary">Cancel</base-button>
        <base-button @click="applyChageCover" :isLoading="profileStore.isLoading" variant="primary">
          <span>{{ profileStore.isLoading ? 'Saving...' : 'Save Changes' }}</span>
        </base-button>
      </template>
    </BaseModal>

    <!-- Crop Avatar Modal -->
    <BaseModal
      v-if="showImageCropper"
      title="Update Profile Photo"
      @close="showImageCropper = false"
    >
      <div class="modal-content-wrapper">
        <div class="cropper-container circle">
          <Cropper
            v-if="uploadedImage"
            ref="cropperRef"
            :src="uploadedImage"
            :stencil-props="{ aspectRatio: 1 }"
            :stencil-component="CircleStencil"
          />
          <div v-else class="upload-placeholder">
            <i class="bi bi-person-circle"></i>
            <p>Select a photo to crop</p>
          </div>
        </div>

        <div class="modal-actions">
          <label for="avatarUpload" class="upload-btn">
            <i class="bi bi-upload"></i>
            Choose Photo
          </label>
          <input
            id="avatarUpload"
            type="file"
            class="d-none"
            accept="image/*"
            @change="handleFileSelect"
          />

          <button class="delete-btn" @click="deleteAvatar = true">
            <i class="bi bi-trash"></i>
            Remove Photo
          </button>
        </div>
      </div>

      <template #footer>
        <base-button @click="showImageCropper = false" variant="secondary">Cancel</base-button>
        <base-button @click="applyCrop" :isLoading="profileStore.isLoading" variant="primary">
          <span>{{ profileStore.isLoading ? 'Saving...' : 'Save Changes' }}</span>
        </base-button>
      </template>
    </BaseModal>

    <!-- Delete Avatar Confirmation -->
    <base-modal v-if="deleteAvatar" title="Remove Profile Photo">
      <div class="confirmation-content">
        <div class="warning-icon">
          <i class="bi bi-exclamation-triangle"></i>
        </div>
        <p>Are you sure you want to remove your profile photo?</p>
      </div>

      <template #footer>
        <base-button @click="deleteAvatar = false" variant="secondary">Cancel</base-button>
        <base-button
          @click="handleAvatarDelete"
          variant="danger"
          :isLoading="profileStore.isLoading"
        >
          <span>{{ profileStore.isLoading ? 'Removing...' : 'Remove' }}</span>
        </base-button>
      </template>
    </base-modal>

    <!-- Delete Cover Confirmation -->
    <base-modal v-if="deleteCover" title="Remove Cover Photo" @close="deleteCover = false">
      <div class="confirmation-content">
        <div class="warning-icon">
          <i class="bi bi-exclamation-triangle"></i>
        </div>
        <p>Are you sure you want to remove your cover photo?</p>
      </div>

      <template #footer>
        <base-button @click="deleteCover = false" variant="secondary">Cancel</base-button>
        <base-button
          @click="handleDeleteCover"
          variant="danger"
          :isLoading="profileStore.isLoading"
        >
          <span>{{ profileStore.isLoading ? 'Removing...' : 'Remove' }}</span>
        </base-button>
      </template>
    </base-modal>

    <!-- Profile Info & Actions -->
    <div class="profile-info-section">
      <div class="profile-info">
        <h1 class="user-name">{{ profileStore.user?.full_name || 'Loading...' }}</h1>
        <p class="user-role">
          {{ profileStore.user?.positions?.[0]?.name || 'Web Development' }}
        </p>
      </div>

      <div class="profile-actions">
        <button class="profile-btn" @click="openEditCV">
          <i class="bi bi-file-earmark-arrow-up"></i>
          <span>Upload CV</span>
        </button>

        <button class="profile-btn" @click="openEditCollaboration">
          <i class="bi bi-people"></i>
          <span>Collaboration</span>
        </button>

        <button class="profile-btn icon-only" @click="openChangePassAndDeleteAcc">
          <i class="bi bi-gear"></i>
        </button>
      </div>
    </div>

    <!-- Upload CV Modal -->
    <BaseModal v-if="editCV" title="Upload Your CV" @close="closeEditCV">
      <div class="upload-section">
        <div class="file-upload-area" :class="{ 'has-file': cvFile }">
          <input
            class="file-input"
            type="file"
            id="cvFile"
            @change="cvOnChangeFile"
            accept="application/pdf"
          />
          <label for="cvFile" class="file-upload-label">
            <div class="upload-icon">
              <i class="bi bi-cloud-arrow-up"></i>
            </div>
            <div class="upload-text">
              <span class="primary-text">Drop your CV here or click to browse</span>
              <span class="secondary-text">PDF files only • Max 10MB</span>
            </div>
          </label>
        </div>

        <div v-if="cvFile" class="file-preview">
          <div class="file-icon">
            <i class="bi bi-file-earmark-pdf"></i>
          </div>
          <div class="file-info">
            <span class="file-name">{{ cvFile.name }}</span>
            <span class="file-size">{{ formatFileSize(cvFile.size) }}</span>
          </div>
          <button @click="cvFile = null" class="remove-file">
            <i class="bi bi-x-lg"></i>
          </button>
        </div>
      </div>

      <template #footer>
        <base-button @click="closeEditCV" variant="secondary">Cancel</base-button>
        <base-button
          @click="handleSaveCv"
          :isLoading="profileStore.isLoading"
          variant="primary"
          :disabled="!cvFile"
        >
          <span>{{ profileStore.isLoading ? 'Uploading...' : 'Upload CV' }}</span>
        </base-button>
      </template>
    </BaseModal>

    <!-- Collaboration Modal -->
    <BaseModal v-if="editCollaboration" title="Add Collaboration" @close="closeEditCollaboration">
      <div class="collaboration-form">
        <div class="form-group">
          <label class="form-label">Company Logo</label>
          <div class="file-upload-area small">
            <input class="file-input" type="file" id="collabFile" accept="image/*" />
            <label for="collabFile" class="file-upload-label">
              <i class="bi bi-image"></i>
              <span>Upload Logo</span>
            </label>
          </div>
        </div>

        <BaseInput label="Company Name" placeholder="Enter company name" />
        <BaseInput label="Company Website" placeholder="https://example.com" />
        <BaseInput label="Collaboration Type" placeholder="e.g., Partnership, Client" />
      </div>

      <template #footer>
        <base-button @click="closeEditCollaboration" variant="secondary">Cancel</base-button>
        <base-button @click="HandleEditCollaboration" variant="primary">
          Add Collaboration
        </base-button>
      </template>
    </BaseModal>

    <!-- Settings Modal -->
    <BaseModal v-if="openSetting" title="Account Settings" @close="closeSetting" size="lg">
      <div class="settings-container">
        <!-- Settings Tabs -->
        <div class="settings-tabs">
          <button
            :class="['settings-tab', { active: settingTab === 'password' }]"
            @click="settingTab = 'password'"
          >
            <i class="bi bi-shield-lock"></i>
            <span>Security</span>
          </button>
          <button
            :class="['settings-tab danger', { active: settingTab === 'delete' }]"
            @click="settingTab = 'delete'"
          >
            <i class="bi bi-exclamation-triangle"></i>
            <span>Danger Zone</span>
          </button>
        </div>

        <!-- Tab Content -->
        <div class="settings-content">
          <!-- Change Password Tab -->
          <div v-if="settingTab === 'password'" class="password-section">
            <div class="section-header">
              <h3>Change Password</h3>
              <p>Update your password to keep your account secure</p>
            </div>

            <div class="form-group">
              <BaseInput
                label="Current Password"
                type="password"
                placeholder="Enter current password"
              />
            </div>

            <div class="form-group">
              <BaseInput label="New Password" type="password" placeholder="Enter new password" />
            </div>

            <div class="form-group">
              <BaseInput
                label="Confirm New Password"
                type="password"
                placeholder="Confirm new password"
              />
            </div>

            <div class="password-requirements">
              <span class="requirements-title">Password must contain:</span>
              <ul>
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One number</li>
              </ul>
            </div>

            <div class="form-actions">
              <base-button variant="primary">Update Password</base-button>
            </div>
          </div>

          <!-- Delete Account Tab -->
          <div v-else class="delete-section">
            <div class="danger-zone">
              <div class="danger-icon">
                <i class="bi bi-exclamation-triangle-fill"></i>
              </div>
              <div class="danger-content">
                <h3>Delete Account</h3>
                <p>
                  Once you delete your account, there is no going back. All your data including
                  profile, projects, and settings will be permanently removed.
                </p>
              </div>
            </div>

            <div class="form-group">
              <BaseInput label="Type 'DELETE' to confirm" placeholder="DELETE" />
            </div>

            <div class="form-actions">
              <base-button variant="danger">
                <i class="bi bi-trash"></i>
                <span>Permanently Delete Account</span>
              </base-button>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>

    <!-- Navigation Tabs -->
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
import { onMounted, computed, ref } from 'vue'
import { useProfileStore } from '@/stores/profile'
import { Cropper } from 'vue-advanced-cropper'
import ProfileHeaderSkeleton from '@/components/profile/ProfileHeaderSkeleton.vue'
import 'vue-advanced-cropper/dist/style.css'

defineProps({
  activeTab: {
    type: String,
    default: 'overview',
  },
})

defineEmits(['change-tab'])

const profileStore = useProfileStore()


const tabs = [
  { key: 'overview', label: 'Overview' },
  { key: 'professional', label: 'Professional' },
  { key: 'education', label: 'Education' },
  { key: 'project', label: 'Project' },
  { key: 'cv', label: 'CV' },
]

const cropperRef = ref()
const cropperCoverRef = ref(null)
const showImageCropper = ref(false)
const deleteAvatar = ref(false)
const deleteCover = ref(false)
const uploadedImage = ref(null)
const editCover = ref(false)
const editCV = ref(false)
const editCollaboration = ref(false)
const openSetting = ref(false)
const settingTab = ref('password')
const cvFile = ref(null)

onMounted(async () => {
  await profileStore.fetchProfile()
})

const handleFileSelect = (e) => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (ev) => (uploadedImage.value = ev.target.result)
  reader.readAsDataURL(file)
}

const applyCrop = async () => {
  const canvas = cropperRef.value.getResult().canvas
  const avatar = canvas.toDataURL('image/jpeg', 0.9)
  await profileStore.uploadAvatarBase64(avatar)
  showImageCropper.value = false
  uploadedImage.value = null
}

const applyChageCover = async () => {
  const canvas = cropperCoverRef.value.getResult().canvas
  const cover = canvas.toDataURL('image/jpeg', 0.9)
  await profileStore.uploadCoverBase64(cover)
  editCover.value = false
  uploadedImage.value = null
}

const handleDeleteCover = async () => {
  editCover.value = false
  await profileStore.removeCover()
  if (!profileStore.isLoading) deleteCover.value = false
}

const handleAvatarDelete = async () => {
  showImageCropper.value = false
  await profileStore.removeAvatar()
  if (!profileStore.isLoading) {
    deleteAvatar.value = false
  }
}

const cvOnChangeFile = (e) => {
  const cv = e.target.files[0]
  if (!cv) return
  if (cv.type !== 'application/pdf') {
    alert('Only PDF files are allowed')
    return
  }
  if (cv.size > 10 * 1024 * 1024) {
    alert('File size must be less than 10MB')
    return
  }
  cvFile.value = cv
}

const handleSaveCv = async () => {
  if (!cvFile.value) return
  await profileStore.uploadCv(cvFile.value)
  console.log('this is cv file : ',cvFile.value)
  editCV.value = false
  cvFile.value = null
}

const formatFileSize = (bytes) => {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function openEditCover() {
  editCover.value = true
}

function closeEditCover() {
  editCover.value = false
  uploadedImage.value = null
}

function openEditCV() {
  editCV.value = true
}

function closeEditCV() {
  editCV.value = false
  cvFile.value = null
}

function openEditCollaboration() {
  editCollaboration.value = true
}

function closeEditCollaboration() {
  editCollaboration.value = false
}

function HandleEditCollaboration() {
  alert('Collaboration added successfully')
  editCollaboration.value = false
}

function openChangePassAndDeleteAcc() {
  openSetting.value = true
}

function closeSetting() {
  openSetting.value = false
  settingTab.value = 'password'
}
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

.edit-cover-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  font-size: 13px;
  font-weight: 500;
  color: var(--color-text);
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.edit-cover-btn:hover {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.edit-cover-btn i {
  font-size: 14px;
}

[data-theme='dark'] .edit-cover-btn {
  background: rgba(40, 40, 40, 0.95);
  color: #f8f8fc;
  border-color: rgba(255, 255, 255, 0.1);
}

[data-theme='dark'] .edit-cover-btn:hover {
  background: rgba(50, 50, 50, 1);
}

/* ====================================
   AVATAR
   ==================================== */
.avatar-container {
  position: absolute;
  bottom: -50px;
  left: 32px;
}

.avatar-wrapper {
  position: relative;
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

.avatar-edit-btn {
  position: absolute;
  bottom: 4px;
  right: 4px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: none;
  background: var(--color-surface);
  color: var(--color-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
  font-size: 12px;
}

.avatar-edit-btn:hover {
  transform: scale(1.1);
  background: var(--color-hover);
}

/* ====================================
   PROFILE INFO & ACTIONS
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

.profile-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.profile-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 6px;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  color: var(--color-text);
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.profile-btn:hover {
  background: var(--color-hover);
  border-color: var(--color-primary);
}

.profile-btn i {
  font-size: 14px;
}

.profile-btn.icon-only {
  padding: 8px;
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
   MODAL STYLES
   ==================================== */
.modal-content-wrapper {
  padding: 8px 0;
}

.cropper-container {
  width: 100%;
  height: 400px;
  background: var(--color-accent);
  border-radius: 12px;
  overflow: hidden;
  border: 2px solid var(--color-border);
}

.cropper-container.circle {
  height: 400px;
}

.upload-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: var(--color-muted);
}

.upload-placeholder i {
  font-size: 64px;
  opacity: 0.3;
}

.upload-placeholder p {
  font-size: 15px;
  margin: 0;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.upload-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.upload-btn:hover {
  background: var(--color-hover);
  border-color: var(--color-primary);
}

.delete-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 20px;
  background: var(--color-surface);
  color: var(--color-danger);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.delete-btn:hover {
  background: rgba(239, 68, 68, 0.1);
  border-color: var(--color-danger);
}

/* ====================================
   CONFIRMATION MODAL
   ==================================== */
.confirmation-content {
  padding: 20px 0;
  text-align: center;
}

.warning-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 50%;
  margin-bottom: 16px;
}

.warning-icon i {
  font-size: 32px;
  color: var(--color-danger);
}

.confirmation-content p {
  font-size: 15px;
  color: var(--color-text-secondary);
  line-height: 1.6;
  margin: 0;
}

/* ====================================
   FILE UPLOAD SECTION
   ==================================== */
.upload-section {
  padding: 8px 0;
}

.file-upload-area {
  position: relative;
  border: 2px dashed var(--color-border);
  border-radius: 12px;
  padding: 48px 24px;
  text-align: center;
  transition: all 0.2s ease;
  cursor: pointer;
}

.file-upload-area:hover {
  border-color: var(--color-primary);
  background: var(--color-hover);
}

.file-upload-area.small {
  padding: 24px;
}

.file-upload-area.has-file {
  border-color: var(--color-primary);
  background: var(--color-hover);
}

.file-input {
  display: none;
}

.file-upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  cursor: pointer;
}

.upload-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: var(--color-accent);
  border-radius: 50%;
  color: var(--color-primary);
  font-size: 24px;
}

.upload-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.primary-text {
  font-size: 15px;
  font-weight: 600;
  color: var(--color-text);
}

.secondary-text {
  font-size: 13px;
  color: var(--color-muted);
}

.file-preview {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background: var(--color-accent);
  border: 1px solid var(--color-border);
  border-radius: 10px;
  margin-top: 16px;
}

.file-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 8px;
  color: var(--color-danger);
  font-size: 20px;
  flex-shrink: 0;
}

.file-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.file-name {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.file-size {
  font-size: 12px;
  color: var(--color-muted);
}

.remove-file {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: var(--color-muted);
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.remove-file:hover {
  background: var(--color-hover);
  color: var(--color-danger);
}

/* ====================================
   COLLABORATION FORM
   ==================================== */
.collaboration-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 8px 0;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 14px;
  font-weight: 600;
  color: var(--color-text);
}

/* ====================================
   SETTINGS MODAL
   ==================================== */
.settings-container {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.settings-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--color-border);
}

.settings-tab {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 20px;
  background: transparent;
  border: none;
  font-size: 15px;
  font-weight: 600;
  color: var(--color-muted);
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

.settings-tab:hover {
  color: var(--color-text);
  background: var(--color-hover);
}

.settings-tab.active {
  color: var(--color-text);
}

.settings-tab.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-text);
}

.settings-tab.danger.active {
  color: var(--color-danger);
}

.settings-tab.danger.active::after {
  background: var(--color-danger);
}

.settings-content {
  padding: 24px 0;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h3 {
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 8px 0;
}

.section-header p {
  font-size: 14px;
  color: var(--color-muted);
  margin: 0;
  line-height: 1.5;
}

.password-section,
.delete-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.password-requirements {
  padding: 16px;
  background: var(--color-accent);
  border-radius: 8px;
  border: 1px solid var(--color-border);
}

.requirements-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  display: block;
  margin-bottom: 8px;
}

.password-requirements ul {
  margin: 0;
  padding-left: 20px;
}

.password-requirements li {
  font-size: 13px;
  color: var(--color-muted);
  line-height: 1.8;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  padding-top: 8px;
}

/* ====================================
   DANGER ZONE
   ==================================== */
.danger-zone {
  display: flex;
  gap: 16px;
  padding: 20px;
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.2);
  border-radius: 12px;
}

.danger-icon {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background: rgba(239, 68, 68, 0.1);
  border-radius: 10px;
}

.danger-icon i {
  font-size: 24px;
  color: var(--color-danger);
}
.upload-container {
  max-width: 600px;
  margin: 0 auto;
}

.upload-header {
  background-color: #f0f0f0;
  border-bottom: 1px solid #e0e0e0;
}

.upload-box {
  border: 2px dashed #d0d0d0;
  border-radius: 8px;
  background-color: #fafafa;
  transition: all 0.3s ease;
  min-height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px 40px;
}

.upload-box:hover {
  border-color: #999;
  background-color: #f5f5f5;
}

.upload-icon {
  font-size: 48px;
  color: #999;
  margin-bottom: 20px;
}

.browse-link {
  color: #0d6efd;
  text-decoration: underline;
  cursor: pointer;
}

.browse-link:hover {
  color: #0a58ca;
}

.upload-text {
  font-size: 14px;
  color: #333;
  margin-bottom: 8px;
}

.upload-limit {
  font-size: 12px;
  color: #999;
}

.danger-content h3 {
  font-size: 16px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 8px 0;
}

.danger-content p {
  font-size: 14px;
  color: var(--color-text-secondary);
  margin: 0;
  line-height: 1.6;
}

/* ====================================
   UTILITY CLASSES
   ==================================== */
.d-none {
  display: none !important;
}

/* ====================================
   RESPONSIVE DESIGN
   ==================================== */
@media (max-width: 968px) {
  .profile-info-section {
    flex-direction: column;
    align-items: flex-start;
    padding: 64px 24px 20px;
  }

  .profile-actions {
    width: 100%;
  }

  .profile-btn {
    flex: 1;
  }

  .profile-nav-tabs {
    padding: 0 24px;
  }
}

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

  .avatar-edit-btn {
    width: 24px;
    height: 24px;
    font-size: 11px;
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

  .profile-actions {
    flex-direction: column;
  }

  .profile-btn {
    width: 100%;
    justify-content: center;
  }

  .profile-nav-tabs {
    padding: 0 20px;
  }

  .nav-tab {
    padding: 14px 16px;
    font-size: 14px;
  }

  .edit-cover-btn {
    top: 12px;
    right: 12px;
    padding: 6px 10px;
    font-size: 12px;
  }

  .edit-cover-btn span {
    display: none;
  }

  .cropper-container,
  .cropper-container.circle {
    height: 300px;
  }

  .modal-actions {
    flex-direction: column;
  }

  .settings-tabs {
    flex-direction: column;
    gap: 4px;
    border-bottom: none;
  }

  .settings-tab {
    justify-content: flex-start;
  }

  .settings-tab.active::after {
    display: none;
  }

  .danger-zone {
    flex-direction: column;
  }

  .form-actions {
    justify-content: stretch;
  }

  .form-actions button {
    width: 100%;
  }

}
</style>