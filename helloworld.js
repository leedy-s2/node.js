const express = require("express"); // express 모듈 가져옴
const app = express(); // express 객체만들어서 app에 할당
const port = 3004;

app.get("/users", (req, res) => { // get 메소드를 통해 파라미터 (1 - 경로, 2- 경로에 따라 수행할 로직함수)
  res.send("user list"); // 콜백함수의 파라미터인 req, res는 http의 요청 응답이 아니라 wapping된 express의 것들.
  // 따라서   send 메소드를 활용하여  ==> 문자열 클라이언트에게 출력, 보내줌.
});

app.post("/users", (req, res)=>{
  //create user
  res.send("user");
})

app.listen(port, () => { // 서버 구동
  console.log(`Example app listening at http://localhost:${port}`); // listen이 완료될 때 실행될 callback함수를 파라미터로.
}); // 요청대기상태 -> 문자열 출력.
