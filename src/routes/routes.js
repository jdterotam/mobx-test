import { lazy } from "react";

const Dashboard = lazy((_) => import("../pages/Dashboard"));
const Profile = lazy((_) => import("../pages/Profile"));
const Login = lazy((_) => import("../pages/Login"));
const Register = lazy((_) => import("../pages/Register"));
const ForgotPassword = lazy((_) => import("../pages/ForgotPassword"));
const ResetPassword = lazy((_) => import("../pages/ResetPassword"));
const Items = lazy((_) => import("../pages/Items"));
const AddItem = lazy((_) => import("../pages/AddItem"));
const ItemDetails = lazy((_) => import("../pages/ItemDetails"));
const Landing = lazy((_) => import("../pages/Landing"));
const NotFound = lazy((_) => import("../pages/NotFound"));

export const routes = [
  {
    key: "LANDING",
    label: "Landing",
    path: "",
    isPrivate: false,
    component: Landing,
  },
  {
    key: "DASHBOARD",
    label: "Dashboard",
    path: "dashboard",
    isPrivate: true,
    component: Dashboard,
  },
  {
    key: "LOGIN",
    label: "Login",
    path: "login",
    isPrivate: false,
    component: Login,
  },
  {
    key: "REGISTER",
    label: "Register",
    path: "register",
    isPrivate: false,
    component: Register,
  },
  {
    key: "FORGOT_PASSWORD",
    label: "Forgot Password",
    path: "forgot_password",
    isPrivate: false,
    component: ForgotPassword,
  },
  {
    key: "RESET_PASSWORD",
    label: "Reset Password",
    path: "reset_password",
    isPrivate: false,
    component: ResetPassword,
  },
  {
    key: "ITEMS",
    label: "Items",
    path: "items",
    isPrivate: true,
    component: Items,
  },
  {
    key: "ADD_ITEM",
    label: "Add Item",
    path: "items/add",
    isPrivate: true,
    component: AddItem,
  },
  {
    key: "ITEM_DETAILS",
    label: "Item Details",
    path: "items/:id",
    isPrivate: true,
    component: ItemDetails,
  },
  {
    key: "PROFILE",
    label: "Profile",
    path: ":id",
    isPrivate: true,
    component: Profile,
  },
  {
    key: "NOT_FOUND",
    label: "Not Found",
    path: "*",
    isPrivate: false,
    component: NotFound,
  },
];
