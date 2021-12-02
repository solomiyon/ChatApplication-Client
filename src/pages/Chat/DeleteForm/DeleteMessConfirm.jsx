import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteMessage} from "../../../api/ChatApi";

const { confirm } = Modal;

const DeleteMessConfirm = (message, onDelete) => {
  return confirm({
    title: "Ви справді хочете видалити це повідомлення?",
    icon: <ExclamationCircleOutlined style={{ color: "#3c5438" }} />,
    okText: "Так",
    cancelText: "Ні",
    onOk() {
      const remove = async () => {
        await deleteMessage(message);
      };
      remove();
      onDelete(message);
    },
  });
};
export default DeleteMessConfirm;
