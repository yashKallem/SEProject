export const getProfileUrlByEmail = (displayEmail) => {
  return `http://localhost:8080/api/v1/users/profile?email=${displayEmail}`;
}