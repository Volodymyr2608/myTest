const { Router } = require("express");
const Student = require("../models/Student");
const router = Router();
const auth = require("../middleware/auth.middleware");
const { check, validationResult } = require("express-validator");
const Role = require("../models/Role");

router.post(
  "/create",
  [
    check("lastname", "Поле неможе бути порожнім").not().isEmpty().trim(),
    check("firstname", "Поле неможе бути порожнім")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check("email", "Некоректний email").isEmail().normalizeEmail(),
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
      const { lastname, firstname, email, classId } = req.body;

      const candidate = await Student.findOne({ email });
      if (candidate) {
        return res.json({ message: "Такий учень вже існує" });
      }
      const userRole = await Role.findOne({ value: "Student" });
      const student = new Student({
        lastname,
        firstname,
        email,
        classId,
        role: [userRole.value],
      });
      await student.save();
      res.status(201).json({ message: "Учня успішно додано" });
    } catch (e) {
      res.status(500).json({ message: e });
    }
  }
);

router.put(
  "/update",
  [
    check("lastname", "Поле неможе бути порожнім").not().isEmpty().trim(),
    check("firstname", "Поле неможе бути порожнім")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check("email", "Некоректний email").isEmail().normalizeEmail(),
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
      const { _id, lastname, firstname, email, classId, role } = req.body;
      const student = await Student.findByIdAndUpdate(
        _id,
        { $set: { lastname, firstname, email, classId, role } },
        { new: true }
      );
      await student.save();
      res.json({ message: "Зміни збережені" });
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

      await Student.findByIdAndDelete({ _id: req.body.id });
      res.json({ message: "Учня видалено" });
    } catch (error) {
      res.status(500).json({ message: "Щось пішло не так" });
    }
  }
);

module.exports = router;
