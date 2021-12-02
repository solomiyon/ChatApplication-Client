import React, { useEffect, useState } from "react";
import { Input, Modal, Button, Select, Form } from "antd";
import { getAll } from "../../../api/UserApi";
import { createChat } from "../../../api/ChatApi";

const AddChatForm = ({ visibleModal, setVisibleModal, getChats }) => {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  let userList = [];

  const onCancel = () => {
    setVisibleModal(false);
  };

  const getUsers = async () => {
    await getAll().then((res) => {
      for (let value of res.data) {
        var user = {
          id: value.id,
          firstName: value.firstName,
          lastName: value.lastName,
        };
        userList.push(user);
      }
      setUsers(userList);
    });
  };

  const create = async (value) => {
    createChat(value.id);
    form.resetFields();
    getChats();
    setVisibleModal(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Modal
      title="Add New Chat"
      visible={visibleModal}
      onCancel={onCancel}
      footer={[]}
    >
      <Form onFinish={create} form={form}>
        <Form.Item name="id">
          <Select style={{ width: 450 }}>
            {users?.map((dst) => (
              <Select.Option key={dst.value} value={dst.id}>
                {dst.firstName + " " + dst.lastName}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button key="back" onClick={onCancel}>
            Cancel
          </Button>
          <Button key="submit" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};
export default AddChatForm;
