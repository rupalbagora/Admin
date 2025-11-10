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
import MalePackageForm, { type Package } from "./MalePackageForm";

const { Search } = Input;

const ManageMalePackages: React.FC = () => {
  const dispatch = useAppDispatch();
 // const [form] = Form.useForm();
  
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

  // ✅ Only male packages filter
  const malePackages = packages.filter((pkg: Package) => pkg.gender === "Male");

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);
      if (id) {
        await dispatch(updatePackage({ id, formData })).unwrap();
        message.success("✅ Male package updated successfully");
      } else {
        await dispatch(addPackage(formData)).unwrap();
        message.success("✅ Male package added successfully");
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
      message.success("🗑️ Male package deleted successfully");
      dispatch(fetchPackages());
    } catch (error: any) {
      message.error("Failed to delete male package");
    }
  };

  const handleModalOk = () => {
    const packageForm = document.querySelector('.male-package-form-submit-button');
    if (packageForm) {
      (packageForm as HTMLButtonElement).click();
    }
  };

  // ✅ Search only in male packages
  const filteredPackages = malePackages.filter((pkg: Package) =>
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
    //     <Tag color={gender === "Male" ? "blue" : "pink"}>
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
            title="Are you sure to delete this male package?"
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
      title={`Male Packages     (${malePackages.length} packages)`}
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
        placeholder="Search male packages by title..."
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
        locale={{ emptyText: "No male packages found" }}
      />

      <Modal
        title={editingPackage ? "Edit Male Package" : "Add Package"}
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
        <MalePackageForm
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

export default ManageMalePackages;