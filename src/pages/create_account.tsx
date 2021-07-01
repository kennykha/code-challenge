import Head from 'next/head';
import { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

export default function CreateAccount() {
  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    let inputBody = {};
    if (username || password) {
      inputBody = {
        username: username, 
        password: password
      }
    } 

    const response = await fetch('/api/create_new_account', {
      method: 'POST',
      body: JSON.stringify(inputBody),
    })    
    .then(response => response.json())
    .then(response => {
      console.log(response)
      handleSubmitState(true);
      if (Object.keys(inputBody).length === 0) {
        return;
      }

      if (response.result) {
        setAllValidations(true);
        setUsername('');
        setPassword('');
        return;
      }

      const { usernameLength } = response.errors.username;
      if (!usernameLength) {
        setInvalidUsername(false);
      } else {
        setInvalidUsername(true);
      }

      const {length, specialCharacter, letter, number} = response.errors.password;
      if (!length) {
        setInvalidPasswordLength(false);
      } else {
        setInvalidPasswordLength(true);
      }
      if (!specialCharacter) {
        setInvalidPasswordSpecial(false);
      } else {
        setInvalidPasswordSpecial(true);
      }
      if (!letter) {
        setInvalidPasswordLetter(false);
      } else {
        setInvalidPasswordLetter(true);
      }
      if (!number) {
        setInvalidPasswordNumber(false);
      } else {
        setInvalidPasswordNumber(true);
      }
    });

    const exposedPasswordResponse = await fetch('/api/password_exposed', {
      method: 'POST',
      body: JSON.stringify({
        password: password}),
    })
    .then((exposedPassWordResponse) => exposedPassWordResponse.json())
    .then((exposedPassWordResponse) => {
      const { result } = exposedPassWordResponse;
      if (result) {
        setWeakPassword(true);
      } else {
        setWeakPassword(false);
      }
    })
  }

  //State values for username & password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //State flag for weak password & invalid password
  const [submitState, handleSubmitState] = useState(false);
  const [weakPassword, setWeakPassword] = useState(false);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPasswordLength, setInvalidPasswordLength] = useState(false);
  const [invalidPasswordSpecial, setInvalidPasswordSpecial] = useState(false);
  const [invalidPasswordLetter, setInvalidPasswordLetter] = useState(false);
  const [invalidPasswordNumber, setInvalidPasswordNumber] = useState(false);
  const [allValidations, setAllValidations] = useState(false);
  
  //Functions for handling state change of username & password
  const handleUsernameChange = (e : any) => {
    setUsername(e.target.value)
  }

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1 className={styles.newAccountHeader}>Create New Account</h1>
          <input type='text' className={styles.userInput} placeholder="Username" value={username} onChange={handleUsernameChange}/>
          <input type='password' className={styles.userInput} placeholder="Password" value={password} onChange={handlePasswordChange}/>
          <button className={styles.createButton}>Create Account</button>
        </form>
        {(submitState && !allValidations) && (
          <ul className={styles.inputErrors}>
            {weakPassword && (<li className={styles.invalid}>- Passwordword chosen is an exposed password</li>)}
            <li className={invalidUsername ? styles.valid : styles.invalid}>- Username should be between 10 and 50 characters</li>
            <li className={invalidPasswordLength ? styles.valid : styles.invalid}>- Password should be between 20 and 50 characters</li>
            <li className={invalidPasswordSpecial ? styles.valid : styles.invalid}>- Password contains at least 1 symbol (!,@,#,$,%)</li>
            <li className={invalidPasswordLetter ? styles.valid : styles.invalid}>- Password contains at least 1 letter (a-zA-Z)</li>
            <li className={invalidPasswordNumber ? styles.valid : styles.invalid}>- Password contains at least 1 number (0-9)</li>
          </ul>
        )}
        {allValidations && (
          <ul className={styles.inputSuccess}>
            <li className={styles.valid}>User account has been created</li>
          </ul>
        )}
      </article>
    </>
  );
}
