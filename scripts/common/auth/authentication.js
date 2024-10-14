export const authenticateUser = (user) => {
  const stringifiedUser = JSON.stringify({ ...user, auth: true });
  localStorage.setItem("auth", stringifiedUser);
};
