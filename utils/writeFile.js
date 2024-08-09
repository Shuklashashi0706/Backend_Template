const fs = require("fs");
const path = require("path");

const read = function () {
  fs.readFile(path.join(__dirname, "s.txt"), "utf-8", (err, data) => {
    if (err) {
      console.error(err);
    }
    console.log(data);
  });
};
const write = function () {
  fs.writeFile(path.join(__dirname, "s.txt"), "Hi bhai 1", "utf-8", (err) => {
    if (err) console.error(err);
    console.log("File saved");
  });
};
read();
write();
