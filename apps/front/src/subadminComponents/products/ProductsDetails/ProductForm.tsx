import React from "react";
import { Modal, Form, Input, InputNumber, Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

interface ProductFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData) => void;
  initialValues?: any;
  loading?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
  loading,
}) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const formData = new FormData();

    // ✅ Append all backend fields
    formData.append("name", values.name);
    formData.append("price", values.price);
    formData.append("offer", values.offer || "");
    formData.append("rating", values.rating || "");
    formData.append("tag", values.tag || "");
    formData.append("description", values.description || "");
    formData.append("reviews", values.reviews || "");
    formData.append("gender", values.gender || "");

    // ✅ Append image files
    if (values.image?.[0]?.originFileObj) {
      formData.append("image", values.image[0].originFileObj);
    }

    if (values.icons?.[0]?.originFileObj) {
      formData.append("icons", values.icons[0].originFileObj);
    }

    onSubmit(formData);
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={initialValues ? "Edit Product" : "Add Product"}
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      okText={initialValues ? "Update" : "Add"}
      confirmLoading={loading}
      destroyOnClose
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={handleFinish}
        initialValues={initialValues}
      >
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
          <InputNumber className="w-full" placeholder="Enter product price" />
        </Form.Item>

        <Form.Item label="Offer" name="offer">
          <Input placeholder="Enter offer details" />
        </Form.Item>

        <Form.Item label="Rating" name="rating">
          <Input placeholder="Enter rating (e.g. 4.5)" />
        </Form.Item>

        <Form.Item label="Tag" name="tag">
          <Input placeholder="Product tag (e.g. new, hot, etc.)" />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Enter product description" />
        </Form.Item>

        <Form.Item label="Reviews" name="reviews">
          <Input placeholder="Enter review info" />
        </Form.Item>

        <Form.Item label="Gender" name="gender">
          <Input placeholder="Enter gender (e.g. Male/Female/Unisex)" />
        </Form.Item>

        {/* ✅ Image */}
        <Form.Item
          label="Main Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e: any) =>
            Array.isArray(e) ? e : e?.fileList
          }
          rules={[{ required: true, message: "Please upload product image" }]}
        >
          <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Main Image</Button>
          </Upload>
        </Form.Item>

        {/* ✅ Icon */}
        <Form.Item
          label="Icon"
          name="icons"
          valuePropName="fileList"
          getValueFromEvent={(e: any) =>
            Array.isArray(e) ? e : e?.fileList
          }
        >
          <Upload beforeUpload={() => false} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload Icon</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductForm;
