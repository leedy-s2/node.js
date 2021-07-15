// 1. 기본 모듈
//const http = require('http');
// http 기본 모듈 불러오기 위해 require 함수 사용. => http 변수에 할당.
// http 모듈이 제공하는 여러 method 사용 가능
//http.createServer();

// 2. 사용자 정의 모듈
// const math = require('./math.js'); // 정의된 파일 경로
// const result = math.sum(1,2);
// console.log(result);

const fs = require("fs");
//const data = fs.readFileSync('./data.txt', 'utf-8');
const data = fs.readFile("./data.txt", "utf-8", function (err, data) {
  console.log(data);
});

//console.log(data);
