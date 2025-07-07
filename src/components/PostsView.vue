<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

import { useStore } from "vuex";
import type { Posts } from "../store/modules/posts.ts";
import type { Users } from "../store/modules/users.ts";
import type { IndexState } from "../store/index.ts";

const currentPage = ref(1);
const textID = ref<number | null>(null);
const pageSize = ref(10);

const totalPages = computed<number>(() =>
  Math.ceil(posts.value.length / pageSize.value)
);

const store = useStore<IndexState>();

onMounted(() => {
  store.dispatch("posts/fetchPosts");
  store.dispatch("users/fetchUsers");
});

function onRemove(id: number) {
  store.dispatch("posts/removePost", id);
}

function onClickExpand(id: number) {
  textID.value = textID.value === id ? null : id;
  console.log(textID.value);
}

function expandedText(post: Posts) {
  if (textID.value === post.id) {
    return post.body.substring(0, post.body.length);
  } else {
    return post.body.substring(0, 50);
  }
}

const posts = computed<Posts[]>(() => store.getters["posts/allPosts"]);
const postsPag = computed<Posts[]>(() => {
  const first = (currentPage.value - 1) * pageSize.value;
  return posts.value.slice(first, first + pageSize.value);
});

const users = computed<Users[]>(() => store.getters["users/allUsers"]);
</script>

<template>
  <div class="card">
    <h1>Posty</h1>
    <div class="page-buttons-div">
      <button
        class="pages-btn"
        @click="currentPage = 1"
        :disabled="currentPage === 1"
      >
        Na początek
      </button>
      <button
        class="pages-btn"
        @click="currentPage--"
        :disabled="currentPage === 1"
      >
        Poprzednia strona
      </button>

      <span class="page-number-style"
        >{{ currentPage }} / {{ totalPages }}</span
      >
      <button
        class="pages-btn"
        @click="currentPage++"
        :disabled="currentPage === totalPages"
      >
        Następna strona
      </button>
      <button
        class="pages-btn"
        @click="currentPage = totalPages"
        :disabled="currentPage === totalPages"
      >
        Na koniec
      </button>
    </div>
    <div class="page-cards">
      <div v-for="post in postsPag" :key="post.id">
        <div class="post-style">
          <p>
            <strong>Post nr. {{ post.id }}</strong>
          </p>
          <p><strong> Tytuł:</strong> {{ post.title }}</p>
          <br />
          <p class="post-text">
            <strong>Treść:</strong> {{ expandedText(post) }}
            <a @click="onClickExpand(post.id)">
              {{ post.id === textID ? "Zwiń" : "Rozwiń" }}</a
            >
          </p>
          <br />
          <div v-for="user in users" :key="user.id">
            <p v-if="user.id === post.userId">
              <strong>Imię i nazwisko:</strong> {{ user.name }}
            </p>
          </div>
          <button class="remove-btn" @click="onRemove(post.id)">
            Usuń post
          </button>
        </div>
      </div>
      <div class="page-buttons-div">
        <button
          class="pages-btn"
          @click="currentPage = 1"
          :disabled="currentPage === 1"
        >
          Na początek
        </button>
        <button
          class="pages-btn"
          @click="currentPage--"
          :disabled="currentPage === 1"
        >
          Poprzednia strona
        </button>

        <span class="page-number-style"
          >{{ currentPage }} / {{ totalPages }}</span
        >
        <button
          class="pages-btn"
          @click="currentPage++"
          :disabled="currentPage === totalPages"
        >
          Następna strona
        </button>
        <button
          class="pages-btn"
          @click="currentPage = totalPages"
          :disabled="currentPage === totalPages"
        >
          Na koniec
        </button>
      </div>
    </div>
  </div>
</template>
