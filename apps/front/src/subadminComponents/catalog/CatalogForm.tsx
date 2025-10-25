// components/Catalog/CatalogForm.tsx
import React from "react";
import { Form, Input, Button, InputNumber, Upload, message, Rate } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { type Catalog } from "./UploadCatalog";

interface CatalogFormProps {
  onAddCatalog: (cat: Catalog) => void;
}

const CatalogForm: React.FC<CatalogFormProps> = ({ onAddCatalog }) => {
  const [form] = Form.useForm();

  // Convert image to base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleFinish = async (values: any) => {
    let imageBase64 = "";

    if (values.image && values.image[0]?.originFileObj) {
      imageBase64 = await toBase64(values.image[0].originFileObj);
    }

    const newCatalog: Catalog = {
      id: Date.now().toString(),
      title: values.title,
      price: Number(values.price),
      tag: values.tag,
      rating: values.rating || 0,
      discount: Number(values.discount),
      image: imageBase64,
      createdAt: new Date().toISOString(),
    };

    onAddCatalog(newCatalog);
    form.resetFields();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={{
        rating: 0,
        discount: 0,
      }}
    >
      {/* Title */}
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter title" }]}
      >
        <Input placeholder="Enter catalog title" />
      </Form.Item>

      {/* Price */}
      <Form.Item
        label="Price (₹)"
        name="price"
        rules={[{ required: true, message: "Please enter price" }]}
      >
        <InputNumber
          min={0}
          placeholder="Enter price"
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Tag */}
      <Form.Item
        label="Tag"
        name="tag"
        rules={[{ required: true, message: "Please enter tag" }]}
      >
        <Input placeholder="Enter tag (e.g. Trending, Bestseller)" />
      </Form.Item>

      {/* Rating */}
      <Form.Item label="Rating" name="rating">
        <Rate />
      </Form.Item>

      {/* Discount */}
      <Form.Item
        label="Discount (%)"
        name="discount"
        rules={[{ required: true, message: "Please enter discount" }]}
      >
        <InputNumber
          min={0}
          max={100}
          placeholder="Enter discount percentage"
          style={{ width: "100%" }}
        />
      </Form.Item>

      {/* Image Upload */}
      <Form.Item
        label="Catalog Image"
        name="image"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Please upload an image" }]}
      >
        <Upload
          listType="picture"
          maxCount={1}
          beforeUpload={(file) => {
            const isImage = file.type.startsWith("image/");
            if (!isImage) {
              message.error("Only image files are allowed!");
              return Upload.LIST_IGNORE;
            }
            return false;
          }}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      {/* Submit */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-gray-700">
          Add Catalog
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CatalogForm;
