const fs = require("fs");
const path = require("path");

const readData = async () => {
    let fileData = "";

    await fs.readFile(path.join(__dirname, "s.txt"), "utf-8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        fileData = data;
        console.log();
        
    });
    
}

readData();
