const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  // Получаем токен из заголовка или из куки
  const token = 
    req.header('Authorization')?.replace('Bearer ', '') || 
    req.cookies?.authToken;
  
  console.log('Токен:', token); // TODO убрать логирование
  
  // Если токена нет, перенаправляем на страницу входа
  if (!token) {
    console.log('Нет токена, перенаправляем на страницу входа'); // TODO убрать логирование
    return res.redirect('/login');
  }

  try {
    // Верифицируем токен
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    
    console.log('Токен декодирован:', decoded); // TODO убрать логирование
    
    // информация о пользователе в req
    req.user = {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role
    };
    
    next();
  } catch (err) {
    console.log('Ошибка авторизации - токен невалидный:', err.message); // TODO логирование потом убрать
    // Если токен невалидный, перенаправляем на страницу входа
    return res.redirect('/login');
  }
};