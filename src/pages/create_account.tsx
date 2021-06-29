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
    }

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleDataChange = (type) => {
      if (type === "username") {
        setUsername((document.getElementById("username") as HTMLInputElement).value)
      } else if (type === "password") {
        setPassword((document.getElementById("password") as HTMLInputElement).value)
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
      </article>
    </>
  );
}
