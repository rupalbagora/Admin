import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { Navigate } from "react-router-dom";
import { updateToken } from "../redux/Slice/authSlice";

interface Props {
  allowedRoles: string[];
  layout: React.ComponentType;
}

export const RoleBasedLayout: React.FC<Props> = ({
  allowedRoles,
  layout: Layout,
}) => {
  let { user, token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  // if(!token){
  //   token=localStorage.getItem("token")
  // }
console.log("i am here ")
  if (!user) {
    dispatch(updateToken());
  }
// setTimeout( ()=>{},2000)
  if (!token) return <Navigate to="/" replace />;
  if (user && !allowedRoles.includes(user.role))
    return <Navigate to="/unauthorized" replace />;

  return <Layout />;
};
