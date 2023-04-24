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
    setUserProfile((prev) => {
      return {
        ...userProfile,
        [name]: value,
      };
    });
  });

  const handleSave = useCallback((name) => {
    const data = updateProfile({
      [name]: userProfile[name],
    });
    data.error &&
      setUserProfile({ ...JSON.parse(localStorage.getItem("profile")) });
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
