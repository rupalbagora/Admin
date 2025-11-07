import { useState } from "react";
import { Home, User, Settings, Users,  X, CreditCard, Upload } from "lucide-react";
import { Outlet } from "react-router-dom";
import Sidebar from "../commonComp/SideBarr/SideBarr";
import Header from "../commonComp/Header/Header";
import RouteTracker from "../commonComp/RouteTracker/RouteTracker";
import { useAppDispatch } from "../redux/hooks";
import { search } from "../redux/Slice/activeStatus/activeStatusSlice";

const menuItems = [
  {
    name: "Dashboard",
    icon: <Home className="w-5 h-5" />,
    path: "AdminDeshboard",
  },
  // {
  //   name: "Users",
  //   icon: <User className="w-5 h-5" />,
  //   subItems: [
  //     {
  //       name: "All Users",
  //       icon: <User className="w-4 h-4" />,
  //       path: "/admin/users",
  //     },
  //     {
  //       name: "Roles",
  //       icon: <Settings className="w-4 h-4" />,
  //       path: "/admin/roles",
  //       badge: 3,
  //     },
  //   ],
  // },

 {
    name: "Appointment",
    icon: <Home className="w-5 h-5" />,
    path: "/admin/Appointment",
  },
    
     {
  name: "Gender",
  icon: <User className="w-5 h-5" />,
  subItems: [
    {
      name: "Male",
      icon: <User className="w-5 h-5" />,
      subItems: [
        {
          name: "Special Offers",
          icon: <User className="w-4 h-4" />,
          path: "/admin/male/special-offers",
        },
        {
          name: "Our Service",
          icon: <User className="w-4 h-4" />,
          path: "/admin/male/our-service",
        },
        {
          name: "Product",
          icon: <User className="w-4 h-4" />,
          subItems: [
            {
              name: "Products Details",
              icon: <User className="w-4 h-4" />,
              path: "/admin/male/products/details",
            },
            {
              name: "Categories",
              icon: <User className="w-4 h-4" />,
              path: "/admin/male/products/categories",
            },
          ],
        },
        {
          name: "Our Package",
          icon: <User className="w-4 h-4" />,
          path: "/admin/male/our-package",
        },
        {
          name: "Product Package",
          icon: <User className="w-4 h-4" />,
          path: "/admin/male/product-package",
        },
      ],
    },
    {
      name: "Female",
      icon: <User className="w-4 h-4" />,
      subItems: [
        {
          name: "Special Offers",
          icon: <User className="w-4 h-4" />,
          path: "/admin/female/special-offers",
        },
        {
          name: "Our Service",
          icon: <User className="w-4 h-4" />,
          path: "/admin/female/our-service",
        },
        {
          name: "Product",
          icon: <User className="w-4 h-4" />,
          subItems: [
            {
              name: "Products Details",
              icon: <User className="w-4 h-4" />,
              path: "/admin/female/products/details",
            },
            {
              name: "Categories",
              icon: <User className="w-4 h-4" />,
              path: "/admin/female/products/categories",
            },
          ],
        },
        {
          name: "Our Package",
          icon: <User className="w-4 h-4" />,
          path: "/admin/female/our-package",
        },
        {
          name: "Product Package",
          icon: <User className="w-4 h-4" />,
          path: "/admin/female/product-package",
        },
      ],
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
      name: "Documents",
      icon: <User className="w-4 h-4" />,
      subItems: [
        {
    name: "About Us",
    icon: <Home className="w-5 h-5" />,
    path: "/admin/About-Us",
  },
  {
    name: "Privacy Policy",
    icon: <Home className="w-5 h-5" />,
    path: "/admin/Privacy-Policy",
  },
  {
    name: "Terms & Conditions",
    icon: <Home className="w-5 h-5" />,
    path: "/admin/Terms-Conditions",
  },
      ],
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
      logo={<img src="/src/assets/logo.png" alt="Logo" style={{ height: "40px" }} />}

      
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
            // logo={<span>logo...</span>}
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
                {/* <span>logo...</span> */}
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
