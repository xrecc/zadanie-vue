import { createStore } from "vuex";
import posts from "./modules/posts";
import users from "./modules/users";

export interface IndexState {}

export default createStore<IndexState>({
  modules: {
    posts,
    users,
  },
});
