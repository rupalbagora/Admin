import React, { useEffect } from "react";
import { useAppDispatch } from "../../redux/hooks";
// import { updateProfile } from "../../redux/Slice/authSlice";
// import AvatarUpload from "./AvatarUpload";
import ProfileEdit from "./ProfileEdit";
import { getUserProfile } from "../../redux/Slice/authSlice";

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  // const {user}=useAppSelector((state)=>state.auth)
  
  useEffect(()=>{
dispatch(getUserProfile())    
  },[])
  // const handleUpload = async (file: File) => {
  //   const formData = new FormData();
  //   formData.append("avatar", file);
  //   await dispatch(updateProfile(formData));
  // };

  return (
    <div className="">
      
      {/* <AvatarUpload 
        currentAvatar={user?.avatar as string}
        onUpload={handleUpload}
      /> */}
<ProfileEdit/>

      
    </div>
  );
};
export default ProfilePage