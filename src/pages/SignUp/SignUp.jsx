import { Input, Button, Form } from "antd";
import {register} from "../../api/UserApi"

const initialValues = {
    Name: '',
    LastName: '',
    Email: '',
    Password: '',
    ConfirmPassword: '',
    PhoneNumber: '',
  };

const handleSubmit = async (values) => {
    await register(values);
}

export default function SignUp() {
  return (
    <Form
      name="SignUpForm"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item name="FirstName">
        <Input placeholder="Ім'я" />
      </Form.Item>
      <Form.Item name="LastName">
        <Input placeholder="Прізвище" />
      </Form.Item>
      <Form.Item name="Email">
        <Input placeholder="Електронна пошта" />
      </Form.Item>
      <Form.Item name="Password">
        <Input.Password
          visibilityToggle={true}
          placeholder="Пароль"
        />
      </Form.Item>
      <Form.Item name="ConfirmPassword">
        <Input.Password
          className="form-control"
          visibilityToggle={true}
          placeholder="Підтвердіть пароль"
        />
      </Form.Item>
      <Form.Item name="PhoneNumber">
        <Input placeholder="Номер телефону" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Зареєструватись</Button>
      </Form.Item>
    </Form>
  );
}
