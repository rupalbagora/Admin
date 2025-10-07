import React from "react";
import { Modal, Form, Input, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type{ Product } from "./UploadProduct";

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
      productName: values.productName,
      price: values.price,
      rating: values.rating,
      views: values.views,
      description: values.description,
      image: fileObj ? URL.createObjectURL(fileObj) : "",
      uploadedAt: new Date(),
    };

    onSubmit(newProduct);
    form.resetFields();
    onCancel(); // close modal after save
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
          label="Product Name"
          name="productName"
          rules={[{ required: true, message: "Please enter product name" }]}
        >
          <Input placeholder="Enter product name" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter price" />
        </Form.Item>

        <Form.Item
          label="Rating (0–5)"
          name="rating"
          rules={[{ required: true, message: "Please enter rating" }]}
        >
          <InputNumber
            min={0}
            max={5}
            step={0.1}
            style={{ width: "100%" }}
            placeholder="Enter rating"
          />
        </Form.Item>

        <Form.Item
          label="Views"
          name="views"
          rules={[{ required: true, message: "Please enter number of views" }]}
        >
          <InputNumber min={0} style={{ width: "100%" }} placeholder="Enter views" />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter product description" />
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
