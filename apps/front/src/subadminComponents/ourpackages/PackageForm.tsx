// components/Packages/PackageForm.tsx
import React from "react";
import { Form, Input, Button, Select } from "antd";
import { type Package } from "../../redux/types/subadmintypes/Package.types";

interface PackageFormProps {
  onAddPackage: (pkg: Package) => void;
}

const { Option } = Select;

const PackageForm: React.FC<PackageFormProps> = ({ onAddPackage }) => {
  const [form] = Form.useForm();

  // Predefined service options
  const serviceOptions = [
    "Cleansing and Scrubbing",
    "Steam and Blackhead Removal",
    "Relaxing Massage",
    "Hydrating Mask",
    "Skin Brightening Serum",
  ];

  const handleFinish = (values: any) => {
    const newPackage: Package = {
      id: Date.now().toString(),
      name: values.name,
      description: values.description,
      services: values.services || [],
      price: Number(values.price),
      createdAt: new Date().toISOString(),
    };

    onAddPackage(newPackage);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      {/* === Package Name === */}
      <Form.Item
        label="Package Name"
        name="name"
        rules={[{ required: true, message: "Please enter package name" }]}
      >
        <Input placeholder="Enter package name" />
      </Form.Item>

      {/* === Description === */}
      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <Input.TextArea placeholder="Enter description" />
      </Form.Item>

      {/* === Services Dropdown === */}
      <Form.Item
        label="Services List"
        name="services"
        rules={[{ required: true, message: "Please select at least one service" }]}
      >
        <Select
          mode="multiple"
          allowClear
          placeholder="Select services"
        >
          {serviceOptions.map((service) => (
            <Option key={service} value={service}>
              {service}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* === Price === */}
      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter price" }]}
      >
        <Input type="number" placeholder="Enter price" />
      </Form.Item>

      {/* === Submit === */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-gray-700">
          Add Package
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PackageForm;
  