import React, { useState } from "react";
import { Card, Table, Input, Button, Modal, Tag } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoriesForm from "./CategoriesForm";

export interface Category {
  id: string;
  categoryName: string;
  price: number;
  discount: number;
  rating: number;
  tags: string[];
  image: string;
  uploadedAt: Date;
}

const UploadCategories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddCategory = (category: Category) => {
    setCategories([...categories, category]);
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete this category?",
      onOk: () => setCategories(categories.filter((c) => c.id !== id)),
    });
  };

  const filteredCategories = categories.filter(
    (c) =>
      c.categoryName.toLowerCase().includes(searchText.toLowerCase()) ||
      c.tags.some((tag) => tag.toLowerCase().includes(searchText.toLowerCase()))
  );

  const columns = [
    { title: "Category Name", dataIndex: "categoryName", key: "categoryName" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string) => (
        <img
          src={url}
          alt="category"
          width={80}
          height={60}
          style={{ borderRadius: 6 }}
        />
      ),
    },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Discount (%)", dataIndex: "discount", key: "discount" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (tags: string[]) =>
        tags?.map((tag, index) => (
          <Tag color="blue" key={index}>
            {tag}
          </Tag>
        )),
    },
    {
      title: "Uploaded At",
      dataIndex: "uploadedAt",
      key: "uploadedAt",
      render: (date: Date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Category) => (
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => handleDelete(record.id)}
        >
          Delete
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <Card
        title="Category Management"
        extra={
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setModalVisible(true)}
          >
            Add Category
          </Button>
        }
      >
        <Input.Search
          placeholder="Search categories or tags..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ marginBottom: 16, width: "50%" }}
        />

        <Table
          columns={columns}
          dataSource={filteredCategories}
          rowKey="id"
          locale={{ emptyText: "No categories added" }}
        />
      </Card>

      <CategoriesForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleAddCategory}
      />
    </div>
  );
};

export default UploadCategories;
