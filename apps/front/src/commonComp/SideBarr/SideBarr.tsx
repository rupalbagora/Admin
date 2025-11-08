import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

// Type definitions
export interface MenuItem {
  name: string;
  icon: React.ReactNode;
  path?: string;
  subItems?: MenuItem[];
  SubProduct?: MenuItem[]; // ✅ Added nested sub-menu support
  badge?: string | number;
  disabled?: boolean;
}

interface SidebarProps {
  menuItems: MenuItem[];
  logo?: React.ReactNode;
  version?: string;
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  subItemClassName?: string;
  activeSubItemClassName?: string;
  collapsed?: boolean;
  onToggle?: () => void;
  isMobile?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  menuItems,
  logo = <h1 className="text-xl font-bold text-white">MyApp</h1>,
  version = 'v1.0.0',
  className = 'h-full bg-gray-900 text-gray-200 flex flex-col border-r border-gray-800 transition-all duration-300',
  itemClassName = 'flex items-center p-3 rounded-lg transition-colors hover:bg-gray-800 hover:text-white',
  activeItemClassName = 'bg-blue-600 text-white',
  subItemClassName = 'flex items-center p-2 rounded-lg text-sm transition-colors hover:text-white text-gray-400',
  activeSubItemClassName = 'text-blue-400 font-medium',
  collapsed = false,
  onToggle,
}) => {
  const { pathname } = useLocation();
  const [expandedMenus, setExpandedMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (name: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const isActive = (path?: string) => path && pathname.startsWith(path);

  // ✅ Recursive function that supports both subItems and SubProduct
  const renderMenuItems = (items: MenuItem[], level = 0) => {
    return items.map(item => {
      const hasChildren = item.subItems?.length || item.SubProduct?.length;

      return (
        <li key={item.name}>
          {item.path && !hasChildren ? (
            <Link
              to={item.disabled ? '#' : item.path}
              className={`${itemClassName} ${isActive(item.path) ? activeItemClassName : ''} ${
                item.disabled ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              title={collapsed ? item.name : undefined}
              style={{ paddingLeft: `${level * 16 + 12}px` }}
            >
              <span className={`${collapsed ? 'mx-auto' : 'mr-3'}`}>{item.icon}</span>
              {!collapsed && <span className="font-medium">{item.name}</span>}
              {!collapsed && item.badge && (
                <span className="ml-auto bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
          ) : (
            <div>
              <button
                onClick={() => !item.disabled && toggleMenu(item.name)}
                disabled={item.disabled}
                className={`${itemClassName} w-full text-left flex ${
                  collapsed ? 'flex-col items-center' : 'justify-between'
                } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''} ${
                  expandedMenus[item.name] ? 'bg-gray-800 text-white' : ''
                }`}
                title={collapsed ? item.name : undefined}
                style={{ paddingLeft: `${level * 16 + 12}px` }}
              >
                <div className={`flex ${collapsed ? 'flex-col items-center' : ''}`}>
                  <span className={`${collapsed ? 'mx-auto' : 'mr-3'}`}>{item.icon}</span>
                  {!collapsed && <span className="font-medium">{item.name}</span>}
                </div>
                {!collapsed && hasChildren && (
                  expandedMenus[item.name] ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )
                )}
                {!collapsed && item.badge && (
                  <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>

              {!collapsed && hasChildren && expandedMenus[item.name] && (
                <ul className="mt-1 space-y-1">
                  {/* ✅ Recursively render both subItems and SubProduct */}
                  {item.subItems && renderMenuItems(item.subItems, level + 1)}
                  {item.SubProduct && renderMenuItems(item.SubProduct, level + 1)}
                </ul>
              )}
            </div>
          )}
        </li>
      );
    });
  };

  return (
    <div className={`${className} ${collapsed ? 'w-20' : 'w-64'}`}>
      <div
        className={`p-4 border-b border-gray-800 flex ${
          collapsed ? 'justify-center' : 'justify-between'
        } items-center`}
      >
        {!collapsed && logo}
        {onToggle && (
          <button onClick={onToggle} className="text-gray-400 hover:text-white focus:outline-none">
            {collapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        )}
      </div>

      <nav className="flex-1 overflow-y-auto p-2">
        <ul className="space-y-1">{renderMenuItems(menuItems)}</ul>
      </nav>

      {!collapsed && version && (
        <div className="p-4 border-t border-gray-800">
          <div className="text-sm text-gray-400">{version}</div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
