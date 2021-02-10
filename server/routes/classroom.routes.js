const { Router } = require("express");
const Classroom = require("../models/classroom");
const Test = require("../models/Test");
const Student = require("../models/Student");
const router = Router();
const auth = require("../middleware/auth.middleware");
const { check, validationResult } = require("express-validator");

router.post(
  "/create",
  [
    check("parallel", "Поле неможе бути порожнім")
      .not()
      .isEmpty()
      .trim()
      .isLength({ max: 6 }),
    check("letter", "Поле неможе бути порожнім")
      .not()
      .isEmpty()
      .trim()
      .isLength({ max: 6 }),
  ],
  auth,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Не коректні дані при створенні",
        });
      }
      const { parallel, letter } = req.body;
      const candidate = await Classroom.findOne({
        parallel,
        letter,
        owner: req.user.id,
      });

      if (candidate) {
        return res.json({ message: "Такий клас вже існує" });
      }
      const classroom = new Classroom({ parallel, letter, owner: req.user.id });
      await classroom.save();
      res.status(201).json({ message: "Клас створено" });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так" });
    }
  }
);

router.get("/:id", auth, async (req, res) => {
  try {
    const classroom = await Classroom.findById(req.params.id);
    const students = await Student.find({ classId: req.params.id });
    const tests = await Test.find({ classId: req.params.id});
    const { _id, parallel, letter } = classroom;
    res.json({ _id, parallel, letter, students, tests });
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const classrooms = await Classroom.find({ owner: req.user.id });
    res.json(classrooms);
  } catch (e) {
    res.status(500).json({ message: "Щось пішло не так" });
  }
});

module.exports = router;
