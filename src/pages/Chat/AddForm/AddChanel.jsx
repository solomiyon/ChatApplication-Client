import React, { useState } from "react";
import {
  Input,
  Modal,
  Button,
  Form,
  Radio,
} from "antd";
import { newChanel } from "../../../api/ChatApi";

const AddChanelForm = ({ visibleModal, setVisibleModal }) => {
  const [form] = Form.useForm();

  const createChanel = async (value) => {
    newChanel(value);
    setVisibleModal(false);
    form.resetFields();
  };

  const onCancel = () => {
    form.resetFields();
    setVisibleModal(false);
  };

  return (
    <Modal
      title="Add New Chanel"
      visible={visibleModal}
      onCancel={onCancel}
      footer={[
        
      ]}
    >
      <Form onFinish={createChanel} form={form}>
        <Form.Item name="name">
          <Input placeholder="Chanel name"></Input>
        </Form.Item>
        <Form.Item name="type">
          <Radio.Group>
            <Radio value={1}>Private Chanel</Radio> 
            <Radio value={2}>Public Chanel</Radio>
          </Radio.Group>
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
export default AddChanelForm;
