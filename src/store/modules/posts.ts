import type { Module } from "vuex/types/index.js";
import type { IndexState } from "../index.ts";
import axios from "axios";

export interface Posts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface PostsState {
  data: Posts[];
}

export default {
  namespaced: true,
  state: {
    data: [] as Posts[],
  },
  getters: {
    allPosts: (state: PostsState): Posts[] => state.data,
  },
  actions: {
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get<Posts[]>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        commit("SET_POSTS", await response.data);
      } catch (error) {
        console.error("Fetching error", error);
      }
    },

    async removePost({ commit }, id: number) {
      try {
        await axios.delete<Posts[]>(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        commit("REMOVE_POST", id);
      } catch (error) {
        console.error("Removing error", error);
      }
    },
  },
  mutations: {
    SET_POSTS(state: PostsState, posts: Posts[]) {
      state.data = posts;
    },
    REMOVE_POST(state: PostsState, id: number) {
      state.data = state.data.filter((data) => data.id !== id);
    },
  },
} as Module<PostsState, IndexState>;
