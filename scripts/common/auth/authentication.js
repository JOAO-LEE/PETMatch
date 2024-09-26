export const authenticateUser = (user) => {
  console.log("oi");
  const stringifiedUser = JSON.stringify({ ...user, auth: true });
  localStorage.setItem("auth", stringifiedUser);
};
