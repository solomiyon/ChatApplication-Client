import { get, post, put, remove } from "../Other/MainApi";

const userChats = async () => {
  return await get("all");
};
const createChat = async (data) => {
  return await post(`createChat/${data}`, data);
};
const createGroup = async (data) => {
   return await post("createGroup", data);
};
const addMessage = async (data) => {
  return await post("message", data);
};
const getChat = async (data) => {
  return await get(`getChat/${data}`, data);
};
const newChanel = async (data) => {
  return await post("createGroup", data)
}
const deleteMessage = async (id) => {
  return await remove(`deleteMessage/${id}`, id)
}

export { userChats, createChat, createGroup, addMessage, getChat, newChanel, deleteMessage };
