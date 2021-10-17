import React from 'react'
import './login.css'
import Logo from '../../assets/logo_ache.png'
import { MdEmail, MdLock } from 'react-icons/md'

const Login = () => {
  return (
    <div className="login">
      <div className="login-left">
        <h1>Seja Bem-Vindo á</h1>
        <img src={Logo} alt="logo teste" />
        <h5>
          Ainda não tem acesso
          <br /> ao sistema? <a href="#"> clique aqui.</a>
        </h5>
      </div>
      <div className="login_right">
        <h1>Login para Dashboard</h1>
        <div className="login-InputEmail">
          <MdEmail />
          <input type="text" placeholder="Digite um email" />
        </div>
        <div className="login-InputPassword">
          <MdLock />
          <input type="text" placeholder="Digite sua senha" />
        </div>
        <div className="box">
          <label>
            <input type="checkbox" />
            Lembrar-me
          </label>
          <label >
            <a href="#"> Esqueci a senha?</a>
          </label>
        </div>
        <button type="submit">Entrar</button>
      </div>
    </div>
  )
}

export default Login
