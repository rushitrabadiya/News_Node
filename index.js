const mongoose = require("mongoose");
const app = require("./app");
const { DB, PORT } = require("./config/config");

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful!"))
  .catch((err) => {
    console.error("DB connection error:", err);
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
