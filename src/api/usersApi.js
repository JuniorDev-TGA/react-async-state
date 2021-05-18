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
    const response = await axios.get(`${baseUrl}/users`);
    return response.data;
  },
  updateUser: (user) => {
    return axios.patch(`${baseUrl}/users/${user.id}`, user);
  },
};
