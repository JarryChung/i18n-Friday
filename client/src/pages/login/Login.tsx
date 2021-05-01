import styled from '@emotion/styled';
import { Button, Card, Form, Input, Divider } from 'antd';
import { useAuth } from 'components/AuthProvider';
import { IAuthRequset } from 'helpers/auth';
import { useState } from 'react';

export const LoginPage = () => {
  const { login, register } = useAuth();
  const [isRegister, setIsRegister] = useState(false);

  const onLogin = (data: IAuthRequset) => {
    login(data);
  };
  const onRegister = (data: IAuthRequset) => {
    register(data);
  };

  return (
    <Container>
      <ShadowCard>
        <Title>{isRegister ? '注册' : '登录'}</Title>

        <Form onFinish={isRegister ? onRegister : onLogin}>
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
            <Input placeholder="用户名" type="text" id="username" />
          </Form.Item>

          <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
            <Input placeholder="密码" type="password" id="password" />
          </Form.Item>

          {isRegister && (
            <Form.Item name="password2" rules={[{ required: true, message: '请输入确认密码' }]}>
              <Input placeholder="确认密码" type="password" id="password2" />
            </Form.Item>
          )}

          <Form.Item>
            <LongButton type={'primary'} htmlType="submit">
              {isRegister ? '注册' : '登录'}
            </LongButton>
          </Form.Item>
        </Form>

        <Divider />

        <LongButton type="link" onClick={() => setIsRegister(!isRegister)}>
          {isRegister ? '已经有帐号了？直接登录' : '没有账号？注册新账号'}
        </LongButton>
      </ShadowCard>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`;

const Title = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
  text-align: center;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 50rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 0 10px;
`;

const LongButton = styled(Button)`
  width: 100%;
`;
