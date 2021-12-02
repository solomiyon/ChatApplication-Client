import React, { useEffect, useState } from "react";
import { Modal, Button, Select, Form } from "antd";
import { getAll } from "../../../api/UserApi";
import { addChanelUsers } from "../../../api/ChatApi";

const AddChanelUsersForm = ({ visibleModal, setVisibleModal, сurrentChat }) => {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  let userList = [];

  const onCancel = () => {
    form.resetFields();
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

  const addUsers = async (value) => {
    let usersForChanel = [];
    for (let userId of value.id) {
      console.log(userId)
      var user = {
        id: userId
      };
      usersForChanel.push(user);
    }
    const chatUsers = {
      users: usersForChanel,
      id: сurrentChat
    };
    addChanelUsers(chatUsers);
    form.resetFields();
    setVisibleModal(false);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Modal
      title="Add Chat Users"
      visible={visibleModal}
      onCancel={onCancel}
      footer={[]}
    >
      <Form onFinish={addUsers} form={form}>
        <Form.Item name="id">
          <Select
            mode="multiple"
            allowClear
            style={{ width: "100%" }}
            placeholder="Select users"
            optionFilterProp="children"
            style={{ width: 450 }}
          >
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
export default AddChanelUsersForm;
