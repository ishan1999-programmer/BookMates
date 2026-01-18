require("dotenv").config();

const connectDB = require("./config/db.config");
const app = require("./app");

const startServer = async () => {
  try {
    const response = await connectDB();
    if (response.success) {
      app.listen(3000, () => console.log("Server listening at port 3000...."));
    } else {
      process.exit(1);
    }
  } catch (error) {
    console.log(
      error.message || "Something went wrong while starting the server"
    );
    process.exit(1);
  }
};

startServer();
