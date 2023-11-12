export const encodeUrlEmail = (email) => {
  return email.replace(/@/g, "__at__").replace(/\./g, "__dot__");
};
export const decodeUrlEmail = (encodedEmail) => {
  return encodedEmail.replace(/__at__/g, "@").replace(/__dot__/g, ".");
};
