const express = require('express');
const auth = require('../middleware/auth');
const User = require('../models/user');
const router = express.Router();
const { validateProfileUpdate } = require('../../shared/validation');

router.post('/delete', auth, async (req, res) => {
  try {
    await User.deleteUser(req.user.id);
    res.clearCookie('token');
    res.json({ success: true, message: 'Пользователь и аватар удалены' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Ошибка удаления пользователя' });
  }
});

router.post('/profile', auth, async (req, res) => {
  try {
     const errors = validateProfileUpdate(req.body);
    if (errors) {
      return res.status(400).json({ success: false, errors });
    }

      // Проверка уникальности email
    if (await User.isEmailTaken(req.body.email, req.user.id)) {
      return res.status(400).json({
        success: false,
        errors: { email: 'Этот email уже используется другим пользователем' }
      });
    }
    
// TODO: письмло с подтверждением email, если email изменен

   await User.updateProfile(
      req.user.id,
      req.body.display_name,
      req.body.email,
      req.body.bio,
      req.body.new_password // undefined если не меняется
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Ошибка обновления профиля' });
  }
});

// получение пользователя
router.get('/me', auth, async (req, res) => {
  try {
    // req.user формируется в middleware/auth.js
    const user = await User.getById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'Пользователь не найден' });
    }
    // Вернуть только нужные поля!
    res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        nickname: user.display_name,
        email: user.email,
        about: user.bio,
        avatar: user.avatar // если есть поле
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Ошибка получения пользователя' });
  }
});

module.exports = router;