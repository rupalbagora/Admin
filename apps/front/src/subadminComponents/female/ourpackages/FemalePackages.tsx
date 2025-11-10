import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Modal,
  message,
  Space,
  Tag,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchPackages,
  addPackage,
  updatePackage,
  deletePackage,
} from "../../../redux/Slice/package/packageSlice";
import FemalePackageForm, { type Package } from "./FemalePackageForm";

const { Search } = Input;

const ManageFemalePackages: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const { packages = [], loading = false, error = null } = useAppSelector((state: any) => state.packages);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState<Package | null>(null);
  const [searchText, setSearchText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  
  useEffect(() => {
    dispatch(fetchPackages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // ✅ Only female packages filter
  const femalePackages = packages.filter((pkg: Package) => pkg.gender === "Female");

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);
      if (id) {
        await dispatch(updatePackage({ id, formData })).unwrap();
        message.success("✅ Female package updated successfully");
      } else {
        await dispatch(addPackage(formData)).unwrap();
        message.success("✅ Female package added successfully");
      }
      setModalVisible(false);
      setEditingPackage(null);
      dispatch(fetchPackages());
    } catch (error: any) {
      message.error(error || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deletePackage(id)).unwrap();
      message.success("🗑️ Female package deleted successfully");
      dispatch(fetchPackages());
    } catch (error: any) {
      message.error("Failed to delete female package");
    }
  };

  const handleModalOk = () => {
    const packageForm = document.querySelector('.female-package-form-submit-button');
    if (packageForm) {
      (packageForm as HTMLButtonElement).click();
    }
  };

  // ✅ Search only in female packages
  const filteredPackages = femalePackages.filter((pkg: Package) =>
    pkg.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img: string) =>
        img ? (
          <img
            src={img}
            alt="package"
            width={60}
            height={60}
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          <Tag color="red">No Image</Tag>
        ),
    },
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title" 
    },
    { 
      title: "Price", 
      dataIndex: "price", 
      key: "price",
      render: (price: string) => `₹${price}`
    },
    { 
      title: "Services", 
      dataIndex: "services", 
      key: "services",
      ellipsis: true 
    },
    { 
      title: "About", 
      dataIndex: "about", 
      key: "about",
      ellipsis: true 
    },
    { 
      title: "Discount", 
      dataIndex: "discount", 
      key: "discount",
      render: (discount: string) => discount ? `₹${discount}` : '-'
    },
    { 
      title: "Rating", 
      dataIndex: "rating", 
      key: "rating",
      render: (rating: number) => rating ? `${rating}/5` : '-'
    },
    // {
    //   title: "Gender",
    //   dataIndex: "gender",
    //   key: "gender",
    //   render: (gender: string) => (
    //     <Tag color={gender === "Female" ? "pink" : "blue"}>
    //       {gender}
    //     </Tag>
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Package) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPackage(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this female package?"
            onConfirm={() => handleDelete(record._id!)}
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
    <Card
      title={`Female Packages     (${femalePackages.length} packages)`}
      extra={
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(fetchPackages())}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingPackage(null);
              setModalVisible(true);
            }}
          >
            Add Package
          </Button>
        </Space>
      }
    >
      <Search
        placeholder="Search female packages by title..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ marginBottom: 16, width: "50%" }}
      />

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredPackages}
        loading={loading}
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "No female packages found" }}
      />

      <Modal
        title={editingPackage ? "Edit Female Package" : "Add Package"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingPackage(null);
        }}
        onOk={handleModalOk}
        okText={editingPackage ? "Update" : "Add Package"}
        confirmLoading={submitLoading}
        width={700}
        destroyOnClose
      >
        <FemalePackageForm
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingPackage(null);
          }}
          onSubmit={handleAddOrUpdate}
          initialData={editingPackage}
          loading={submitLoading}
        />
      </Modal>
    </Card>
  );
};

export default ManageFemalePackages;