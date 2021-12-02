import { Drawer, Typography, Avatar } from "antd";
import { useState, useEffect } from "react";
import { getById } from "../../../api/UserApi";

const UserProfileForm = ({ visibleModal, setVisibleModal, userId }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: ""
  });
  const { Title } = Typography;
  let id = userId;

  const UserProfile = async (id) => {
      await getById(id).then((res) => {
        let user = {
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            phoneNumber: res.data.phoneNumber,
            email: res.data.email,
          };
          setData(user);
          console.log(data);
      })
  }

  const onClose = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    UserProfile(id);
  }, [userId]);

  return (
    <Drawer
      title="User Profile"
      width={400}
      placement="right"
      onClose={onClose}
      visible={visibleModal}
    >
      <Avatar size={164} src="https://joeschmoe.io/api/v1/random" />
      <Title level={2}>{data.firstName + " " + data.lastName}</Title>
      <p>Mobile: {data.phoneNumber}</p>
      <p>Email: {data.email}</p>
    </Drawer>
  );
};
export default UserProfileForm;
