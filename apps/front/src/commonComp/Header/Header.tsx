import React, { useState, useEffect, useRef } from "react";
import { Menu, X, Search, Bell, User, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/Slice/authSlice";
import {useNavigate} from "react-router-dom";

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  subItems?: NavItem[];
}

// interface UserProfile {
//   name: string;
//   avatar?: string;
//   email?: string;
//   role?: string;
// }

interface HeaderProps {
  logo?: React.ReactNode;
  navItems?: NavItem[];
  // user?: UserProfile;
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  onProfileClick?: () => void;
  className?: string;
  mobileMenuOpen?: boolean;
  onMobileMenuToggle?: (open: boolean) => void;
  showSearch?: boolean;
  notificationCount?: number;
  activePath?: string;
  theam?: {
    bg: string;
    text: string;
    hover: string;
  };
}

const Header: React.FC<HeaderProps> = ({
  logo = <span className="text-xl font-bold text-white">Logo</span>,
  navItems = [],
  // user,
  onSearch,
  onNotificationClick,
  onProfileClick,
  className = "",
  mobileMenuOpen = false,
  onMobileMenuToggle,
  showSearch = true,
  notificationCount = 0,
  activePath,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSubMenu, setActiveSubMenu] = useState<string | null>(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
const navigate = useNavigate();
  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search when search icon is clicked
  const focusSearch = () => {
    if (searchRef.current) {
      searchRef.current.focus();
      setSearchFocused(true);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch?.(value);
  };

  const isActive = (path: string) => activePath?.startsWith(path);

  return (
    <header
      className={`bg-gray-900 text-white shadow-md sticky top-0 z-50 ${className}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            {onMobileMenuToggle && (
              <button
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
                onClick={() => onMobileMenuToggle?.(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            )}
            <div className="flex-shrink-0">{logo}</div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <div key={item.label} className="relative">
                <Link
                  to={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? "bg-gray-800 text-white"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onMouseEnter={() =>
                    item.subItems && setActiveSubMenu(item.label)
                  }
                  onMouseLeave={() => item.subItems && setActiveSubMenu(null)}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                  {item.subItems && (
                    <ChevronDown
                      className={`ml-1 h-4 w-4 transition-transform ${
                        activeSubMenu === item.label ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>

                {item.subItems && activeSubMenu === item.label && (
                  <div
                    className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-700 z-10"
                    onMouseEnter={() => setActiveSubMenu(item.label)}
                    onMouseLeave={() => setActiveSubMenu(null)}
                  >
                    <div className="py-1">
                      {item.subItems.map((subItem) => (
                        <Link
                          key={subItem.label}
                          to={subItem.href}
                          className={`block px-4 py-2 text-sm ${
                            isActive(subItem.href)
                              ? "bg-gray-700 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white"
                          }`}
                        >
                          {subItem.icon && (
                            <span className="mr-2">{subItem.icon}</span>
                          )}
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and User Controls */}
          <div className="flex items-center space-x-3">
            {showSearch && (
              <div
                className={`relative transition-all duration-200 ${
                  searchFocused ? "w-64" : "w-40"
                }`}
              >
                <div
                  className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-pointer"
                  onClick={focusSearch}
                >
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  ref={searchRef}
                  type="text"
                  placeholder="Search..."
                  className="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                />
              </div>
            )}

            {onNotificationClick && (
              <button
                className="p-1 rounded-full text-gray-400 hover:text-white focus:outline-none relative"
                onClick={onNotificationClick}
                aria-label="Notifications"
              >
                <Bell size={20} />
                {notificationCount > 0 && (
                  <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-gray-900"></span>
                )}
              </button>
            )}

            {user && (
              <div className="relative" ref={userMenuRef}>
                <button
                  className="flex items-center space-x-2 focus:outline-none"
                  onClick={() => {
                    setUserMenuOpen(!userMenuOpen);
                    onProfileClick?.();
                  }}
                  aria-label="User menu"
                >
                  {user.avatar ? (
                    <img
                      className="h-8 w-8 rounded-full"
                      src={user.avatar}
                      alt={user.firstName}
                    />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-gray-700 flex items-center justify-center">
                      <User size={16} />
                    </div>
                  )}
                  <span className="hidden md:inline text-sm font-medium">
                    {user.firstName}
                  </span>
                  <ChevronDown
                    className={`hidden md:inline h-4 w-4 transition-transform ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* User Dropdown */}
                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 ring-1 ring-gray-700 z-10">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-300 border-b border-gray-700">
                        <div className="font-medium">{user.firstName}</div>
                        <div className="text-xs text-gray-400">
                          {user.email}
                        </div>
                        {user.role && (
                          <div className="text-xs text-blue-400 mt-1">
                            {user.role}
                          </div>
                        )}
                      </div>
                      <Link
                        to={`${
                          user.role.toLocaleLowerCase() ===
                          "superadmin".toLocaleLowerCase()
                            ? "/super-admin/profile"
                            : `/${user.role}/profile`
                        }`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Your Profile
                      </Link>
                      <Link
                        to={`${
                          user.role.toLocaleLowerCase() ===
                          "superadmin".toLocaleLowerCase()
                            ? "/super-admin/settings"
                            : `/${user.role}/settings`
                        }`}
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                      >
                        Settings
                      </Link>
                      {/* <Link
                        to="/logout"
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 border-t border-gray-700"
                      >
                        <span
                          onClick={() => {
                            dispatch(logout());
                          }}
                        >
                          Sign out
                        </span>
                      </Link> */}
                      <button
  onClick={() => navigate("/login")}
  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 border-t border-gray-700"
>
  Sign out
</button>

                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.href)
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center">
                    {item.icon && <span className="mr-2">{item.icon}</span>}
                    {item.label}
                  </div>
                </Link>
                {item.subItems && (
                  <div className="pl-6">
                    {item.subItems.map((subItem) => (
                      <Link
                        key={subItem.label}
                        to={subItem.href}
                        className={`block px-3 py-2 rounded-md text-sm font-medium ${
                          isActive(subItem.href)
                            ? "bg-gray-700 text-white"
                            : "text-gray-400 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        <div className="flex items-center">
                          {subItem.icon && (
                            <span className="mr-2">{subItem.icon}</span>
                          )}
                          {subItem.label}
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {user && (
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                {user.avatar ? (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.avatar}
                    alt={user.firstName}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                    <User size={20} />
                  </div>
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-white">
                    {user.firstName}
                  </div>
                  <div className="text-sm font-medium text-gray-400">
                    {user.email}
                  </div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Your Profile
                </Link>
                <Link
                  to="/settings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  Settings
                </Link>
                {/* <Link
                  onClick={() => {}}
                  to="/logout"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 border-t border-gray-700"
                >
                  Sign out
                </Link> */}
                <button
  onClick={() => navigate("/login")}
  className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 border-t border-gray-700"
>
  Sign out
</button>

              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
