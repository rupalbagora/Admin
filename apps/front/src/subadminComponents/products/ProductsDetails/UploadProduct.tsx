import React, { useState } from "react";
import { Card, Table, Input, Button, Modal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import ProductForm from "./ProductForm";

export interface Product {
  id: string;
  title: string;
  categoryName: string;
  price: number;
  discount: number;
  rating: number;
  image: string;
  uploadedAt: Date;
}

const UploadProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const handleAddProduct = (product: Product) => {
    setProducts([...products, product]);
    setModalVisible(false);
  };

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete this product?",
      onOk: () => setProducts(products.filter((p) => p.id !== id)),
    });
  };

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase()) ||
      p.categoryName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Title", dataIndex: "title", key: "title" },
    { title: "Category", dataIndex: "categoryName", key: "categoryName" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string) => (
        <img src={url} alt="product" width={80} height={60} style={{ borderRadius: 6 }} />
      ),
    },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Discount (%)", dataIndex: "discount", key: "discount" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    {
      title: "Uploaded At",
      dataIndex: "uploadedAt",
      key: "uploadedAt",
      render: (date: Date) => new Date(date).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
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
        title="Product Management"
        extra={
          <Button
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setModalVisible(true)}
          >
            Add Product
          </Button>
        }
      >
        <Input.Search
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          allowClear
          style={{ marginBottom: 16, width: "50%" }}
        />

        <Table
          columns={columns}
          dataSource={filteredProducts}
          rowKey="id"
          locale={{ emptyText: "No products added" }}
        />
      </Card>

      <ProductForm
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default UploadProducts;
