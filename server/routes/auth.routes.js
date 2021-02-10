const { Router } = require("express");
const User = require("../models/User");
const router = Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const Role = require("../models/Role");
const jwt = require("jsonwebtoken");
const config = require("config");

const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles,
  };
  return jwt.sign(payload, config.get("jwtSecretKey"), { expiresIn: "2h" });
};

router.post(
  "/register",
  [
    check("lastname", "Поле неможе бути порожнім").not().isEmpty().trim(),
    check("firstname", "Поле неможе бути порожнім")
      .not()
      .isEmpty()
      .trim()
      .escape(),
    check("email", "Некоректний email").isEmail().normalizeEmail(),
    check("password", "Мінімальна довжина пароля 8 символів").isLength({
      min: 8,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Не коректні дані при реєстрації",
        });
      }
      const { lastname, firstname, email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.json({ message: "Такий користувач вже існує" });
      }

      const hashPassword = bcrypt.hashSync(password);
      const userRole = await Role.findOne({ value: "Teacher" });

      const user = new User({
        lastname,
        firstname,
        email,
        password: hashPassword,
        role: [userRole.value],
      });
      await user.save();
      res.status(201).json({ message: "Реєстрація пройшла успішно" });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так" });
    }
  }
);

router.post(
  "/login",
  [
    check("email", "Ведіть коректний email").normalizeEmail().isEmail(),
    check("password", "Ведіть пароль").exists(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Не коректні дані при вході в систему",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          message:
            "Не вірно вказана пошта або пароль. Перевірте правильність та спробуйте ще раз.",
        });
      }

      const isMatch = await bcrypt.compareSync(password, user.password);

      if (!isMatch) {
        return res.status(400).json({
          message:
            "Не вірно вказана пошта або пароль. Перевірте правильність та спробуйте ще раз.",
        });
      }
      const token = generateAccessToken(user._id, user.roles);

      res.json({ token, userId: user._id });
    } catch (e) {
      res.status(500).json({ message: "Щось пішло не так" });
    }
  }
);

router.post("/role", async (req, res) => {
  try {
    const { value } = req.body;
    const newRole = new Role({ value });
    await newRole.save();
    res.status(201).json({ message: "Created" });
  } catch (error) {
    res.status(500).json({ message: e });
  }
});

module.exports = router;
