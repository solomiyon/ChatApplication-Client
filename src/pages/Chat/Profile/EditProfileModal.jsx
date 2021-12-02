import React from "react";
import { Drawer } from "antd";
import FormEditProfile from "./FormEditModal";

const EditProfileModal = ({
  record,
  showEditModal,
  setShowEditModal,
  onEdit,
  decision,
  user
}) => {
  const handleCancel = () => {
    setShowEditModal(false);
  };

  return (
    <Drawer
      width="400"
      title="Edit My Profile"
      placement="left"
      visible={showEditModal}
      onClose={handleCancel}
      footer={null}
    >
      <FormEditProfile
        record={record}
        decision={decision}
        setShowEditModal={setShowEditModal}
        onEdit={onEdit}
        user={user}
      />
    </Drawer>
  );
};

export default EditProfileModal;
