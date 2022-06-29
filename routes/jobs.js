const express = require("express");
const router = express.Router();

const { getAllTodo, getSingleTodo } = require("../controllers/todos");

router.route("/").get(getAllTodo);
router.route("/:id").get(getSingleTodo);

module.exports = router;
