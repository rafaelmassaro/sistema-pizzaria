import Head from 'next/head';
import Image from 'next/image';

import logoImg from '../../public/logo.svg';

import styles from  '../../styles/home.module.scss';

import { Input } from '../components/UI/Input';
import { Button } from '../components/UI/Button';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sujeito Pizza - Faça o seu login</title>
      </Head>

      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo Sujeito Pizzaria"/>

        <div className={styles.login}>
          <form>
            <Input
              placeholder='Digite o seu e-mail' 
              type="text"
            />
            <Input
              placeholder='Digite sua senha'
              type="password" 
            />

            <Button
              type="submit"
              loading={false}
            >
              Acessar
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
