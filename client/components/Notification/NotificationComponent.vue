<script setup lang="ts">
import { formatDate } from "@/utils/formatDate";
import DeleteNotification from "./DeleteNotification.vue";
import MarkRead from "./MarkRead.vue";
import MarkUnread from "./MarkUnread.vue";

const props = defineProps(["notification"]);
</script>

<template>
  <div class="one">
    <p>{{ props.notification.content }}</p>
    <div class="base">
      <menu>
        <MarkRead :notification="notification" />
        <MarkUnread :notification="notification" />
        <DeleteNotification :notification="notification" />
      </menu>
      <article class="timestamp">
        <p>Created on: {{ formatDate(props.notification.dateCreated) }}</p>
      </article>
    </div>
  </div>
</template>

<style scoped>
p {
  margin: 0em;
}

.one {
  border: 2px solid rgb(108, 26, 108);
  box-shadow: 0 0 10px rgba(108, 26, 108, 0.5);
  padding: 10px;
  border-radius: 5px;
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

.one:hover {
  border-color: rgb(190, 48, 190);
  box-shadow: 0 0 15px rgba(190, 48, 190, 0.8);
}

menu {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  gap: 1em;
  padding: 0;
  margin: 0;
}

.timestamp {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9em;
  font-style: italic;
}

.base {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.base article:only-child {
  margin-left: auto;
}
</style>
