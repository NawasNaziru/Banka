
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const saltRounds = 10;

// Predefined generic function for server response in feature modules

const sendJSONresponse = (res, status, content) => {
  res.status(status);
  res.json(content);
};

export const login = (req, res) => {
  if (!req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      status: 400,
      error: 'Requires your email and password',
    });
    return;
  }

  if(!Users[req.body.email]){
    sendJSONresponse(res, 401, { status: 401, error: 'Sign up first' });
    return;
  }

  if(!Users[req.body.email].password){
    sendJSONresponse(res, 401, { status: 401, error: 'Sign up Again. Your password was lost' });
    return;
  }
  
  if(req.body.password !== Users[req.body.email]['password']){
    sendJSONresponse(res, 401, { status: 401, error: 'Incorrect password' });
    return;
  }

if(req.body.email !== Users[req.body.email].email){
  sendJSONresponse(res, 401, { status: 401, error: 'Incorrect username' });
  return;
}

 const user = Users[req.body.email];
 sendJSONresponse(res, 200, { status: 200, data: user });
 return;
 
};

// eslint-disable-next-line func-names
export const register = (req, res) => {
  if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
    sendJSONresponse(res, 400, {
      status: 400,
      error: 'Requires your firstName, lastName, email and password!',
    });
    return;
  }


  // eslint-disable-next-line no-undef
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(req.body.password, salt);
  // eslint-disable-next-line no-undef
  const userId = Object.keys(Users).length;
  const userPassword = req.body.password;

  const generateJwt = () => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + 7);

    return jwt.sign({
      _id: userId,
      email: req.body.email,
      name: req.body.firstName,
      exp: parseInt((expiry.getTime() / 1000), 10),
    }, process.env.JWT_SECRET); // DO NOT KEEP YOUR SECRET IN THE CODE!
  };


  const hasId = (arr, id) => {
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i] === id) {
        return true;
      }
    }
    return false;
  };

  const user = {};
  const id = parseInt(req.body.id, 10);
  user.token = generateJwt();
  // eslint-disable-next-line no-unused-expressions
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-unused-expressions
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-unused-expressions
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-unused-expressions
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-unused-expressions
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-unused-expressions
  hasId(staffIds, id) || hasId(adminIds, id)
    ? user.id = parseInt(req.body.id, 10) : user.id = userId;
  user.firstName = req.body.firstName;
  user.lastName = req.body.lastName;
  user.email = req.body.email;
  // eslint-disable-next-line no-unused-expressions
  hasId(staffIds, id) || hasId(adminIds, id)
    ? user.type = 'staff' : user.type = 'client';
  // eslint-disable-next-line no-unused-expressions
  user.type === 'staff' ? user.isAdmin = true : user.isAdmin = false;

  // save newly registered user
  Users[user.email] = user;


  sendJSONresponse(res, 201, { status: 201, data: user });

  // The below is for security purpose, such that password and hash can only be seen
  // after user sign in. Thus, making it  unhelpful for a hacker.

  user.password = userPassword;
  user.hash = hash;
  Users[user.email] = user;
};
