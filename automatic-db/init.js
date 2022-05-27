const fs = require("fs");

const init = () => {
  try {
    fs.readdirSync(`${__dirname}/database`);
    console.log("Already initiated");
    return;
  } catch (e) {
    try {
      fs.mkdirSync(`${__dirname}/database`);
    } catch (e) {
      throw Error("Failed to initiate");
    }
  }
};

init();
