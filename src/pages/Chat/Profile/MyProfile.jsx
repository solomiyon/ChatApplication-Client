import { Drawer, Typography, Avatar, Button } from "antd";
import { useState, useEffect } from "react";
import { getMyInfo } from "../../../api/UserApi";
import { EditOutlined } from "@ant-design/icons";
import EditProfileModal from "./EditProfileModal";

const MyProfileForm = ({
  visibleModal,
  setVisibleModal,
  onEdit
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
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
    });
  };

  const onClose = () => {
    setVisibleModal(false);
  };

  const showModal = () => {
    setShowEditModal(true);
    setVisibleModal(false);
  };

  useEffect(() => {
    MyProfile();
  }, []);

  return (
    <>
      <Drawer
        title="My Profile"
        width={400}
        placement="left"
        onClose={onClose}
        visible={visibleModal}
      >
        <Button
          onClick={() => {
            showModal();
          }}
        >
          <EditOutlined />
          Edit
        </Button>
        <Avatar size={164} src="https://joeschmoe.io/api/v1/random" />
        <Title level={2}>{data.firstName + " " + data.lastName}</Title>
        <p>Mobile: {data.phoneNumber}</p>
        <p>Email: {data.email}</p>
      </Drawer>
      <EditProfileModal
        profile={data}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        onEdit={onEdit}
        user={data}
      />
    </>
  );
};
export default MyProfileForm;
