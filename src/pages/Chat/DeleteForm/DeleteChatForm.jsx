import { Menu } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import DeleteChatConfirm from "./DeleteChatConfirm";
import '../Chat.css';


const DeleteChatForm = ({showDeleteChatForm, chat, onDelete, pageX, pageY}) => {

  const handleItemClick = async (item) => {
    switch (item.key) {
      case "1":
        DeleteChatConfirm(chat, onDelete);
        break;
      default:
        break;
    }
    item.key = '0'
  };
  return (
    <>
    <Menu
      onClick={handleItemClick}
      className={"menu"}
      style={{
        top: pageY,
        left: (window.innerWidth - (pageX + 184)) < 0 ? window.innerWidth - 227 : pageX,
        display: showDeleteChatForm ? 'block' : 'none',
      }}
    >
      <Menu.Item key="1">
        <DeleteOutlined />
        Видалити
      </Menu.Item>
    </Menu>
    </>
  );
};
export default DeleteChatForm;
