<template>
  <div class="chat-app-container">
    <div class="chat-layout-card">
      <div class="chat-sidebar">
        <ChatListView />
      </div>
      <div class="chat-main">
        <div v-if="!chatStore.isSelectChat" class="empty-selection">
          <div class="empty-content">
            <div class="illustration-wrapper mb-4">
              <i class="bi bi-chat-heart"></i>
            </div>
            <h3>Your Messages</h3>
            <p>Select a conversation from the list to start chatting.</p>
          </div>
        </div>
        <router-view v-else />
      </div>
    </div>
  </div>
</template>
<script setup>
import ChatListView from '@/views/chat/ChatListView.vue'
import { useChatStore } from '@/stores/chat'

const chatStore = useChatStore()
console.log('chatStore in layout : ', chatStore.isSelectChat)
</script>
<style scoped>
.chat-app-container {
  height: calc(100vh - 100px);
  padding: 20px;
  background-color: transparent;
}

.chat-layout-card {
  height: 100%;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  display: flex;
  overflow: hidden;
}

.chat-sidebar {
  width: 350px;
  height: 100%;
  border-right: 1px solid var(--color-border);
  background: var(--sidebar-bg);
  flex-shrink: 0;
}

.chat-main {
  flex-grow: 1;
  height: 100%;
  background: var(--color-background);
  position: relative;
}

.empty-selection {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
}

.illustration-wrapper {
  font-size: 5rem;
  color: var(--color-muted);
  opacity: 0.3;
}

.empty-content h3 {
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--color-text);
}

.empty-content p {
  color: var(--color-muted);
  max-width: 300px;
  margin: 0 auto;
}

@media (max-width: 991px) {
  .chat-app-container {
    padding: 0;
    height: calc(100vh - 70px);
  }

  .chat-layout-card {
    border-radius: 0;
    border: none;
  }

  .chat-sidebar {
    width: 100%;
    display: v-bind('chatStore.isSelectChat ? "none" : "block"');
  }

  .chat-main {
    display: v-bind('chatStore.isSelectChat ? "block" : "none"');
  }
}
</style>
