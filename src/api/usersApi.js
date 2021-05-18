import axios from "axios";

const baseUrl = "https://reqres.in/api";

function fakeNetworkDelay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const usersApi = {
  getUsers: async () => {
    await fakeNetworkDelay(1000);
    return axios.get(`${baseUrl}/users`);
  },
  updateUser: (user) => {
    return axios.patch(`${baseUrl}/users/${user.id}`);
  },
};
