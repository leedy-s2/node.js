// 어플리케이션 역할

var express = require("express");
var app = express();
var morgan = require("morgan");
var user = require("./api/user");

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // bodyparser 자동 제공

app.use("/users", user); // users라고 들어오는 모든 api 요청에 있어서 user 모듈이 담당한다.

module.exports = app;
