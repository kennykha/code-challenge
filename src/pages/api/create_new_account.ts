import type { NextApiRequest, NextApiResponse } from 'next';

interface CreateNewAccountParameters {
  username: string;
  password: string;
}

interface BooleanResult {
  result: boolean;
  errors?: Record<string, string>;
}

export default function createNewAccount(req: NextApiRequest, res: NextApiResponse<BooleanResult>) {
  const { username, password}: CreateNewAccountParameters = JSON.parse(req.body);
  let usernameValid = false;
  let passwordValid = false;
  let result = false;

  if (username.length >= 10 && username.length <= 50) {
    usernameValid = true;
  }

  //Consider assigning RegEx to specific variables for future implementation of 
  //real time feedback on which password area is failing
  if (password.length >= 20 && password.length <= 50 && /[!@#$%]/.test(password) && /[a-zA-z]/.test(password) && /[0-9]/.test(password)) {
      passwordValid = true;
    }
    // if (!/[!@#$%]/.test(password)) {
    //   passwordValid = false;
    // }

    // if(!/[a-zA-z]/.test(password)) {
    //   passwordValid = false;
    // }

    // if(!/[0-9]/.test(password)) {
    //   passwordValid = false;
    // }
  if (usernameValid && passwordValid) {
    result = true;
  }
  
  res.status(200).json({ result: result, errors: {username: `${usernameValid}`, password:`${passwordValid}`}});
}
