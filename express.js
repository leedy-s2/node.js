const express = require('express');
const morgan = require('morgan');
const app = express(); // 미들웨어를 app에 추가 가능

function logger(req, res, next){
  console.log('로그 찍는 함수');
  next();
}

function logger2(req, res, next) {
  console.log('로그 찍느 함수 2번째');
  next();
}

app.use(logger); // 미들웨어 추가 함수 use
app.use(logger2); 
app.use(morgan('dev'));
app.listen(3001, function(){
  console.log('Server is running');
})
