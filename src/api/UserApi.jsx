import Auth from "../Other/Auth";
import { get, post, put, remove } from "../Other/MainApi"

const isSignedIn = () => {
  return !!Auth.getToken();
}
const login = async (data) => {
  const response = await post("api/account/login", data)
    .then((response) => {
      if (response.data.token !== null) {
        Auth.setToken(response.data.token);
      }
    })
    .catch((error) => {
      console.log(error);
    });
  return response;
};
const register = async (data) => {
   return await post("api/account", data);
};
const userProfile = async () => {
  return await get("get");
};
const editProfile = async (data) => {
  return await put("edit", data);
};
const getById = async (data) => {
  return await get(`get/${data}`, data);
}
const getMyInfo = async () => {
  return await get("getMyInfo");
}
export { login, register, userProfile, editProfile, isSignedIn, getById, getMyInfo };
