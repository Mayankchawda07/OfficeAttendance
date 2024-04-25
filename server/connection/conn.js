const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    mongoose.set("strictQuery", false);
    const connected = await mongoose.connect('mongodb+srv://virajkaleworkholic:virajkaleworkholicgmailcom@cluster0.jag9pvj.mongodb.net/workholicAttendance');
    console.log("Server connected");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = dbConnect;
