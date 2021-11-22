import { Drawer, Descriptions, Typography, Avatar } from "antd";
import { useState, useEffect } from "react";
import { getMyInfo } from "../../api/UserApi";

const MyProfileForm = ({ visibleModal, setVisibleModal }) => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: ""
  });
  const { Title } = Typography;

  const MyProfile = async () => {
    await getMyInfo().then((res) => {
      let user = {
        firstName: res.data.firstName,
        lastName: res.data.lastName,
        phoneNumber: res.data.phoneNumber,
        email: res.data.email,
      };
      setData(user);
      console.log(data);
    });
  };
  const onClose = () => {
    setVisibleModal(false);
  };

  useEffect(() => {
    MyProfile();
  }, []);

  return (
    <Drawer
      title="My Profile"
      width={400}
      placement="left"
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
export default MyProfileForm;
