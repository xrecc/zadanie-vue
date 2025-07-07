import type { Module } from "vuex/types/index.js";
import type { IndexState } from "../index.ts";
import axios from "axios";

export interface AddressGeo {
  lat: string;
  lng: string;
}

export interface UsersAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: AddressGeo[];
}

export interface UsersCompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface Users {
  id: number;
  name: string;
  username: string;
  email: string;
  address: UsersAddress[];
  phone: string;
  website: string;
  company: UsersCompany[];
}

export interface UsersState {
  data: Users[];
}

export default {
  namespaced: true,
  state: {
    data: [] as Users[],
  },
  getters: {
    allUsers: (state: UsersState): Users[] => state.data,
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await axios.get<Users[]>(
        "https://jsonplaceholder.typicode.com/users"
      );
      commit("SET_USERS", await response.data);
    },
  },
  mutations: {
    SET_USERS(state: UsersState, users: Users[]) {
      state.data = users;
    },
  },
} as Module<UsersState, IndexState>;
