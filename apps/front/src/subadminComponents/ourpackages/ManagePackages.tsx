// components/Packages/ManagePackages.tsx
import React, { useState } from "react";
import { Card, Table, Button, Input, Modal, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import PackageForm from "./PackageForm";
import { Package } from "../../redux/types/subadmintypes/package.types";

const { Search } = Input;

const ManagePackages: React.FC = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add package
  const handleAddPackage = (pkg: Package) => {
    setPackages((prev) => [...prev, pkg]);
    setIsModalOpen(false);
  };

  // Delete package
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Package?",
      content: "Are you sure you want to delete this package?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => setPackages((prev) => prev.filter((p) => p.id !== id)),
    });
  };

  // Filter packages based on search
  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.name.toLowerCase().includes(searchText.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchText.toLowerCase())
  );

  // Table columns
  const columns = [
    { title: "Package Name", dataIndex: "name", key: "name" },
    { title: "Description", dataIndex: "description", key: "description" },
    { title: "Services", dataIndex: "services", key: "services" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Package) => (
        <Space>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
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
        title="Manage Packages"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700"
          >
            Add Package
          </Button>
        }
      >
        {/* Search Input */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Search
            placeholder="Search packages..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
            size="large"
            className="w-full md:w-1/2 bg-[#2523232c]"
          />
        </div>

        {/* Table */}
        <Table
          columns={columns}
          dataSource={filteredPackages}
          rowKey="id"
          locale={{ emptyText: "No packages added" }}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* Add Package Modal */}
      <Modal
        title="Add Package"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <PackageForm onAddPackage={handleAddPackage} />
      </Modal>
    </div>
  );
};

export default ManagePackages;
