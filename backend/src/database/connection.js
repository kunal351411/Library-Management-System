require("dotenv").config();
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.json")[env];
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

/** Connection setup with the respective database through sequelize */
sequelize
  .authenticate()
  .then(() => {
    console.log("🎉 Database Connection established successfully.");
  })
  .catch((err) => {
    console.log("❗ Unable to connect to the database:", err);
  });

module.exports = sequelize;
