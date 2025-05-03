const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { handleChangePassword } = require('../controllers/changePasswordController');

router.post(
  '/',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('tempPassword').notEmpty().withMessage('Temporary password is required'),
    body('newPassword').isLength({ min: 6 }).withMessage('Password too short'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) throw new Error('Passwords do not match');
      return true;
    })
  ],
  handleChangePassword
);

module.exports = router;
