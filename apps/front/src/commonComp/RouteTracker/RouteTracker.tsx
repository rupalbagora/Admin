import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updatePageStatus } from "../../redux/Slice/activeStatus/activeStatusSlice";

const RouteTracker = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updatePageStatus(location.pathname));
  }, [location.pathname, dispatch]);

  return null;
};

export default RouteTracker;
