// 실제 서버를 돌리는 부분

const app = require("..");
const syncDB = require("./sync-db");
syncDB().then((_) => {
  //인자를 사용하지 않겠다. == ()=>
  console.log("Sync database!");
  app.listen(3000, () => {
    console.log("Server is running on 3000 port"); // 서버를 요청대기상태로 전환.
  });
});
