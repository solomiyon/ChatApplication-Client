import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import jwt from "jwt-decode";
import Auth from "../../../Other/Auth";
import { editMyProfile } from "../../../api/UserApi";

const FormEditProfile = ({ setShowEditModal, onEdit, user }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phoneNumber: user.phoneNumber
    });
  }, []);

  const handleCancel = () => {
    setShowEditModal(false);
  };

  const handleFinish = async (newInfo) => {
    editMyProfile(newInfo);
    setShowEditModal(false);
  };

  return (
    <Form name="basic" onFinish={handleFinish} form={form}>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item
            label="First Name"
            labelCol={{ span: 24 }}
            name="firstName"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item label="Last Name" labelCol={{ span: 24 }} name="lastName">
            <Input allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item
            label="Mobile"
            labelCol={{ span: 24 }}
            name="phoneNumber"
          >
            <Input allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item label="Email" labelCol={{ span: 24 }} name="email">
            <Input allowClear />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="start" gutter={[12, 0]}>
        <Col md={24} xs={24}>
          <Form.Item style={{ textAlign: "right" }}>
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Change
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default FormEditProfile;
