// A simple in-memory database for users
export const usersDatabase = {};

// A very basic hashing function (not recommended for real-world use)
export function simpleHash(input) {
  return input
    .split("")
    .reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0)
    .toString();
}
