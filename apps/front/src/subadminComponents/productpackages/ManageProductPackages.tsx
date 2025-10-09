import React, { useState } from "react";
import { Card, Table, Button, Input, Modal, Space, Tag } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import ProductPackageForm from "./ProductPackageForm";
import { type IProductPackage } from "../../redux/types/subadmintypes/ProductPackage.types";


const { Search } = Input;

const ManageProductPackages: React.FC = () => {
  const [packages, setPackages] = useState<IProductPackage[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // === Add product package ===
  const handleAddPackage = (pkg: IProductPackage) => {
    setPackages((prev) => [...prev, pkg]);
    setIsModalOpen(false);
  };
  // === Delete product package ===
  const handleDelete = (name: string) => {
    Modal.confirm({
      title: "Delete Product Package?",
      content: "Are you sure you want to delete this product package?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => setPackages((prev) => prev.filter((p) => p.name !== name)),
    });
  };

  // === Filter packages ===
  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchText.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchText.toLowerCase()) ||
      pkg.tagline.toLowerCase().includes(searchText.toLowerCase())
  );

  // === Table Columns ===
  const columns = [
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Tagline", dataIndex: "tagline", key: "tagline" },
    {
      title: "Products",
      dataIndex: "products",
      key: "products",
      render: (products: string[]) =>
        products?.map((prod, i) => (
          <Tag key={i} color="blue">
            {prod}
          </Tag>
        )),
    },
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
    { title: "Discount", dataIndex: "discount", key: "discount" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    { title: "Stock", dataIndex: "stock", key: "stock" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: IProductPackage) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.name)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6">
      <Card
        title="Manage Product Packages"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700"
          >
            Add Product Package
          </Button>
        }
      >
        {/* === Search === */}
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

        {/* === Table === */}
        <Table
          columns={columns}
          dataSource={filteredPackages}
          rowKey="name"
          locale={{ emptyText: "No product packages added" }}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* === Add Modal === */}
      <Modal
        title="Add Product Package"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <ProductPackageForm onAddPackage={handleAddPackage} />
      </Modal>
    </div>
  );
};

export default ManageProductPackages;
