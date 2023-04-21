import { observer } from "mobx-react-lite";
import Input from "antd/lib/input";
import Button from "antd/lib/button";
import EditOutlined from "@ant-design/icons/EditOutlined";
import CheckOutlined from "@ant-design/icons/CheckOutlined";
import CloseOutlined from "@ant-design/icons/CloseOutlined";

function ProfileDescription({
  profileField,
  handleChange,
  handleSave,
  toggleEdit,
  toggle,
  userProfile,
}) {
  const inputStyle = {
    maxWidth: "65%",
    marginRight: 10,
  };

  const inputWrapperStyle = {
    display: "flex",
  };

  const marginStyle = {
    marginRight: 10,
  };

  return (
    <>
      {toggle[profileField] ? (
        <div style={inputWrapperStyle}>
          <Input
            placeholder={profileField}
            name={profileField}
            value={userProfile[profileField]}
            onChange={(e) => handleChange(profileField, e.target.value)}
            style={inputStyle}
          />
          <Button
            type="link"
            style={marginStyle}
            onClick={(_) => handleSave(profileField)}
          >
            <CheckOutlined />
          </Button>
          <Button
            type="link"
            onClick={(_) => toggleEdit(profileField)}
            name={profileField}
          >
            <CloseOutlined />
          </Button>
        </div>
      ) : (
        <>
          <span style={marginStyle}>{userProfile[profileField]}</span>
          <Button
            type="link"
            onClick={(_) => toggleEdit(profileField)}
            name={profileField}
          >
            <EditOutlined /> Edit
          </Button>
        </>
      )}
    </>
  );
}

export default observer(ProfileDescription);
