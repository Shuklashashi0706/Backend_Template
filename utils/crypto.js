const crypto = require("crypto");
const current = Date.now();
process.env.UV_THREADPOOL_SIZE = 10;
crypto.pbkdf2("password1", "123", 200, 12, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log(Date.now() - current, "ms");
  console.log(derivedKey.toString("hex"));
});
crypto.pbkdf2("password2", "123", 200, 12, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log(Date.now() - current, "ms");
  console.log(derivedKey.toString("hex"));
});
crypto.pbkdf2("password3", "123", 200, 12, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log(Date.now() - current, "ms");
  console.log(derivedKey.toString("hex"));
});
crypto.pbkdf2("password4", "123", 200, 12, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log(Date.now() - current, "ms");
  console.log(derivedKey.toString("hex"));
});
crypto.pbkdf2("password6", "123", 200, 12, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log(Date.now() - current, "ms");
  console.log(derivedKey.toString("hex"));
});
crypto.pbkdf2("password4", "123", 200, 12, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log(Date.now() - current, "ms");
  console.log(derivedKey.toString("hex"));
});
crypto.pbkdf2("password4", "123", 200, 12, "sha512", (err, derivedKey) => {
  if (err) throw err;
  console.log(Date.now() - current, "ms");
  console.log(derivedKey.toString("hex"));
});
