<template>
  <div>
    <!-- Post Skeleton (copied from FeedView) -->
    <template v-if="postStore.loading && postStore.posts.length === 0">
      <ArticleCardSkeleton v-for="n in 3" :key="n" />
    </template>

    <!-- No Data State (copied from FeedView) -->
    <NoData v-if="!postStore.loading && posts.length === 0" />

    <!-- ArticleCard list (only user's own posts) -->
    <ArticleCard
      v-for="post in visiblePosts"
      :key="post.id"
      :post="post"
      :currentUserId="authStore.user?.id"
      :isLiked="likedSet.has(post.id)"
      :likeCount="post.likes_count ?? 0"
      @get-id="activePostId = $event"
      @like="toggleLike"
      @edit="openEditModal"
      @delete="openDeleteModal"
      @hide="hidePost"
    />

    <!-- Edit/Create Modal -->
    <BaseModal
      v-if="showModal"
      :title="PostId ? 'Edit Post' : 'Create Post'"
      size="lg"
      @close="closeModal"
    >
      <div class="p-2">
        <div class="d-flex align-items-center gap-3 mb-4">
          <div class="avatar-post overflow-hidden rounded-circle">
            <img class="img-fluid w-100 h-100" :src="authStore.user.avatar" alt="" />
          </div>
          <div>
            <h5 class="creator-name">
              {{ authStore.user.full_name }}
              <i class="bi bi-check-circle-fill text-primary-custom"></i>
            </h5>
            <small class="creator-position">{{ authStore.user.positions?.[0]?.name }}</small>
          </div>
        </div>
        <div class="my-3">
          <textarea
            v-model="titlePost"
            class="title-post form-control"
            :class="{ 'is-invalid': errorTitle }"
            rows="4"
            placeholder="What's on your mind?"
            @input="validateTitle"
          ></textarea>
          <div v-if="errorTitle" class="invalid-feedback d-block">{{ errorTitle }}</div>
          <small v-if="titlePost" class="text-muted d-block mt-2"
            >{{ titlePost.length }}/500 characters</small
          >
        </div>
        <div class="category-selection">
          <p class="text-category fw-semibold">Select Category</p>
        </div>
        <div>
          <div class="pill-container">
            <div
              v-for="category in categoryStore.categories"
              :key="category.id"
              :class="['category', { active: category.id == selected?.id }]"
              @click="selectPill(category)"
            >
              {{ category.name }}
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-100 category-selection d-flex justify-content-between align-items-center mb-3 px-2"
      >
        <p class="text-category fw-semibold">Add to your post</p>
        <div class="text-category d-flex gap-3">
          <input
            type="file"
            ref="fileInput"
            class="d-none"
            accept="image/jpeg,image/png,image/jpg"
            @change="handleFileChange"
          />
          <input
            type="file"
            ref="attachmentInput"
            class="d-none"
            accept=".jpeg,.png,.jpg,.pdf,.mp4,.mp3,.zip"
            @change="handleAttachmentChange"
          />
          <i class="bi bi-image icon-post" @click="openFilePicker" title="Add image"></i>
          <i
            class="bi bi-paperclip icon-post"
            @click="openAttachmentPicker"
            title="Add attachment"
          ></i>
        </div>
      </div>
      <div class="post-img position-relative" v-if="imgPost">
        <button @click="removeImage" class="btn-remove-img" type="button">
          <i class="bi bi-x-lg"></i>
        </button>
        <img class="img-fluid" :src="imgPost" alt="" />
      </div>

      <!-- FOOTER -->
      <template #footer>
        <div class="group-btn-modal d-flex justify-content-end gap-3 align-items-center">
          <BaseButton
            variant="primary"
            @click="publishPost"
            :disabled="isLoading"
            :isLoading="isLoading"
          >
            {{ PostId ? 'Update' : 'Publish' }}
          </BaseButton>
        </div>
      </template>
    </BaseModal>

    <!-- Delete Modal -->
    <BaseModal
      v-if="showModalDelete"
      title="Delete Post"
      size="md"
      @close="showModalDelete = false"
    >
      <div class="p-2">
        <p>Are you sure you want to delete this post?</p>
      </div>
      <template #footer>
        <div class="group-btn-modal d-flex justify-content-end gap-3 align-items-center">
          <BaseButton
            variant="primary"
            @click="deletePost"
            :disabled="isLoading"
            :isLoading="isLoading"
            >Delete</BaseButton
          >
        </div>
      </template>
    </BaseModal>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useProfileStore } from '@/stores/profile'
import { useAuthStore } from '@/stores/auth'
import { usePostStore } from '@/stores/post'
import { useCategoryStore } from '@/stores/category'
import { useRequiredValidator } from '@/composables/useRequiredValidator'
import ArticleCardSkeleton from '@/components/common/ArticleCardSkeleton.vue'
import ArticleCard from '@/components/common/ArticleCard.vue'
import NoData from '@/components/common/NoData.vue'

const profileStore = useProfileStore()
const authStore = useAuthStore()
const postStore = usePostStore()
const categoryStore = useCategoryStore()
const { errors: validationErrors, validateField } = useRequiredValidator()

// ─── Route / identity helpers ───────────────────────
const route = useRoute()
const routeUserId = computed(() => {
  const raw = route.params.id ?? null
  const n = raw ? Number(raw) : null
  return Number.isInteger(n) ? n : null
})

// ─── Is viewing own profile or someone else's ───────
const isOwnProfile = computed(() => {
  // If URL contains an id, compare it to the logged-in user id
  if (routeUserId.value !== null) {
    return authStore.user?.id === routeUserId.value
  }
  // Fallback to previous heuristic (viewUser === null)
  return profileStore.viewUser === null
})

