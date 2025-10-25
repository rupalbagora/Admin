// components/Catalog/UploadCatalog.tsx
import React, { useState } from "react";
import { Card, Table, Button, Input, Modal, Space, Rate, Tag } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CatalogForm from "./CatalogForm";

export interface Catalog {
  id: string;
  title: string;
  price: number;
  tag: string;
  rating: number;
  discount: number;
  image?: string;
  createdAt: string;
}

const { Search } = Input;

const UploadCatalog: React.FC = () => {
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // === Add catalog ===
  const handleAddCatalog = (cat: Catalog) => {
    setCatalogs((prev) => [...prev, cat]);
    setIsModalOpen(false);
  };

  // === Delete catalog ===
  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Catalog?",
      content: "Are you sure you want to delete this catalog item?",
      okText: "Yes",
      cancelText: "No",
      onOk: () => setCatalogs((prev) => prev.filter((c) => c.id !== id)),
    });
  };

  // === Filter catalogs ===
  const filteredCatalogs = catalogs.filter(
    (cat) =>
      cat.title.toLowerCase().includes(searchText.toLowerCase()) ||
      cat.tag.toLowerCase().includes(searchText.toLowerCase())
  );

  // === Table Columns ===
  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    {
      title: "Price (₹)",
      dataIndex: "price",
      key: "price",
      render: (value: number) => `₹${value}`,
    },
    {
      title: "Tag",
      dataIndex: "tag",
      key: "tag",
      render: (tag: string) => <Tag color="gold">{tag}</Tag>,
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
      render: (rating: number) => <Rate disabled value={rating} />,
    },
    {
      title: "Discount (%)",
      dataIndex: "discount",
      key: "discount",
      render: (value: number) => `${value}%`,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img: string) =>
        img ? (
          <img
            src={img}
            alt="catalog"
            style={{
              width: 60,
              height: 60,
              borderRadius: 8,
              objectFit: "cover",
            }}
          />
        ) : (
          "-"
        ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Catalog) => (
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
        title="Manage Catalog"
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => setIsModalOpen(true)}
            className="bg-gray-700"
          >
            Add Catalog
          </Button>
        }
      >
        {/* === Search === */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <Search
            placeholder="Search catalog..."
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
          dataSource={filteredCatalogs}
          rowKey="id"
          locale={{ emptyText: "No catalog added" }}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      {/* === Add Catalog Modal === */}
      <Modal
        title="Add Catalog"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
      >
        <CatalogForm onAddCatalog={handleAddCatalog} />
      </Modal>
    </div>
  );
};

export default UploadCatalog;
