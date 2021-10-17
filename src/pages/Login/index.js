import Image from 'next/image'
import Link from 'next/link'
import styles from './login.module.css'
import { MdEmail, MdLock } from 'react-icons/md'

const Login = () => {
  return (
    <div className={styles.login}>
      <div className={styles.login_left}>
        <h1>Seja Bem-Vindo á</h1>
        <Image src="/assets/logo_ache.png" alt="logo teste" width='110px' height='140px' />
        <h5>
          Ainda não tem acesso
          <br /> ao sistema? <Link href="#"><a>clique aqui.</a></Link>
        </h5>
      </div>
      <div className={styles.login_right}>
        <h1>Login para Dashboard</h1>
        <div className={styles.login_InputEmail}>
          <MdEmail />
          <input type="text" placeholder="Digite um email" />
        </div>
        <div className={styles.login_InputPassword}>
          <MdLock />
          <input type="password" placeholder="Digite sua senha" />
        </div>
        <div className={styles.box}>
          <label>
            <input type="checkbox" />
            Lembrar-me
          </label>
          <label >
            <Link href="#"><a> Esqueci a senha?</a></Link>
          </label>
        </div>
        <button type="submit">Entrar</button>
      </div>
    </div>
  )
}

export default Login
