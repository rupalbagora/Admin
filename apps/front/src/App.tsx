import "./index.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { useEffect } from "react";
import { useAppDispatch } from "./redux/hooks";
import { updateToken } from "./redux/Slice/authSlice";
// import { App } from "antd";

export default function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(updateToken());
  },[]);
  return <RouterProvider router={router} />;
}



