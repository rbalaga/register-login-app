const express = require('express');
const { users } = require('./../db/users.json');
const { createErr } = require('../helpers/utilities');

const router = express.Router();

const validateRegistrationData = (req, res, next) => {
  const userData = req.body;
  if (!userData.userName) {
    next(createErr('Username not valid', 3000));
    return;
  }
  if (!userData.firstName) {
    next(createErr('Firstname not valid', 3001));
    return;
  }
  if (!userData.lastName) {
    next(createErr('Lastname not valid', 3002));
    return;
  }
  if (!userData.email) {
    next(createErr('Email not valid', 3003));
    return;
  }
  if (!userData.password) {
    next(createErr('Password not valid', 30004));
    return;
  }
  next();
}

const validateDuplicateUsers = (req, res, next) => {
  const { userName, email } = req.body;
  const userNameMatchingUser = users.find(user => user.userName === userName);
  if (userNameMatchingUser) {
    next(createErr('Username already exists', 4000));
    return;
  }
  const emailMatchingUser = users.find(user => user.email === email);
  if (emailMatchingUser) {
    next(createErr('Emamil already exists', 4001));
    return;
  }
  next();
}

router.route('/')
  .options()
  .post(validateRegistrationData, validateDuplicateUsers, (req, res, next) => {
    const userData = req.body;
    // const { userName, firstName, lastName, email, password } = userData;
    userData.id = users.length + 1;
    users.push(userData);
    res.jsonp({
      status: 'registration successfull',
      data: { id: userData.id, userName: userData.userName }
    });
  });

module.exports = router;