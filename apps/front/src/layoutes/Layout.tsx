import { useState } from "react";
import { Home,User, Settings, X } from "lucide-react"; // removed User, Users, CreditCard
import { Outlet } from "react-router-dom";
import Sidebar from "../commonComp/SideBarr/SideBarr";
import Header from "../commonComp/Header/Header";
import RouteTracker from "../commonComp/RouteTracker/RouteTracker";
// import { useAppDispatch } from "../redux/hooks";
// import { search } from "../redux/Slice/activeStatus/activeStatusSlice";



const menuItems = [
  // {
  //   name: "Dashboard",
  //   icon: <Home className="w-5 h-5" />,
  //   path: "/dashboard",
  // },
  {
    name: "Subadmins",
    icon: <User className="w-5 h-5" />,
     path: "/super-admin/users"
    // subItems: [
      // {
      //   name: "",
      //   icon: <User className="w-4 h-4" />,
      //   path: "/super-admin/users",
      // },
      // {
      //   name: "Roles",
      //   icon: <Settings className="w-4 h-4" />,
      //   path: "/roles",
      //   badge: 3,
      // },
    // ],
  },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  // const dispatch = useAppDispatch();
  // const onSearch = (query:string) => {
  //   dispatch(search(query))
  // };

  return (
    <div className="h-[100vh] w-screen overflow-hidden flex flex-col bg-gray-50">
      <RouteTracker />
      <Header
       
        // onSearch={onSearch}
        // onNotificationClick={() => console.log("Notifications clicked")}
        // onMobileMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <div
          className={`hidden md:block transition-all duration-300 ease-in-out ${
            sidebarOpen ? "w-64" : "w-20"
          }`}
        >
          <Sidebar
            menuItems={menuItems}
            logo={<span>logo...</span>}
            version="v2.1.0"
            activeItemClassName="bg-indigo-600 text-white"
            collapsed={!sidebarOpen}
            onToggle={toggleSidebar}
          />
        </div>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="fixed inset-0 z-40 md:hidden">
            <div
              className="absolute inset-0 bg-gray-600 bg-opacity-75"
              onClick={toggleMobileSidebar}
            ></div>
            <div className="relative flex flex-col w-64 h-full bg-gray-800">
              <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <span>logo...</span>
                <button
                  onClick={toggleMobileSidebar}
                  className="p-1 rounded-md text-gray-400 hover:text-white"
                >
                  <X size={24} />
                </button>
              </div>
              <Sidebar
                menuItems={menuItems}
                activeItemClassName="bg-indigo-600 text-white"
                isMobile
              />
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main
          className={`flex-1 overflow-auto transition-all duration-300 ${
            sidebarOpen ? "ml-0" : "ml-0"
          }`}
        >
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
