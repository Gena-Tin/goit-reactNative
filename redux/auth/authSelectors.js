const getUser = (state) => state.auth.user;
const getIsAuth = (state) => state.auth.isAuth;
const getIsLoading = (state) => state.auth.loading;
const getIsError = (state) => state.auth.error;

export const authSelectors = {
  getUser,
  getIsAuth,
  getIsLoading,
  getIsError
}