const http = require("http"); // 모듈 가져와 할당

const hostname = "127.0.0.1"; // 서버의 주소 = 호스트네임 localhost
const port = 3000; // 클라이언트와 통신할 3000번 포트

const server = http.createServer((req, res) => {
  // http 모듈. => : errorfunction [es6문법]
  // 콜백함수 : 클라이언트가 접속했을 때 동작하는 코드.

  if (req.url === "/") {
    res.statusCode = 200; // 성공 의미
    res.setHeader("Content-Type", "text/plain"); // 헤더값 설정
    res.end("Hello, World!\n"); // end 함수로 응답

  }else if(req.url ==='/users'){
    res.statusCode =200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('User list');

  } else {
    res.statusCode = 404; // 성공 의미
    res.end("Not Found!");
  }

 
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`); // 서버구동 완료시 출력
  // listen -> 서버를 요청 대기상태로 만들어주는 함수.
  // 요청 대기상태 : 서버가 클라이언트의 요청을 받기 위해 종료하지 않고 계속 대기하는 상태.(listen()함수로 동작)
  // listen 메소드가 완료되면 호출되는 콜백함수.

  // 템플릿 문자열. 문자열 안에 ${} 사용 시 변수가 값으로 들어가게 됨.
});
