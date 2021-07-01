import Head from 'next/head';
import { FormEvent, useState } from 'react';
import styles from 'src/styles/create_account.module.scss';

// export default function CreateAccount() {
//   async function handleSubmit(evt: FormEvent) {
//     evt.preventDefault();
//     const response = await fetch('/api/create_new_account', {
//       method: 'POST',
//       body: JSON.stringify({}),
//     });

//     console.log(await response.json());
//   }



  export default function CreateAccount() {
    async function handleSubmit(evt: FormEvent) {
      evt.preventDefault();
      
      //Conditional to handle no inputs into username & password
      if (!username && !password) {
        return;
      }

      const exposedPasswordResponse = await fetch('/api/password_exposed', {
        method: 'POST',
        body: JSON.stringify({
          password: password}),
      })
      .then((exposedPassWordResponse) => exposedPassWordResponse.json())
      .then((exposedPassWordResponse) => {
        console.log('exposedPassWordResponse', exposedPassWordResponse)
        const { result } = exposedPassWordResponse;
        if (result) {
          setWeakPassword(true);
        } else {
          setWeakPassword(false);
        }
      })

      const response = await fetch('/api/create_new_account', {
        method: 'POST',
        body: JSON.stringify({
          username: username, 
          password: password}),
      })    
      .then(response => response.json())
      .then(response => {
        console.log(response);
        handleSubmitState(true);
        const { usernameLength } = response.errors.username;
        if (!usernameLength) {
          setInvalidUsername(true);
        } else {
          setInvalidUsername(false);
        }

        const {length, specialCharacter, letter, number} = response.errors.password;
        if (!length) {
          setInvalidPasswordLength(true);
        } else {
          setInvalidPasswordLength(false);
        }
        if (!specialCharacter) {
          setInvalidPasswordSpecial(true);
        } else {
          setInvalidPasswordSpecial(false);
        }
        if (!letter) {
          setInvalidPasswordLetter(true);
        } else {
          setInvalidPasswordLetter(false);
        }
        if (!number) {
          setInvalidPasswordNumber(true);
        } else {
          setInvalidPasswordNumber(false);
        }
      });
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
          <input type='text' className={styles.userInput} placeholder="Password" value={password} onChange={handlePasswordChange}/>
          <button>Create Account</button>
        </form>
        {submitState && (
          <ul className={styles.inputErrors}>
            {weakPassword && (<li className={styles.invalid}>Passwordword chosen is an exposed password. Please consider changing it.</li>)}
            {invalidUsername ? (<li className={styles.invalid}>Username should be between 10 and 50 characters</li>) : (<li className={styles.valid}>Username should be between 10 and 50 characters</li>)}
            {invalidPasswordLength ? (<li className={styles.invalid}>Password should be between 20 and 50 characters</li>) : (<li className={styles.valid}>Password should be between 20 and 50 characters</li>)}
            {invalidPasswordSpecial ? (<li className={styles.invalid}>Password contains at least 1 symbol (!,@,#,$,%)</li>) : (<li className={styles.valid}>Password contains at least 1 symbol (!,@,#,$,%)</li>)}
            {invalidPasswordLetter ? (<li className={styles.invalid}>Password contains at least 1 letter (a-zA-Z)</li>) : (<li className={styles.valid}>Password contains at least 1 letter (a-zA-Z)</li>)}
            {invalidPasswordNumber ? (<li className={styles.invalid}>Password contains at least 1 number (0-9)</li>) : (<li className={styles.valid}>Password contains at least 1 number (0-9)</li>)}
          </ul>
        )}
      </article>
    </>
  );
}
