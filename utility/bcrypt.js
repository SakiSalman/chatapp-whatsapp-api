import bcrypt from "bcryptjs";

/**
 * HAS Password with Bcryptjs
 * @param {*} password
 * @returns
 */
export const hasPassword = async (password) => {
  return await bcrypt.hash(password, 12);
};
/**
 * Compare Password with Bcryptjs
 * @param {*} password
 * @returns
 */
export const checkPasswod = async(password, hash) => {
  return await bcrypt.compare(password, hash)
};