import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateToken } from "../../redux/Slice/authSlice";

const DashboardRedirect: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, loading } = useAppSelector((state) => state.auth);

  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("Checking your access...");

  useEffect(() => {
    if (!user) {
      dispatch(updateToken());
    }
  }, [user, dispatch]);
  
  useEffect(() => {
    if (loading) return;

    let timeout: NodeJS.Timeout;

    if (!user) {
      setMessage("No user detected. Redirecting to login...");
      timeout = setTimeout(() => navigate("/login", { replace: true }), 2000);
    } else if (
      (user.role === "admin" || user.role === "staff") &&
      !user.isActive
    ) {
      setMessage("Your subscription is inactive. Please contact support.");
      setIsLoading(false);
    } else {
      setMessage(`Redirecting to your ${user.role} dashboard...`);
      timeout = setTimeout(() => {
        switch (user.role) {
          case "superadmin":
            navigate("/super-admin", { replace: true });
            break;
          case "admin":
            navigate("/admin", { replace: true });
            break;
          case "user":
            navigate("/user", { replace: true });
            break;
          case "staff":
            navigate("/staff", { replace: true });
            break;
          case "student":
            navigate("/student", { replace: true });
            break;
          default:
            navigate("/unauthorized", { replace: true });
            break;
        }
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center">
              {isLoading ? (
                <Loader2 className="h-8 w-8 text-gray-600 animate-spin" />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gray-600 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs font-bold">
              {user?.role ? user.role.charAt(0).toUpperCase() : "?"}
            </div>
          </div>

          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">{message}</h2>
            <p className="text-gray-500">
              {isLoading
                ? "Please wait while we verify your credentials"
                : !user?.isActive
                ? "Your account is inactive. Please contact support."
                : `Redirecting to your ${user?.role || ""} dashboard...`}
            </p>
          </div>

          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className={`bg-gray-600 h-2.5 rounded-full transition-all duration-1000 ${
                isLoading ? "w-3/4" : "w-full"
              }`}
            ></div>
          </div>
        </div>
      </div>

      <p className="mt-8 text-sm text-gray-500 text-center">
        Having trouble?{" "}
        <a href="#" className="text-gray-600 hover:underline">
          Contact support
        </a>
      </p>
    </div>
  );
};

export default DashboardRedirect;
