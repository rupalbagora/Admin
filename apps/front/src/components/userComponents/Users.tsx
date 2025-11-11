import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  resetUserState,
} from "../../redux/Slice/useSliceForAdmin/userSlice";
import type { IUser } from "../../redux/types/usera.types";
import { Modal, Button, Table, Input, Tag, Avatar, Popconfirm, Card, Space, message } from "antd";
import { SearchOutlined, EditOutlined, DeleteOutlined, UserAddOutlined } from "@ant-design/icons";
import UserForm from "./UserForm";

const { Search } = Input;

const ManageUsers: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector((state) => state.users);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const req = dispatch(fetchUsers());
    return () => req.abort();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
      dispatch(resetUserState());
    }
  }, [error, dispatch]);

  // const filteredUsers = users
  // .filter((user) =>  user.role ==== "admin")
  // .filter((user)=>
  //   user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  // );

        const filteredUsers = users
  .filter((user) => user.role === "admin") 
  .filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );
   


  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
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

  const handleFormSubmit = async (values: Partial<IUser>) => {
    if (isEditMode && selectedUser) {
      const result = await dispatch(updateUser({ id: selectedUser._id, data: values }));
      if (updateUser.fulfilled.match(result)) {
        message.success("User updated successfully");
        setIsModalVisible(false);
      }
    } else {
      const result = await dispatch(createUser(values));
      if (createUser.fulfilled.match(result)) {
        message.success("User created successfully");
        dispatch(fetchUsers());
        setIsModalVisible(false);
      }
    }
  };

  const columns = [
    {
      title: "S.No",
      key: "sno",
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: "Image",
      key: "avatar",
      render: (_: any, record: IUser) => (
        <Avatar src={record.avatar as string} size={50}>
          {record.firstName?.[0]}
          {record.lastName?.[0]}
        </Avatar>
      ),
    },
    {
      title: "Admin",
      key: "admin",
      render: (_: any, record: IUser) => (
        <div>
          <div className="font-medium">
            {record.firstName} {record.lastName}
          </div>
          <div className="text-gray-500 text-sm">{record.email}</div>
        </div>
      ),
    },
    // {
    //   title: "Password",
    //   dataIndex: "password",
    //   key: "password",
    //   render: (password: string) => password || "-",
    // },
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
      title: "Expire Date",
      dataIndex: "expireDate",
      key: "expireDate",
      render: (date: string) => (date ? new Date(date).toLocaleDateString() : "-"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IUser) => (
        <Space size="middle">
          <Button
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          />
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
        title="Subadmin Management"
        extra={
          <Button
            className="bg-gray-700"
            type="primary"
            icon={<UserAddOutlined />}
            onClick={handleCreateUser}
          >
            Add Subadmin
          </Button>
        }
      >
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Search
            placeholder="Search users..."
            allowClear
            enterButton={<Button type="primary" icon={<SearchOutlined />} />}
            size="large"
            onSearch={handleSearch}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 bg-[#2523232c]"
          />
        </div>
        
        <Table
          // {JSON.stringify(fetchUsers)}
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

      <Modal
        title={isEditMode ? "Edit User" : "Create Subadmin"}
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
    </div>
  );
};

export default ManageUsers;
