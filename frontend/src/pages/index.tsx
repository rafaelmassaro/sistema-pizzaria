import { useContext, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { GetServerSideProps } from 'next';

import { AuthContext } from '../contexts/AuthContext';

import { casSSRGuest } from '../utils/canSSRGuest';


import logoImg from '../../public/logo.svg';

import styles from  '../../styles/home.module.scss';

import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  async function handleSignIn(event: FormEvent){
    event.preventDefault();

    if(email === '' || password === ''){
      toast.warn("Preencha todos os campos!");
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data);

    setLoading(false);
  }

  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça o seu login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>

        <div className={styles.login}>
          <form onSubmit={handleSignIn}>
            <Input
              placeholder='Digite o seu e-mail' 
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <Input
              placeholder='Digite sua senha'
              type="password" 
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button
              type="submit"
              loading={loading}
            >
              Acessar
            </Button>
          </form>

          <Link href="/signup">
            <a className={styles.text}>Não possui uma conta? Cadastra-se</a>
          </Link>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = casSSRGuest(async(ctx) => {
  return{
    props:{}
  }
});