// 기본적인 routing 설정 로직
const express = require('express');
const router = express.Router();
const ctrl = require('./user/ctrl');
var users = [
  { id: 1, name: "alice" },
  { id: 2, name: "white" },
  { id: 3, name: "hello" },
];


router.get("/", ctrl.index); // 해당 로직은 "/" routing에 대한 컨트롤러 함수를 바인딩

router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end();
  res.json(user);
});

router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end();
  users = users.filter((user) => user.id !== id);
  res.status(204).end();
});

router.post("/", (req, res) => {
  const name = req.body.name;
  if (!name) return res.status(400).end();
  const isDuplicate = users.filter((user) => user.name === name).length;
  if (isDuplicate) return res.status(409).end();
  const id = Date.now(); // unique한 아이디를 위해 timestamp 박아주기
  const user = { id, name };
  users.push(user);
  res.status(201).json(user);
});

router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (Number.isNaN(id)) return res.status(400).end(); // 정수 아닌 파라미터
  const name = req.body.name;
  if (!name) return res.status(400).end(); // 파라미터가 비어 있을 때
  const DuplicateName = users.filter((user) => user.name === name).length;
  if (DuplicateName) return res.status(409).end(); // 중복된 이름이 있을 때
  const user = users.filter((user) => user.id === id)[0];
  if (!user) return res.status(404).end(); // 해당 id의 유저가 없을 때
  user.name = name;
  res.json(user);
});

module.exports = router;