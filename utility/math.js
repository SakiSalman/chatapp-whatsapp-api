
/**
 * Generate Random & Uniquw Code
 * @param {*} min 
 * @param {*} max 
 * @returns 
 */
export const verificationCode = (min=100000, max=1000000) => {

    return Math.floor(Math.random() * (max - min)) + min;
}