import axios from "axios";

const baseUrl = "https://reqres.in/api";

export const usersApi = {
  getUsers: () => {
    return axios.get(`${baseUrl}/users`);
  },
};
