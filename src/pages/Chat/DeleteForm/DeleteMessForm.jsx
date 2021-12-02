import { Menu } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import DeleteMessConfirm from "./DeleteMessConfirm";
import '../Chat.css';


const DeleteMessForm = ({showDeleteForm, message, onDelete, pageX, pageY}) => {

  const handleItemClick = async (item) => {
    switch (item.key) {
      case "1":
        DeleteMessConfirm(message, onDelete);
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
        display: showDeleteForm ? 'block' : 'none',
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
export default DeleteMessForm;
