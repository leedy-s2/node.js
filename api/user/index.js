// 기본적인 routing 설정 로직
const express = require('express');
const router = express.Router();
const ctrl = require('./user.ctrl');


router.get("/", ctrl.index); // 해당 로직은 "/" routing에 대한 컨트롤러 함수를 바인딩
router.get("/:id", ctrl.show);
router.delete("/:id", ctrl.destroy);
router.post("/", ctrl.create);
router.put("/:id", ctrl.update);

module.exports = router;