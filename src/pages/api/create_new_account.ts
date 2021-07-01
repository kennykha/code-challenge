import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, errorType>;
}

type errorType = {
  [key: string]: boolean
}

export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  //Should figure out how to handle empty object
  if (Object.keys(JSON.parse(req.body)).length === 0) {
    res.status(200).json({result: true})
    return;
  }
  
  const { username, password}: CreateNewAccountParameters = JSON.parse(req.body);
  let usernameValid = {
    usernameLength: false
  }
  let passwordValid = {
    length: false,
    specialCharacter: false,
    letter: false,
    number: false
  }
  let result = false;

  if (username.length >= 10 && username.length <= 50) {
    usernameValid.usernameLength = true;
  }

  if (password.length >= 20 && password.length <= 50) {
      passwordValid.length = true;
    }

  if (/[!@#$%]/.test(password)) {
    passwordValid.specialCharacter = true;
  }

  if(/[a-zA-z]/.test(password)) {
    passwordValid.letter = true;
  }

  if(/[0-9]/.test(password)) {
    passwordValid.number = true;
  }

  //Result validation
  if (!usernameValid.usernameLength) {
    result = false;
  }

  for (const key in passwordValid) {
    if (!passwordValid[key]) {
      result = false;
    }
  }

  res.status(200).json({ result: result, errors: {
    username: usernameValid, 
    password: passwordValid
  }});
}
