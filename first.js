var express = require("express");
var app = express();
var morgan = require("morgan");
var boadyParser = require("body-parser");
var user = require('./api/user');

app.use(morgan("dev"));
app.use(boadyParser.json());
app.use(boadyParser.urlencoded({ extended: true }));

app.use('/users', user); // users라고 들어오는 모든 api 요청에 있어서 user 모듈이 담당한다.

app.listen(3006, () => {
  console.log("Example app listening on port 3000!");
});

module.exports = app;