// ─── Local UI state: hidden posts for temporary hide
const hiddenPosts = ref(new Set())

// ─── Pull posts based on URL param or authenticated user
// If URL has an `id` param show posts for that id; otherwise show own posts.
const posts = computed(() => {
  const targetId = routeUserId.value ?? authStore.user?.id ?? profileStore.viewUser?.id
  if (!targetId) return []
  return postStore.posts.filter((p) => p?.creator?.id === targetId)
})

// ─── Visible posts after applying hides
const visiblePosts = computed(() => {
  return posts.value.filter((p) => !hiddenPosts.value.has(p.id))
})

// fetch initial data used by this component
authStore.fetchProfile()
postStore.fetchPosts()
categoryStore.fetchCategorys()

// ─── Track which post the dropdown is open on ───────
const activePostId = ref(null)

// ─── Modal + edit state
const PostId = ref(null)
const showModal = ref(false)
const showModalDelete = ref(false)
const isLoading = ref(false)

const titlePost = ref('')
const selected = ref(null)
const file = ref(null)
const attachment = ref(null)
const imgPost = ref(null)
const errorTitle = ref(null)

const fileInput = ref(null)
const attachmentInput = ref(null)

// ─── Like toggle (local state until you wire up an API) ─
const likedSet = ref(new Set())

const toggleLike = (postId) => {
  if (likedSet.value.has(postId)) {
    likedSet.value.delete(postId)
  } else {
    likedSet.value.add(postId)
  }
  // TODO: call your like/unlike API here
}

// ----------------- Edit / Delete / Hide handlers -----------------
const openEditModal = async (postId) => {
  try {
    PostId.value = postId
    await postStore.fetchPostsById(PostId.value)
    const post = postStore.post
    if (!post) return

    titlePost.value = post.text || ''
    const isDefaultPath = post.image === 'http://novia2.csm.linkpc.net/storage/posts'
    file.value = isDefaultPath ? null : post.image || null
    imgPost.value = isDefaultPath ? null : post.image || null
    attachment.value = null

    if (post.category_ids && post.category_ids.length > 0) {
      const categoryId = post.category_ids[0]
      selected.value = categoryStore.categories.find((cat) => cat.id == categoryId) || null
    } else {
      selected.value = null
    }
    errorTitle.value = null
    showModal.value = true
  } catch (error) {
    console.error('Error loading post for edit:', error)
  }
}

const openDeleteModal = (postId) => {
  PostId.value = postId
  showModalDelete.value = true
}

const deletePost = async () => {
  if (!PostId.value) return
  isLoading.value = true
  try {
    await postStore.deletePost(PostId.value)
    showModalDelete.value = false
    PostId.value = null
  } catch (error) {
    console.error('Error deleting post:', error)
  } finally {
    isLoading.value = false
  }
}

const hidePost = (postId) => {
  hiddenPosts.value.add(postId)
}

const openFilePicker = () => {
  if (fileInput.value) fileInput.value.click()
}
const openAttachmentPicker = () => {
  if (attachmentInput.value) attachmentInput.value.click()
}

const handleFileChange = (event) => {
  file.value = event.target.files[0]
  if (file.value) imgPost.value = URL.createObjectURL(file.value)
}

const handleAttachmentChange = (event) => {
  attachment.value = event.target.files[0]
}

const removeImage = () => {
  imgPost.value = null
  file.value = null
  if (fileInput.value) fileInput.value.value = ''
}

function validateTitle() {
  const maxLength = 500
  if (titlePost.value.length > maxLength) {
    titlePost.value = titlePost.value.substring(0, maxLength)
  }

  if (titlePost.value.trim()) {
    errorTitle.value = null
    validationErrors.title = ''
  } else {
    errorTitle.value = 'Post content is required'
    validationErrors.title = 'Post content is required'
  }
}

function selectPill(category) {
  if (selected.value?.id == category.id) {
    selected.value = null
  } else {
    selected.value = category
  }
}

const prepareFormData = () => {
  const data = new FormData()
  if (titlePost.value.trim()) data.append('text', titlePost.value.trim())
  if (file.value && file.value instanceof File) data.append('image', file.value)
  if (attachment.value && attachment.value instanceof File)
    data.append('attachment', attachment.value)
  const categoryIds = selected.value ? [selected.value.id] : []
  data.append('category_ids', JSON.stringify(categoryIds))
  return data
}

const publishPost = async () => {
  isLoading.value = true
  try {
    if (!validateField('title', titlePost.value.trim(), 'Post content is required')) {
      errorTitle.value = validationErrors.title
      return
    }
    const data = prepareFormData()

    if (PostId.value) {
      await postStore.updatePost(PostId.value, data)
    } else {
      await postStore.createPost(data)
    }

    closeModal()
    await postStore.fetchPosts()
  } catch (error) {
    console.error('Error publishing post:', error)
  } finally {
    isLoading.value = false
  }
}

const closeModal = () => {
  showModal.value = false
  PostId.value = null
  titlePost.value = ''
  file.value = null
  imgPost.value = null
  attachment.value = null
  selected.value = null
  errorTitle.value = null
}
</script>

<style scoped>
/* ─── Empty State ──────────────────────────────── */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 64px 24px;
  background: var(--color-accent);
  border-radius: 16px;
  border: 2px dashed var(--color-border);
}

.empty-icon {
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--color-surface);
  border-radius: 50%;
  margin-bottom: 16px;
}

.empty-icon i {
  font-size: 28px;
  color: var(--color-muted);
}

.empty-title {
  font-size: 17px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 6px;
}

.empty-desc {
  font-size: 14px;
  color: var(--color-muted);
  margin: 0;
  text-align: center;
  max-width: 280px;
}
</style>