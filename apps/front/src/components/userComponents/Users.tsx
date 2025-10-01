import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchUsers,
  fetchUserById,
  createUser,
  updateUser,
  deleteUser,
  promoteUser,
  demoteUser,
  resetUserState,
  filterUsers,
} from "../../redux/Slice/useSliceForAdmin/userSlice";
import type { IUser, UserRole } from "../../redux/types/usera.types";
import {
  Modal,
  Button,
  Table,
  Input,
  Select,
  message,
  Card,
  Space,
  Tag,
  Avatar,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
  EyeOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import UserForm from "./UserForm";
import { useActivePage } from "../../redux/Slice/activeStatus/hooks/useActivePage";
import SubscriptionForm from "../Subscription/SubscriptionForm";

const { Search } = Input;
const { Option } = Select;

const ManageUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSubscriptionModalVisible, setIsSubscriptionModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const { searchInput } = useActivePage();
  // Fetch users on component mount and when filters change
  useEffect(() => {
  const req = dispatch(fetchUsers());

  return () => {
    req.abort(); // cancel the request if still in progress
  };
}, [dispatch]);

  useEffect(() => {
    if (searchInput) {
      dispatch(filterUsers(searchInput));
    }
  }, [searchInput]);

  // Handle errors
  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(resetUserState());
    }
  }, [error, dispatch]);

  // Filter users based on search term and role
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user?.email?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user?.firstName?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user?.lastName?.toLowerCase().includes(searchTerm?.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // Pagination
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Handlers
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleViewUser = async (id: string) => {
    const result = await dispatch(fetchUserById(id));
    if (fetchUserById.fulfilled.match(result)) {
      setSelectedUser(result.payload);
      setIsDetailModalVisible(true);
    }
  };

  const handleSubscription = async (user:IUser ) => {
    setSelectedUser(user)
    setIsSubscriptionModalVisible(true);
    console.log("selected user for subscription",user)
  };

  const handleEditUser = (user: IUser) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setIsModalVisible(true);
  };

  const handleCreateUser = () => {
    setSelectedUser(null);
    setIsEditMode(false);
    setIsModalVisible(true);
  };

  const handleDeleteUser = async (id: string) => {
    const result = await dispatch(deleteUser(id));
    if (deleteUser.fulfilled.match(result)) {
      message.success("User deleted successfully");
    }
  };

  const handlePromoteUser = async (id: string) => {
    const result = await dispatch(promoteUser(id))
      .unwrap()
      .then(() => {
        dispatch(fetchUsers());
      });
    if (promoteUser.fulfilled.match(result)) {
      message.success("User promoted successfully");
    }
  };

  const handleDemoteUser = async (id: string) => {
    const result = await dispatch(demoteUser(id))
      .unwrap()
      .then(() => {
        dispatch(fetchUsers());
      });
    if (demoteUser.fulfilled.match(result)) {
      message.success("User demoted successfully");
    }
  };

  const handleFormSubmit = async (values: Partial<IUser>) => {
    if (isEditMode && selectedUser) {
      const result = await dispatch(
        updateUser({ id: selectedUser._id, data: values })
      );
      if (updateUser.fulfilled.match(result)) {
        message.success("User updated successfully");
        setIsModalVisible(false);
      }
    } else {
      const result = await dispatch(createUser(values));
      if (createUser.fulfilled.match(result)) {
        message.success("User created successfully");
        dispatch(fetchUsers())
        setIsModalVisible(false);
      }
    }
  };

  // Table columns
  const columns = [
    {
      title: "User",
      dataIndex: "firstName",
      key: "user",
      render: (_: any, record: IUser) => (
        <div className="flex items-center">
          <Avatar src={record.avatar as string} className="mr-3">
            {record.firstName?.[0]}
            {record.lastName?.[0]}
          </Avatar>
          <div>
            <div className="font-medium">
              {record.firstName} {record.lastName}
            </div>
            <div className="text-gray-500 text-sm">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: UserRole) => {
        const color =
          role === "superadmin" ? "red" : role === "admin" ? "blue" : "green";
        return (
          <Tag color={color} className="capitalize">
            {role}
          </Tag>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "isActive",
      key: "status",
      render: (isActive: boolean) => (
        <Tag color={isActive ? "green" : "red"}>
          {isActive ? "Active" : "Inactive"}
        </Tag>
      ),
    },
    {
      title: "Subscription",
      dataIndex: "subscriptionType",
      key: "subscription",
      render: (subscriptionType: string) => (
        <Tag className="capitalize">{subscriptionType || "None"}</Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IUser) => (
        <Space size="middle">
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewUser(record._id)}
          />
          <Button
            icon={<> i<EyeOutlined /></>}
            onClick={() => handleSubscription(record)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          />
          {record.role !== "superadmin" && (
            <>
              {record.role === "user" && (
                <Button
                  icon={<ArrowUpOutlined />}
                  onClick={() => handlePromoteUser(record._id)}
                />
              )}
              {record.role === "admin" && (
                <Button
                  icon={<ArrowDownOutlined />}
                  onClick={() => handleDemoteUser(record._id)}
                />
              )}
            </>
          )}
          <Popconfirm
            title="Are you sure to delete this user?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title="User Management"
        extra={
          <Button
            className="bg-gray-700"
            type="primary"
            icon={<UserAddOutlined />}
            onClick={handleCreateUser}
          >
            Add User
          </Button>
        }
      >
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Search
            placeholder="Search users..."
            allowClear
            enterButton={
              <Button
                type="primary"
                style={{
                  backgroundColor: "rgba(74, 85, 104, 1)", // your custom button color (e.g., green)
                  borderColor: "rgba(74, 85, 104, 1)",
                  color: "#fff",
                }}
                icon={<SearchOutlined />}
              />
            }
            size="large"
            onSearch={handleSearch}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 bg-[#2523232c]"
          />

          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={(value: UserRole | "all") => setRoleFilter(value)}
            size="large"
          >
            <Option value="all">All Roles</Option>
            <Option value="superadmin">Super Admin</Option>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </div>

        <Table
          columns={columns}
          dataSource={paginatedUsers}
          rowKey="_id"
          loading={loading}
          pagination={{
            current: currentPage,
            pageSize,
            total: filteredUsers.length,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50"],
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size || 10);
            },
          }}
        />
      </Card>

      {/* User Form Modal */}
      <Modal
        title={isEditMode ? "Edit User" : "Create User"}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
        width={800}
        destroyOnClose
      >
        <UserForm
          initialValues={selectedUser || undefined}
          onSubmit={handleFormSubmit}
          isEditMode={isEditMode}
          loading={loading}
        />
      </Modal>

      {/* User Detail Modal */}
      <Modal
        title="User Details"
        visible={isDetailModalVisible}
        onCancel={() => setIsDetailModalVisible(false)}
        footer={null}
        width={700}
      >
        {selectedUser && (
          <div className="space-y-4">
            <div className="flex items-center space-x-6">
              <Avatar src={selectedUser.avatar as string} size={100}>
                {selectedUser.firstName?.[0]}
                {selectedUser.lastName?.[0]}
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedUser.firstName} {selectedUser.lastName}
                </h2>
                <p className="text-gray-600">{selectedUser.email}</p>
                <div className="flex space-x-2 mt-2">
                  <Tag color={selectedUser.isActive ? "green" : "red"}>
                    {selectedUser.isActive ? "Active" : "Inactive"}
                  </Tag>
                  <Tag
                    color={
                      selectedUser.role === "superadmin"
                        ? "red"
                        : selectedUser.role === "admin"
                        ? "blue"
                        : "green"
                    }
                  >
                    {selectedUser.role}
                  </Tag>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div>
                <h3 className="font-semibold text-gray-700">
                  Basic Information
                </h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="text-gray-600">Phone:</span>{" "}
                    {selectedUser.phone || "-"}
                  </p>
                  <p>
                    <span className="text-gray-600">Joined:</span>{" "}
                    {new Date(selectedUser.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-700">Subscription</h3>
                <div className="mt-2 space-y-2">
                  <p>
                    <span className="text-gray-600">Type:</span>
                    <Tag className="ml-2 capitalize">
                      {selectedUser.subscriptionType || "None"}
                    </Tag>
                  </p>
                  <p>
                    <span className="text-gray-600">Status:</span>
                    <Tag className="ml-2 capitalize">
                      {selectedUser.subscriptionStatus || "-"}
                    </Tag>
                  </p>
                </div>
              </div>
            </div>

            {selectedUser.bio && (
              <div className="mt-4">
                <h3 className="font-semibold text-gray-700">Bio</h3>
                <p className="mt-1">{selectedUser.bio}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
      {

isSubscriptionModalVisible&&
        <SubscriptionForm 
        id={selectedUser?.subscription}
        userId={selectedUser?._id || ""}
        onClose={()=>{ setIsSubscriptionModalVisible(false) ;setSelectedUser(null)}}
        onSuccess={ ()=>{setIsSubscriptionModalVisible(false) ;setSelectedUser(null)}}/>
      }
    </div>
  );
};

export default ManageUsers;
