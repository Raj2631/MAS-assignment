import { check, validationResult } from 'express-validator';

export const userValidationRules = () => [
  check('name', 'Name is required').exists(),
  check('email', 'Please enter a valid email').isEmail(),
  check(
    'password',
    'Please enter a password at least 8 characters long and must contain at least one uppercase, one lower case & one special character. '
  ).matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i'),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({ errors: errors.array() });
};
