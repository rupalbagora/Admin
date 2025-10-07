import React, { useState } from "react";
import { Card, Table, Input, Button, Modal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import ProductForm from "./ProductForm";

export interface Product {
  id: string;
  productName: string;
  price: number;
  rating: number;
  views: number;
  description: string;
  image: string;
  uploadedAt: Date;
}

const UploadProduct: React.FC = () => {
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
      p.productName.toLowerCase().includes(searchText.toLowerCase()) ||
      p.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    { title: "Product Name", dataIndex: "productName", key: "productName" },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (url: string) => (
        <img
          src={url}
          alt="product"
          width={80}
          height={60}
          style={{ borderRadius: 6 }}
        />
      ),
    },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Rating", dataIndex: "rating", key: "rating" },
    { title: "Views", dataIndex: "views", key: "views" },
    { title: "Description", dataIndex: "description", key: "description" },
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
          placeholder="Search product by name or description..."
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

export default UploadProduct;
