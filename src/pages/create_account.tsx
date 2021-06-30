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

      console.log(username, password)
      const response = await fetch('/api/create_new_account', {
        method: 'POST',
        body: JSON.stringify({
          username: username, 
          password: password}),
      })    
      .then(response => response.json())
      .then(response => {
        const {username, password} = response.errors;
        if (username === "false") {
          setInvalidUsername(true);
        } else {
          setInvalidUsername(false);
        }

        if (password === "false") {
          setInvalidPassword(true);
        } else {
          setInvalidPassword(false);
        }
      });

    }

    //State for username & password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //State flag for weak password & invalid password
    const [weakPassword, setWeakPassword] = useState(false);
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    
    //Function for handling state change of username & password
    const handleDataChange = (type) => {
      let usernameElement = ((document.getElementById("username") as HTMLInputElement).value);
      let passwordElement = ((document.getElementById("password") as HTMLInputElement).value);
      
      if (type === "username") {
        setUsername(usernameElement);
      } else if (type === "password") {
        setPassword(passwordElement);
      }
    }

  return (
    <>
      <Head>
        <title>Create Account</title>
      </Head>
      <article className={styles.article}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input type='text' id='username' placeholder="Username" value={username} onChange={() =>handleDataChange('username')}/>
          <input type='text' id='password' placeholder="Password" value={password} onChange={() =>handleDataChange('password')}/>
          <button>Create Account</button>
        </form>
        <ul>
        {invalidUsername ? (<li>Username should be between 10 and 50 characters</li>) : null}
        {invalidPassword ? (
          <div>
            <li>Password should be between 20 and 50 characters</li>
            <li>Password contains at least 1 symbol (!,@,#,$,%)</li>
            <li>Password contains at least 1 letter (a-zA-Z)</li>
            <li>Password contains at least 1 number (0-9)</li>
          </div>) : null}
          </ul>
      </article>
    </>
  );
}
