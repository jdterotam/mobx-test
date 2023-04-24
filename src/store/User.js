import { notification } from "antd";
import { observable, makeObservable, action, autorun } from "mobx";
import { v4 as uuidv4 } from "uuid";

const initialProfile = {
  name: "",
  email: "",
  phone: "",
  password: "",
  token: null,
};

export default class User {
  //@observables
  users = [];
  profile = initialProfile;

  constructor() {
    this.users = localStorage.getItem("users")
      ? JSON.parse(localStorage.getItem("users"))
      : [];

    this.profile = localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : initialProfile;

    makeObservable(this, {
      users: observable.ref,
      profile: observable.ref,
      register: action,
      updateProfile: action,
      login: action,
      logout: action,
    });
  }

  //@action
  register = (payload) => {
    let returnObj = {
      data: null,
      error: null,
    };
    const user = this.users.filter((u) => u.email === payload.email);
    // if email is already with any existing user, throw error
    if (user.length > 0) {
      returnObj = {
        data: null,
        error: "Email already registered, please try with new one",
      };
    } else {
      // All good, register the user
      this.users.push({ ...initialProfile, ...payload, id: uuidv4() });
      returnObj = { data: { ...initialProfile, ...payload }, error: null };

      notification.open({
        message: "Registered successfully",
      });
    }

    return returnObj;
  };

  //@action
  login = ({ email, password }) => {
    let returnObj = {
      data: null,
      error: null,
    };
    const user = this.users.filter((u) => u.email === email);

    // If user !found with email, throw error
    if (user.length === 0) {
      returnObj = {
        data: null,
        error: "Invalid Credentials",
      };

      return returnObj;
    }
    const selectedUserProfile = { ...user[0] };
    // If user found and passwords does not match, throw error
    if (selectedUserProfile.password !== password) {
      returnObj = {
        data: null,
        error: "Invalid Credentials",
      };
    }

    // All clear, generate token and set the session
    //TODO: add jwt here
    this.profile = { ...selectedUserProfile };

    notification.open({
      message: "Logged in successfully",
    });
    return {
      data: this.profile,
      error: null,
    };
  };

  //@action
  logout = () => {
    try {
      this.profile = initialProfile;
      notification.open({
        message: "Logged out successfully",
      });
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };

  //@action
  updateProfile = (payload) => {
    if (Object.keys(payload).filter((p) => p === "email").length > 0) {
      if (this.users.filter((u) => u.email === payload.email).length > 0) {
        notification.open({
          message: "Email already registered, please try with new one",
        });

        return {
          data: null,
          error: "Email is already registered, please try with new one",
        };
      } else {
        this.profile = { ...this.profile, ...payload };
        return {
          data: this.profile,
          error: null,
        };
      }
    } else {
      this.profile = { ...this.profile, ...payload };
      notification.open({
        message: "Profile updated successfully",
      });
      return {
        data: this.profile,
        error: null,
      };
    }
  };
}
export const user = new User();

autorun((_) => {
  user.users.length;
  localStorage.setItem("users", JSON.stringify(user.users));
  localStorage.setItem("profile", JSON.stringify(user.profile));
});
