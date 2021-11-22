import {
  getChat,
  userChats,
  addMessage,
  deleteMessage,
} from "../../api/ChatApi";
import { useEffect, useState, useRef } from "react";
import {
  List,
  Avatar,
  Input,
  Layout,
  Button,
  Form,
  Col,
  Row,
  Menu,
  Typography,
  Dropdown,
} from "antd";
import { SendOutlined, MenuOutlined } from "@ant-design/icons";
import "./Chat.css";
import { HubConnectionBuilder } from "@microsoft/signalr";
import AddChatForm from "./AddChat";
import AddChanelForm from "./AddChanel";
import MyProfileForm from "./MyProfile";
import UserProfileForm from "./UserProfile";
import Auth from "../../Other/Auth";
import DeleteMessForm from "./DeleteMessForm";
import ClickAwayListener from "react-click-away-listener";

export default function Chat() {
  const [chat, setChat] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatList, setChatList] = useState(Array);
  const [currentChatId, setCurrentChatId] = useState();
  const [visibleAddChat, setVisibleAddChat] = useState();
  const [visibleAddChanel, setVisibleAddChanel] = useState();
  const [visibleMyProfile, setVisibleMyProfile] = useState();
  const [visibleUserProfile, setVisibleUserProfile] = useState();
  const [showDeleteForm, setShowDeleteForm] = useState();
  const [messageId, setMessageId] = useState();
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [form] = Form.useForm();
  const latestChat = useRef(null);
  latestChat.current = chat;
  const { Search } = Input;
  const { Title } = Typography;

  const getChatById = async (chatId) => {
    const chat = await getChat(chatId);
    setChat(chat.data);
    setChatMessages(chat.data.messages);
    console.log(chatMessages);
    setCurrentChatId(chatId);
  };

  const getChatList = async () => {
    const res = await userChats();
    setChatList(res.data);
  };

  const onSearch = async () => {};

  const showDrawerAddChat = () => {
    setVisibleAddChat(true);
  };
  const showDrawerAddChanel = () => {
    setVisibleAddChanel(true);
  };
  const showDrawerMyProfile = () => {
    setVisibleMyProfile(true);
  };
  const showDrawerUserProfile = () => {
    setVisibleUserProfile(true);
  };
  const handleClickAway = () => {
    setShowDeleteForm(false);
  };
  const handleDeleteMessage = (id) => {
    const filteredMessages = chatMessages.filter((d) => d.id !== id);
    setChatMessages([...filteredMessages]);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={showDrawerMyProfile}>My Profile</Menu.Item>
      <Menu.Item onClick={showDrawerAddChat}>New Chat</Menu.Item>
      <Menu.Item onClick={showDrawerAddChanel}>New Chanel</Menu.Item>
    </Menu>
  );

  const sendMessage = async (mess) => {
    const chatMessage = {
      text: mess.text,
      chatId: currentChatId,
    };
    await addMessage(chatMessage);
    form.resetFields();
  };

  useEffect(() => {
    getChatList();
  }, []);

  return (
    <Layout.Content style={{ height: "100%" }}>
      <Row>
        <Col flex={1} className="outline">
          <Dropdown
            overlay={menu}
            trigger={["click"]}
            placement="bottomRight"
            arrow
          >
            <Button icon={<MenuOutlined />} />
          </Dropdown>

          <Search
            placeholder="input search text"
            allowClear
            onSearch={onSearch}
            style={{ width: 200 }}
          />
          <List
            itemLayout="horizontal"
            dataSource={chatList}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  getChatById(item.chatId);
                }}
                style={{ overflow: "hidden", wordBreak: "break-word" }}
              >
                {item.type === 0 ? (
                  <List.Item.Meta
                    className="list-item"
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={item.firstName + " " + item.lastName}
                    description={item.lastMessage}
                  />
                ) : (
                  <List.Item.Meta
                    className="list-item"
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={item.name}
                    description={item.lastMessage}
                  />
                )}
                {item.text}
              </List.Item>
            )}
          />
        </Col>

        <Col flex={7}>
          <Title level={3} onClick={showDrawerUserProfile}>
            {chat.firstName + " " + chat.lastName}
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={chatMessages}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  setShowDeleteForm(false);
                  console.log(messageId);
                }}
                onContextMenu={(event) => {
                  event.preventDefault();
                  setMessageId(item.id);
                  console.log(messageId);
                  setShowDeleteForm(true);
                  setX(event.pageX);
                  setY(event.pageY);
                }}
              >
                {item.userId ? (
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        onClick={showDrawerUserProfile}
                        src="https://joeschmoe.io/api/v1/random"
                      />
                    }
                    title={item.text}
                    description={item.date}
                  />
                ) : (
                  <List.Item.Meta
                    avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
                    title={item.text}
                    description={item.date}
                  />
                )}
              </List.Item>
            )}
          />
          <Form
            className="inp"
            onFinish={sendMessage}
            form={form}
            autoComplete="off"
          >
            <Form.Item name="text">
              <Input placeholder="Write a message"></Input>
            </Form.Item>
            <Button type="primary" htmlType="submit" icon={<SendOutlined />} />
          </Form>
        </Col>
      </Row>
      <ClickAwayListener onClickAway={handleClickAway}>
        <DeleteMessForm
          showDeleteForm={showDeleteForm}
          message={messageId}
          onDelete={handleDeleteMessage}
          pageX={x}
          pageY={y}
        />
      </ClickAwayListener>
      <AddChatForm
        visibleModal={visibleAddChat}
        setVisibleModal={setVisibleAddChat}
      />
      <AddChanelForm
        visibleModal={visibleAddChanel}
        setVisibleModal={setVisibleAddChanel}
      />
      <MyProfileForm
        visibleModal={visibleMyProfile}
        setVisibleModal={setVisibleMyProfile}
      />
      <UserProfileForm
        visibleModal={visibleUserProfile}
        setVisibleModal={setVisibleUserProfile}
        userId={chat.userId}
      />
    </Layout.Content>
  );
}
