import React from "react";
import { Modal, Form, Input, InputNumber, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type{ Category } from "./UploadCategories";

interface CategoryFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (category: Category) => void;
}

const CategoriesForm: React.FC<CategoryFormProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const fileObj = values.image?.[0]?.originFileObj as File;
    const tagsArray = values.tags
      ? values.tags.split(",").map((t: string) => t.trim()).filter(Boolean)
      : [];

    const newCategory: Category = {
      id: Date.now().toString(),
      categoryName: values.categoryName,
      price: values.price,
      discount: values.discount,
      rating: values.rating,
      tags: tagsArray,
      image: fileObj ? URL.createObjectURL(fileObj) : "",
      uploadedAt: new Date(),
    };
    onSubmit(newCategory);
    form.resetFields();
  };

  return (
    <Modal
      title="Add Category"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
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
          <InputNumber
            min={0}
            max={100}
            style={{ width: "100%" }}
            placeholder="Enter discount percentage"
          />
        </Form.Item>

        <Form.Item label="Rating (0-5)" name="rating">
          <InputNumber
            min={0}
            max={5}
            step={0.1}
            style={{ width: "100%" }}
            placeholder="Enter rating"
          />
        </Form.Item>

        {/* 🏷️ Text-based Tags Field */}
        <Form.Item label="Tags" name="tags">
          <Input placeholder="Enter tags separated by commas (e.g. fashion, summer)" />
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

export default CategoriesForm;
