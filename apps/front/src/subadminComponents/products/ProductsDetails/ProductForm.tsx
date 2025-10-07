import React from "react";
import { Modal, Form, Input, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Product } from "./UploadProducts";

interface ProductFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (product: Product) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const fileObj = values.image?.[0]?.originFileObj as File;
    const newProduct: Product = {
      id: Date.now().toString(),
      title: values.title,
      categoryName: values.categoryName,
      price: values.price,
      discount: values.discount,
      rating: values.rating,
      image: fileObj ? URL.createObjectURL(fileObj) : "",
      uploadedAt: new Date(),
    };
    onSubmit(newProduct);
    form.resetFields();
  };

  return (
    <Modal
      title="Add Product"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter a title" }]}
        >
          <Input placeholder="Enter product title" />
        </Form.Item>

        <Form.Item
          label="Category Name"
          name="categoryName"
          rules={[{ required: true, message: "Please enter category name" }]}
        >
          <Input placeholder="Enter category name" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter price" />
        </Form.Item>

        <Form.Item label="Discount (%)" name="discount">
          <InputNumber min={0} max={100} style={{ width: "100%" }} placeholder="Enter discount %" />
        </Form.Item>

        <Form.Item label="Rating" name="rating">
          <InputNumber min={0} max={5} step={0.1} style={{ width: "100%" }} placeholder="Enter rating (0-5)" />
        </Form.Item>

        <Form.Item
          label="Upload Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e: any) => e.fileList}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload beforeUpload={() => false} maxCount={1} accept="image/*">
            <Button icon={<UploadOutlined />}>Click to Upload Image</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;
