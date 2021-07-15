const express = require('express');
const app = express();

function commonmw(req, res, next){
  console.log('commonmw');
  next(new Error('error occured')); // 에러 객체 던져줌.
}
function errormw(err, req, res, next){ // 전달받은 에러를 처리하거나, error를 처리 못하면 다음 미들웨어에게 에러를 넘긴다.
  console.log(err.message);
  next();
}

app.use(commonmw);
app.use(errormw);

app.listen(3002, function(){
    console.log('Server is running');
})