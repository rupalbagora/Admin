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
  fetchProductPackages,
  addProductPackage,
  updateProductPackage,
  deleteProductPackage,
} from "../../../redux/Slice/productPackage/productPackageSlice";
import FemaleProductPackageForm, { type ProductPackage } from "./FemaleProductPackageForm";

const { Search } = Input;

const FemaleProductPackages: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const { packages = [], loading = false, error = null } = useAppSelector((state: any) => state.productPackages);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingPackage, setEditingPackage] = useState<ProductPackage | null>(null);
  const [searchText, setSearchText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  
  useEffect(() => {
    dispatch(fetchProductPackages());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // ✅ Filter only female product packages
  const femalePackages = packages.filter((pkg: ProductPackage) => pkg.gender === "Female");

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);
      if (id) {
        await dispatch(updateProductPackage({ id, formData })).unwrap();
        message.success("✅ Female product package updated successfully");
      } else {
        await dispatch(addProductPackage(formData)).unwrap();
        message.success("✅ Female product package added successfully");
      }
      setModalVisible(false);
      setEditingPackage(null);
      dispatch(fetchProductPackages());
    } catch (error: any) {
      message.error(error || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteProductPackage(id)).unwrap();
      message.success("🗑️ Female product package deleted successfully");
      dispatch(fetchProductPackages());
    } catch (error: any) {
      message.error("Failed to delete product package");
    }
  };

  const handleModalOk = () => {
    const packageForm = document.querySelector('.female-product-package-form-submit-button');
    if (packageForm) {
      (packageForm as HTMLButtonElement).click();
    }
  };

  const filteredPackages = femalePackages.filter((pkg: ProductPackage) =>
    pkg.name.toLowerCase().includes(searchText.toLowerCase()) ||
    pkg.description?.toLowerCase().includes(searchText.toLowerCase()) ||
    pkg.offers?.toLowerCase().includes(searchText.toLowerCase())
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
            alt="product package"
            width={60}
            height={60}
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          <Tag color="red">No Image</Tag>
        ),
    },
    { 
      title: "Name", 
      dataIndex: "name", 
      key: "name" 
    },
    { 
      title: "Price", 
      dataIndex: "price", 
      key: "price",
      render: (price: number) => `₹${price}`
    },
    { 
      title: "Description", 
      dataIndex: "description", 
      key: "description",
      ellipsis: true 
    },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: string[]) => (
        <div style={{ maxWidth: 200 }}>
          {items?.slice(0, 2).map((item, index) => (
            <div key={index} style={{ fontSize: '12px' }}>• {item}</div>
          ))}
          {items?.length > 2 && <div style={{ fontSize: '12px', color: '#999' }}>+{items.length - 2} more</div>}
        </div>
      ),
    },
    { 
      title: "Offers", 
      dataIndex: "offers", 
      key: "offers",
      ellipsis: true,
      render: (offers: string) => offers || '-'
    },
    // {
    //   title: "Gender",
    //   dataIndex: "gender",
    //   key: "gender",
    //   render: (gender: string) => (
    //     <Tag icon={<WomanOutlined />} color="pink">
    //       {gender}
    //     </Tag>
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: ProductPackage) => (
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
            title="Are you sure to delete this female product package?"
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
      title={
        <span>
          {/* <WomanOutlined style={{ marginRight: 8 }} /> */}
          Female Product Package &nbsp; ({femalePackages.length} packages)
        </span>
      }
      extra={
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(fetchProductPackages())}
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
        placeholder="Search female product packages..."
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
        locale={{ emptyText: "No female product packages found" }}
      />

      <Modal
        title={editingPackage ? "Edit Female Product Package" : "Add Product Package"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingPackage(null);
        }}
        onOk={handleModalOk}
        okText={editingPackage ? "Update" : "Add Product Package"}
        confirmLoading={submitLoading}
        width={700}
        destroyOnClose
      >
        <FemaleProductPackageForm
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

export default FemaleProductPackages;