const { Router } = require("express");
const Test = require("../models/Test");
const router = Router();
const auth = require("../middleware/auth.middleware");
const { check, validationResult } = require("express-validator");
const Task = require("../models/Task");

router.post(
  "/create",
  [
    check("topic", "Поле неможе бути порожнім").not().isEmpty().trim(),
    check("status", "Статус не визначений").isBoolean(),
    check("classId", "Некоректний ID").not().isEmpty().trim(),
  ],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Не коректні дані при реєстрації",
        });
      }
      const { topic, classId, status } = req.body;
      const candidate = await Test.findOne({ topic, classId });
      if (candidate) {
        return res.json({ message: "Тест з такою темою вже існує" });
      }
      const newTest = new Test({ topic, classId, status });
      await newTest.save();
      res.status(201).json({ message: "Тест створено" });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так" });
    }
  }
);

router.put(
  "/update",
  [
    check("_id", "Некоректний ID").not().isEmpty().trim(),
    check("topic", "Поле неможе бути порожнім").not().isEmpty().trim(),
    check("status", "Статус не визначений").isBoolean(),
    check("classId", "Некоректний ID").not().isEmpty().trim(),
  ],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Не коректні дані при реєстрації",
        });
      }
      const { _id, topic, classId, status } = req.body;
      const test = await Test.findByIdAndUpdate(
        _id,
        { $set: { topic, classId, status } },
        { new: true }
      );
      await test.save();
      res.status(201).json({ message: "Зміни збережено" });
    } catch (error) {
      res.status(500).json({ message: "Щось пішло не так" });
    }
  }
);

router.delete(
  "/delete",
  [check("id", "Некоректний ID").not().isEmpty().trim()],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Не коректні дані при реєстрації",
        });
      }
      const { id } = req.body;
      await Task.deleteMany({ testId: id });
      await Test.findByIdAndDelete({ _id: req.body.id });
      res.json({ message: "Тест видалено" });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так" });
    }
  }
);


router.post("/task/create", auth, async (req, res) => {
  try {
    const { question, answers, right, type, testId } = req.body;
    const newTask = new Task({
      question,
      answers: [...answers],
      right,
      type,
      testId,
    });
    await newTask.save();
    res.status(201).json({ message: "Created" });
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так" });
  }
});

router.put("/task/update", auth, async (req, res) => {
  try {
    const { _id, question, answers, right, type, testId } = req.body;

    const task = await Task.findByIdAndUpdate(
      _id,
      { $set: { question, answers, right, type, testId } },
      { new: true }
    );
    await task.save();
    res.json({ message: "Змінено" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
});

router.get("/:id", auth, async (req, res) => {
  try {
    const tasks = await Task.find({ testId: req.params.id });
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так" });
  }
});

module.exports = router;
