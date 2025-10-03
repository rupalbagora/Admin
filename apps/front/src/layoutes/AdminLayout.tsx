import { useState } from "react";
import { Home, User, Settings, Users,  X, CreditCard, Upload } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "../commonComp/SideBarr/SideBarr";
import Header from "../commonComp/Header/Header";
import RouteTracker from "../commonComp/RouteTracker/RouteTracker";
import { useAppDispatch } from "../redux/hooks";
import { search } from "../redux/Slice/activeStatus/activeStatusSlice";
const navItems = [
  {
    label: "Home",
    href: "/",
    icon: <Home size={16} />,
  },
  {
    label: "Products",
    href: "/admin/products",
    subItems: [
      { label: "All Products", href: "/products" },
      { label: "Categories", href: "/categories" },
    ],
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: <Users size={16} />,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: <Settings size={16} />,
  },
  {
    label: "Subscription Plan",
    href: "/admin/Subscription-plan",
    icon: <CreditCard	 size={16} />,
  },
];
 
const menuItems = [
  {
    name: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    path: "/",
  },
  {
    name: "Users",
    icon: <User className="w-5 h-5" />,
    subItems: [
      {
        name: "All Users",
        icon: <User className="w-4 h-4" />,
        path: "/admin/users",
      },
      {
        name: "Roles",
        icon: <Settings className="w-4 h-4" />,
        path: "/admin/roles",
        badge: 3,
      },
    ],
  },
  {
    name: "Upload Certificate",
    icon: <Upload className="w-5 h-5" />,
    path: "/admin/Upload-Certificate",
  }, 
   {
    name: "Youtube",
    icon: <Home className="w-5 h-5" />,
    path: "/admin/youtube",
  },
  {
    name: "Our Packages",
    icon: <Upload className="w-5 h-5" />,
    path: "/admin/Packages",
  }, 
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };
  
const dispatch = useAppDispatch();
  const onSearch = (query:string) => {
    dispatch(search(query))
  };
  return (
    <div className="h-[100vh] w-screen overflow-hidden flex flex-col bg-gray-50">
      <RouteTracker/>
      <Header
        logo={<span>logo.....</span>}
        navItems={navItems}
        // user={{
        //   name: "John Doe",
        //   email: "john@example.com",
        //   avatar: "/path/to/avatar.jpg",
        // }}
        onSearch={onSearch}
        onNotificationClick={() => console.log("Notifications clicked")}
        onMobileMenuToggle={() => setMobileSidebarOpen(!mobileSidebarOpen)}
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
