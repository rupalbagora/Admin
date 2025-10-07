// components/Packages/PackageForm.tsx
import React from "react";
import { Form, Input, Button } from "antd";
import { type Package } from "../../redux/types/subadmintypes/Package.types";

interface PackageFormProps {
  onAddPackage: (pkg: Package) => void;
}

const PackageForm: React.FC<PackageFormProps> = ({ onAddPackage }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const newPackage: Package = {
      id: Date.now().toString(),
      name: values.name,
      description: values.description,
      services: values.services,
      price: values.price,
      createdAt: new Date().toISOString(),
    };

    onAddPackage(newPackage);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Package Name"
        name="name"
        rules={[{ required: true, message: "Please enter package name" }]}
      >
        <Input placeholder="Enter package name" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <Input.TextArea placeholder="Enter description" />
      </Form.Item>

      <Form.Item
        label="Services List"
        name="services"
        rules={[{ required: true, message: "Please enter services" }]}
      >
        <Input placeholder="Enter services separated by commas" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter price" }]}
      >
        <Input type="number" placeholder="Enter price" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-gray-700">
          Add Package
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PackageForm;
