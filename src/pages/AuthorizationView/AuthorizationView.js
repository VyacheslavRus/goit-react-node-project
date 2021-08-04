import React,{useContext, useEffect, useState} from 'react';
import Container from '../../components/Container';
import { AuthContext } from './context/AuthContext';
import s from './head.module.css'
import { useHttp } from './hooks/http.hook';
import { useMessage } from './hooks/message.hook';



const AuthorizationView = () => {
  const auth = useContext(AuthContext)
  const message = useMessage()
  const {loading, error, request, clearError} = useHttp()
  const [form, setForm]= useState({
     email: "",
    password: "",
  })
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };
  
  // useEffect(()=>{
  //    window.M.updateTextFields() 
  // })

  const registerHanlker = async () => {
    try {
      const data = await request("/api/v1/auth/sign-up", "POST", { ...form });
      message(data.message);
    } catch (error) {}
  };
  const loginHanlker = async () => {
    try {
      const data = await request("/api/v1/auth/sign-in", "POST", { ...form });
      auth.login(data.token, data.userId)
    } catch (error) {}
  };

  return (
    <main>
      <Container>
       <div className={s.author}>
         <div className={s.title}>
           <p className={s.auth}>Вы можете авторизоваться с помощью Google Account:</p>
           <button className={s.auth_button}>Google</button>
           <p className={s.auth_title}>Или зайти с помощью e-mail и пароля, предварительно зарегистрировавшись:</p>
            
            <div className={s.auth_autorization}>
              <label htmlFor="email" className={s.auth_item}>Электронная почта:</label>
            <input
                placeholder="your@email.com"
                id="email"
                type="text"
                name="email"
                value={form.email}
                onChange={changeHandler}
                className={s.auth_item_input}
              />
              <label htmlFor="password" className={s.auth_item}>Пароль:</label>
              <input
                placeholder="password"
                id="password"
                type="password"
                name="password"
                className={s.auth_item_input}
                value={form.password}
                onChange={changeHandler}
              />
              </div>
              <div className="">
            <button
              className={s.auth_button_login}
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHanlker}
            >
              ВОЙТИ
            </button>
            <button
              className={s.auth_button_register}
              onClick={registerHanlker}
              disabled={loading}
            >
              РЕГИСТРАЦИЯ
            </button>
          </div>
         </div>
       </div>
      </Container>
    </main>
  );
};

export default AuthorizationView;
