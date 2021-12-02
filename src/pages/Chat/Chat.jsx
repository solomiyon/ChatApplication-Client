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
  Affix,
  message,
} from "antd";
import { SendOutlined, MenuOutlined } from "@ant-design/icons";
import "./Chat.css";
import { HubConnectionBuilder } from "@microsoft/signalr";
import AddChatForm from "./AddForm/AddChat";
import AddChanelForm from "./AddForm/AddChanel";
import MyProfileForm from "./Profile/MyProfile";
import UserProfileForm from "./Profile/UserProfile";
import Auth from "../../Other/Auth";
import DeleteMessForm from "./DeleteForm/DeleteMessForm";
import ClickAwayListener from "react-click-away-listener";
import DeleteChatForm from "./DeleteForm/DeleteChatForm";
import AddChanelUsersForm from "./AddForm/AddChanelUsers";
import moment from "moment";

export default function Chat() {
  const [chat, setChat] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [currentChatId, setCurrentChatId] = useState();
  const [visibleAddChat, setVisibleAddChat] = useState();
  const [visibleAddChanel, setVisibleAddChanel] = useState();
  const [visibleMyProfile, setVisibleMyProfile] = useState();
  const [visibleUserProfile, setVisibleUserProfile] = useState();
  const [showDeleteForm, setShowDeleteForm] = useState();
  const [showDeleteChatForm, setShowDeleteChatForm] = useState();
  const [visibleAddChanelUsers, setVisibleAddChanelUsers] = useState();
  const [messageId, setMessageId] = useState();
  const [chatId, setChatId] = useState();
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
    setCurrentChatId(chatId);
    console.log(currentChatId);
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
  const showDrawerAddChannelUsers = () => {
    setVisibleAddChanelUsers(true);
  };
  const handleClickAway = () => {
    setShowDeleteForm(false);
  };
  const handleClickChatAway = () => {
    setShowDeleteChatForm(false);
  };

  const handleDeleteMessage = (id) => {
    const filteredMessages = chatMessages.filter((d) => d.id !== id);
    setChatMessages([...filteredMessages]);
  };

  const handleDeleteChat = (id) => {
    const filteredChats = chatList.filter((d) => d.id !== id);
    setChatList([...filteredChats]);
  };

  const menu = (
    <Menu>
      <Menu.Item onClick={showDrawerMyProfile}>My Profile</Menu.Item>
      <Menu.Item onClick={showDrawerAddChat}>New Chat</Menu.Item>
      <Menu.Item onClick={showDrawerAddChanel}>New Chanel</Menu.Item>
    </Menu>
  );

  const hubConnection = new HubConnectionBuilder()
    .withUrl("http://localhost:44841/chat", {
      accessTokenFactory: () => Auth.getToken(),
    })
    .build();

  useEffect(() => {
    hubConnection.start();
  }, []);

  hubConnection.on("ReceiveMessage", (data) => {
    console.log(chatMessages, data);

    setChatMessages((prevState) => [...(prevState || []), data]);
  });

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
            className="chatList"
            itemLayout="horizontal"
            dataSource={chatList}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  getChatById(item.chatId);
                }}
                onContextMenu={(event) => {
                  event.preventDefault();
                  setChatId(item.chatId);
                  setShowDeleteChatForm(true);
                  setX(event.pageX);
                  setY(event.pageY);
                }}
                style={{ wordBreak: "break-word" }}
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
          {chat.type === 0 ? (
            <Title level={3} onClick={showDrawerUserProfile}>
              {chat.firstName + " " + chat.lastName}
            </Title>
          ) : (
            <Title level={3} onClick={showDrawerAddChannelUsers}>
              {chat.name}
            </Title>
          )}
          <List
            className="messageList"
            itemLayout="horizontal"
            dataSource={chatMessages}
            renderItem={(item) => (
              <List.Item
                onClick={() => {
                  setShowDeleteForm(false);
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
                <List.Item.Meta
                  avatar={
                    <Avatar
                      onClick={showDrawerUserProfile}
                      src="https://joeschmoe.io/api/v1/random"
                    />
                  }
                  title={item.text}
                  description={moment.utc(item.date).local().format("DD.MM.YYYY HH:mm")}
                />
              </List.Item>
            )}
          />
          {/* <div>
            {(chatMessages || []).map((i) => {
              return (
                <div className="message">
                  <p>{i.text}</p>
                </div>
              );
            })}
          </div> */}
          <Form
            className="inp"
            onFinish={sendMessage}
            form={form}
            autoComplete="off"
          >
            <Input.Group compact>
              <Form.Item name="text">
                <Input placeholder="Write a message"></Input>
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SendOutlined />}
              />
            </Input.Group>
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
      <ClickAwayListener onClickAway={handleClickChatAway}>
        <DeleteChatForm
          showDeleteChatForm={showDeleteChatForm}
          chat={chatId}
          onDelete={handleDeleteChat}
          pageX={x}
          pageY={y}
        />
      </ClickAwayListener>
      <AddChatForm
        visibleModal={visibleAddChat}
        setVisibleModal={setVisibleAddChat}
        getChats={getChatList}
      />
      <AddChanelForm
        visibleModal={visibleAddChanel}
        setVisibleModal={setVisibleAddChanel}
        getChats={getChatList}
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
      <AddChanelUsersForm
        visibleModal={visibleAddChanelUsers}
        setVisibleModal={setVisibleAddChanelUsers}
        сurrentChat={currentChatId}
      />
    </Layout.Content>
  );
}
