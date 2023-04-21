import { useCallback, useState } from "react";
import Descriptions from "antd/lib/descriptions";
import { observer } from "mobx-react-lite";

import { user } from "../store/User";
import ProfileDescription from "../components/Profile/ProfileDescription";

function Profile() {
  const [toggle, setToggle] = useState({
    name: false,
    email: false,
    phone: false,
  });
  const [userProfile, setUserProfile] = useState({ ...user.profile });

  const { updateProfile } = user;

  const handleChange = useCallback((name, value) => {
    console.log;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  });

  const handleSave = useCallback((name) => {
    updateProfile({
      [name]: userProfile[name],
    });
    toggleEdit(name);
  });

  const toggleEdit = (name) => {
    setToggle({
      ...toggle,
      [name]: !toggle[name],
    });
  };
  return (
    <>
      <h1>Welcome, {userProfile.name}</h1>
      <>
        <Descriptions
          bordered
          layout="vertical"
          column={3}
          style={{ margin: "2em 0" }}
        >
          <Descriptions.Item label="name">
            <ProfileDescription
              handleChange={handleChange}
              handleSave={handleSave}
              toggle={toggle}
              userProfile={userProfile}
              profileField="name"
              toggleEdit={toggleEdit}
              forwardRef
            />
          </Descriptions.Item>
          <Descriptions.Item label="email">
            <ProfileDescription
              handleChange={handleChange}
              userProfile={userProfile}
              toggle={toggle}
              handleSave={handleSave}
              toggleEdit={toggleEdit}
              profileField="email"
            />
          </Descriptions.Item>
          <Descriptions.Item label="phone">
            <ProfileDescription
              userProfile={userProfile}
              toggleEdit={toggleEdit}
              toggle={toggle}
              handleChange={handleChange}
              handleSave={handleSave}
              profileField="phone"
            />
          </Descriptions.Item>
        </Descriptions>
      </>
    </>
  );
}

export default observer(Profile);

{
  /* <Descriptions.Item label="Name">
            {toggle.name ? (
              <div style={inputWrapperStyle}>
                <Input
                  placeholder="name"
                  name="Name"
                  value={userProfile.name}
                  style={inputStyle}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
                <Button
                  type="link"
                  style={marginStyle}
                  onClick={(_) => handleSave("name")}
                >
                  <CheckOutlined />
                </Button>
                <Button
                  type="link"
                  onClick={(_) => toggleEdit("name")}
                  name="name"
                >
                  <CloseOutlined />
                </Button>
              </div>
            ) : (
              <>
                <span style={marginStyle}>{userProfile.name}</span>
                <Button
                  type="link"
                  onClick={(_) => toggleEdit("name")}
                  name="name"
                >
                  <EditOutlined /> Edit
                </Button>
              </>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Email">
            {toggle.email ? (
              <div inputWrapperStyle>
                <Input
                  placeholder="email"
                  name="Email"
                  value={userProfile.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  style={inputStyle}
                />
                <Button
                  type="link"
                  style={marginStyle}
                  onClick={(_) => handleSave("email")}
                >
                  <CheckOutlined />
                </Button>
                <Button
                  type="link"
                  onClick={(_) => toggleEdit("email")}
                  name="email"
                >
                  <CloseOutlined />
                </Button>
              </div>
            ) : (
              <>
                <span style={marginStyle}>{userProfile.email}</span>
                <Button
                  type="link"
                  onClick={(_) => toggleEdit("email")}
                  name="email"
                >
                  <EditOutlined /> Edit
                </Button>
              </>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Phone" name="phone">
            {toggle.phone ? (
              <div style={inputWrapperStyle}>
                <Input
                  placeholder="phone"
                  name="Phone"
                  value={userProfile.phone}
                  style={inputStyle}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
                <Button
                  type="link"
                  style={marginStyle}
                  onClick={(_) => handleSave("phone")}
                >
                  <CheckOutlined />
                </Button>
                <Button
                  type="link"
                  onClick={(_) => toggleEdit("phone")}
                  name="phone"
                >
                  <CloseOutlined />
                </Button>
              </div>
            ) : (
              <>
                <span style={marginStyle}>{userProfile.phone}</span>
                <Button
                  type="link"
                  onClick={(_) => toggleEdit("phone")}
                  name="phone"
                >
                  <EditOutlined /> Edit
                </Button>
              </>
            )}
          </Descriptions.Item> */
}
