import React from "react";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { deleteChat } from "../../../api/ChatApi";

const { confirm } = Modal;

const DeleteChatConfirm = (chat, onDelete) => {
  return confirm({
    title: "Ви справді хочете видалити цей чат?",
    icon: <ExclamationCircleOutlined style={{ color: "#3c5438" }} />,
    okText: "Так",
    cancelText: "Ні",
    onOk() {
        const remove = async () => {
          await deleteChat(chat);
        };
        remove();
        onDelete(chat);
      }
  });
};
export default DeleteChatConfirm;
