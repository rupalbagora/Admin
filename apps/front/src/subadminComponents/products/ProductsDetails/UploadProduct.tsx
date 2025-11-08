import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Modal,
  Form,
  Upload,
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
  UploadOutlined,
} from "@ant-design/icons";
import API from "../../../api/axios";

const { Search } = Input;

const UploadProduct: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [form] = Form.useForm();

  // ✅ Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await API.get("/products");
      setProducts(res.data?.products || res.data?.data || []);
    } catch (error: any) {
      console.error("Error fetching products:", error);
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // ✅ Create / Update Product
  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      // Required backend fields
      formData.append("name", values.name);
      formData.append("price", values.price);
      formData.append("offer", values.offer || "");
      formData.append("rating", values.rating || "");
      formData.append("tag", values.tag || "");
      formData.append("description", values.description || "");
      formData.append("reviews", values.reviews || "");
      formData.append("gender", "Male"); // ✅ Always fixed as Male

      if (values.image?.fileList?.length > 0) {
        formData.append("image", values.image.fileList[0].originFileObj);
      }

      if (values.icons?.fileList?.length > 0) {
        formData.append("icons", values.icons.fileList[0].originFileObj);
      }

      if (editingProduct) {
        await API.put(`/products/${editingProduct._id}`, formData);
        message.success("✅ Product updated successfully");
      } else {
        await API.post("/products/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("✅ Product added successfully");
      }

      form.resetFields();
      setOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (error: any) {
      console.error("Submit error:", error);
      message.error(error.response?.data?.message || "Something went wrong!");
    }
  };

  // ✅ Delete Product
  const handleDelete = async (id: string) => {
    try {
      await API.delete(`/products/${id}`);
      message.success("🗑️ Product deleted successfully");
      fetchProducts();
    } catch (error: any) {
      console.error("Delete error:", error);
      message.error("Failed to delete product");
    }
  };

  // ✅ Table Columns
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (img: string) =>
        img ? (
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/images/${img}`}
            alt="product"
            width={60}
            height={60}
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          <Tag color="red">No Image</Tag>
        ),
    },
    { title: "Name", dataIndex: "name" },
    { title: "Price", dataIndex: "price" },
    { title: "Offer", dataIndex: "offer" },
    { title: "Rating", dataIndex: "rating" },
    { title: "Tag", dataIndex: "tag" },
    { title: "Description", dataIndex: "description" },
    { title: "Reviews", dataIndex: "reviews" },
    {
      title: "Icon",
      dataIndex: "icons",
      render: (icon: string) =>
        icon ? (
          <img
            src={`${import.meta.env.VITE_API_URL}/uploads/icons/${icon}`}
            alt="icon"
            width={40}
            height={40}
            style={{ objectFit: "cover" }}
          />
        ) : (
          <Tag>No Icon</Tag>
        ),
    },
    {
      title: "Actions",
      render: (record: any) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => {
              setEditingProduct(record);
              form.setFieldsValue(record);
              setOpen(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete?"
            onConfirm={() => handleDelete(record._id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title="Product Management"
      extra={
        <Space>
          <Button icon={<ReloadOutlined />} onClick={fetchProducts} loading={loading}>
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingProduct(null);
              form.resetFields();
              setOpen(true);
            }}
          >
            Add Product
          </Button>
        </Space>
      }
    >
      <Search
        placeholder="Search products..."
        allowClear
        onChange={(e) => {
          const value = e.target.value.toLowerCase();
          if (!value) {
            fetchProducts();
            return;
          }
          const filtered = products.filter((p) =>
            p?.name?.toLowerCase()?.includes(value)
          );
          setProducts(filtered);
        }}
        style={{ marginBottom: 16, maxWidth: 300 }}
      />

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={products}
        loading={loading}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleSubmit}
        okText={editingProduct ? "Update" : "Create"}
        confirmLoading={loading}
      >
        <Form layout="vertical" form={form}>
          <Form.Item
            name="name"
            label="Product Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input placeholder="Enter product name" />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter price" }]}
          >
            <Input type="number" placeholder="Enter price" />
          </Form.Item>

          <Form.Item name="offer" label="Offer">
            <Input placeholder="Enter offer" />
          </Form.Item>

          <Form.Item name="rating" label="Rating">
            <Input placeholder="Enter rating" />
          </Form.Item>

          <Form.Item name="tag" label="Tag">
            <Input placeholder="Enter tag" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <Input.TextArea rows={2} placeholder="Enter description" />
          </Form.Item>

          <Form.Item name="reviews" label="Reviews">
            <Input placeholder="Enter reviews" />
          </Form.Item>

          {/* ✅ Gender fixed internally as Male, not shown */}

          <Form.Item name="image" label="Main Image">
            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>

          <Form.Item name="icons" label="Icon">
            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Upload Icon</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default UploadProduct;
