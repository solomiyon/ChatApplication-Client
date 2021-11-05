import Auth from "../../Other/Auth";
import jwt from 'jwt-decode';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button} from "antd";
import {login} from "../../api/UserApi"

let user; 

const initialValues = {
  Email: "",
  Password: "",
  RememberMe: true,
};


export default function SignIn(){
  const history = useHistory();
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    await login(values);
    const token = Auth.getToken();
    user = jwt(token);
    history.push(`/chat`);
    //window.location.reload();
  };
  
  return( 
    <Form
        name="SignInForm"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={initialValues}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item name="Email">
          <Input
            placeholder="Електронна пошта"
          />
        </Form.Item>
        <Form.Item name="Password" >
          <Input.Password
            className="form-control"
            visibilityToggle={true}
            placeholder="Пароль"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" >
            Увійти
          </Button>
        </Form.Item>
        <Form.Item>
          <a href='signup'>Зареєструватись</a>
        </Form.Item>
      </Form>
  );
};