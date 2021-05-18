export const getUsersState = (store) => store.users;

export const getUsersList = (store) =>
  getUsersState(store) ? getUsersState(store).allIds : [];

export const getUsersById = (store, id) =>
  getUsersState(store) ? { ...getUsersState(store).usersById[id], id } : {};

/**
 * example of a slightly more complex selector
 * select from store combining information from multiple reducers
 */
export const getAllUsers = (store) =>
  getUsersList(store).map((id) => getUsersById(store, id));

export const getSelectedUser = (store) => {
  const { selectedUserId } = store.users;
  return getUsersById(store, selectedUserId);
};
