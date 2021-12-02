import { Input, Button, Form } from "antd";
import { register } from "../../api/UserApi";
import { useHistory } from "react-router-dom";

export default function SignUp() {
  const history = useHistory();
  const initialValues = {
    Name: "",
    LastName: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
    PhoneNumber: "",
  };

  const handleSubmit = async (values) => {
    await register(values);
    history.push(`/signin`);
  };

  return (
    <Form
      name="SignUpForm"
      initialValues={initialValues}
      onFinish={handleSubmit}
    >
      <Form.Item name="firstName">
        <Input placeholder="Ім'я" />
      </Form.Item>
      <Form.Item name="lastName">
        <Input placeholder="Прізвище" />
      </Form.Item>
      <Form.Item name="email">
        <Input placeholder="Електронна пошта" />
      </Form.Item>
      <Form.Item name="password">
        <Input.Password visibilityToggle={true} placeholder="Пароль" />
      </Form.Item>
      <Form.Item name="confirmPassword">
        <Input.Password
          className="form-control"
          visibilityToggle={true}
          placeholder="Підтвердіть пароль"
        />
      </Form.Item>
      <Form.Item name="phoneNumber">
        <Input placeholder="Номер телефону" />
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit">Зареєструватись</Button>
      </Form.Item>
    </Form>
  );
}
