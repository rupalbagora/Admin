import React, { useEffect, useState } from "react";
import { Card, Table, Button, Input, Modal, Space, message, Spin } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import ProductPackageForm from "./ProductPackageForm";
import  { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";
import { fetchProductPackages, deleteProductPackage } from "../../redux/Slice/productPackage/productPackageSlice";

const { Search } = Input;

const ManageProductPackages: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { packages, loading } = useSelector((state: RootState) => state.productPackages);

  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<any>(null);

  useEffect(() => {
    dispatch(fetchProductPackages());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Product Package?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await dispatch(deleteProductPackage(id)).unwrap();
          message.success("Package deleted successfully");
        } catch {
          message.error("Failed to delete package");
        }
      },
    });
  };

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchText.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchText.toLowerCase()) ||
      pkg.tagline.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    // { title: "Tagline", dataIndex: "tagline", key: "tagline" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Items",
      dataIndex: "items",
      key: "items",
      render: (items: string[]) => (
        <ul className="list-disc pl-4">
          {items.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      ),
    },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Offers", dataIndex: "offers", key: "offers" },
    { title: "Usage", dataIndex: "usage", key: "usage" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image: string) =>
        image ? <img src={image} alt="Package" className="w-16 h-16 object-cover" /> : "No image",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingPackage(record);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => handleDelete(record._id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingPackage(null);
              setIsModalOpen(true);
            }}
            className="bg-gray-700"
          >
            Add Product Package
          </Button>
        }
      >
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Search
            placeholder="Search product packages..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            size="large"
            className="w-full md:w-1/2 bg-[#2523232c]"
          />
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spin size="large" />
          </div>
        ) : (
          <Table
            columns={columns}
            dataSource={filteredPackages}
            rowKey="_id"
            loading={loading}
            locale={{ emptyText: "No product packages added" }}
            pagination={{ pageSize: 10 }}
          />
        )}
      </Card>

      <Modal
        title={editingPackage ? "Edit Product Package" : "Add Product Package"}
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <ProductPackageForm
          packageToEdit={editingPackage}
          onSuccess={() => {
            setIsModalOpen(false);
            dispatch(fetchProductPackages());
          }}
        />
      </Modal>
    </div>
  );
};

export default ManageProductPackages;
