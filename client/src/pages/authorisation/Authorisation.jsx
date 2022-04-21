import { React } from 'react';
import { Container, Card, Form, FormControl, Button, Row } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../../utils/constants';
export const Authorisation = () => {
  const location = useLocation();
  const isLogin = location.pathname === LOGIN_ROUTE;

  return (
    <Container
      className='d-flex justify-content-center align-items-center'
      style={{ height: window.innerHeight - 50 }}>
      <Card className='p-5' style={{ width: '600px' }}>
        <h2 className='m-auto'>{isLogin ? "Авторизация" : "Регистрация"}</h2>
        <Form className='d-flex flex-column'>
          <FormControl className='mt-3' placeholder='Введите E-mail'>

          </FormControl>
          <FormControl className='mt-3' placeholder='Введите пароль'>

          </FormControl>
          <Row className='d-flex justify-content-between mt-4 ml-1 mr-1'>
            {isLogin ? 
            (<div>
            <span className='mr-2'>Нет аккаунта?</span>
            <Link to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</Link>
          </div>
            ):(
          <div>
            <span className='mr-2'>Есть аккаунт?</span>
            <Link to={LOGIN_ROUTE}>Выполните вход!</Link>
          </div>
            )}
          <Button className='align-self-end' variant={'outline-success'}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Button>
          </Row>
        </Form>
      </Card>
    </Container>
  )
}
