const express = require("express");
const Sequelize = require("sequelize")
const { validateForm, hashPassword } = require("./middleware/validation")
require('dotenv').config()

const controller = require("./controllers");

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const { DB_NAME, DB_USER, DB_PWD, DB_HOST, DB_DIALECT } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PWD, {
    host: DB_HOST,
    dialect: DB_DIALECT
});
sequelize.authenticate().then(() => {
    console.log("Success!");
}).catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    controller.home(req, res);
});

app.post("/api/v1/login", (req, res) => {
    controller.login(req, res)

})

app.post("/api/v1/signup", validateForm, hashPassword, (req, res) => {
    // console.log(req.hashedPwd);
    controller.signup(req, res)
})

app.get("/api/v1/lessons", (req, res) => {
    controller.getLessons(req, res)
})

app.listen(5000, () => console.log("Server running on port 5000"));

module.exports = app
