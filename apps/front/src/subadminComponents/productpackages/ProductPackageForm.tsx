import React from "react";
import { Form, Input, Button, Select, InputNumber } from "antd";
import { type IProductPackage } from "../../redux/types/subadmintypes/ProductPackage.types";

interface ProductPackageFormProps {
  onAddPackage: (pkg: IProductPackage) => void;
}

const { Option } = Select;
const { TextArea } = Input;

const ProductPackageForm: React.FC<ProductPackageFormProps> = ({ onAddPackage }) => {
  const [form] = Form.useForm();

  const predefinedProducts = [
    "Facewash",
    "Bleach",
    "Shampoo",
    "Conditioner",
    "Hairmask",
    "Serum",
  ];

  const handleFinish = (values: any) => {
    const newPackage: IProductPackage = {
      name: values.name,
      price: Number(values.price),
      tagline: values.tagline,
      products: values.products || [],
      rating: values.rating ? Number(values.rating) : undefined,
      description: values.description,
      discount: values.discount,
      items: values.items || [],
      usageInstructions: values.usageInstructions,
      stock: Number(values.stock),
      addedBy: "000000000000000000000000" as any, // placeholder ObjectId
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    onAddPackage(newPackage);
    form.resetFields();
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleFinish}>
      <Form.Item
        label="Package Name"
        name="name"
        rules={[{ required: true, message: "Please enter package name" }]}
      >
        <Input placeholder="Enter package name" />
      </Form.Item>

      <Form.Item
        label="Tagline"
        name="tagline"
        rules={[{ required: true, message: "Please enter tagline" }]}
      >
        <Input placeholder="Enter tagline" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <TextArea placeholder="Enter package description" />
      </Form.Item>

      <Form.Item
        label="Products"
        name="products"
        rules={[{ required: true, message: "Select at least one product" }]}
      >
        <Select mode="multiple" allowClear placeholder="Select products">
          {predefinedProducts.map((p) => (
            <Option key={p} value={p}>
              {p}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        label="Items"
        name="items"
        rules={[{ required: true, message: "Enter item list" }]}
      >
        <Select
          mode="tags"
          tokenSeparators={[","]}
          placeholder="Enter items (e.g. Shampoo 250ml)"
        />
      </Form.Item>

      <Form.Item
        label="Usage Instructions"
        name="usageInstructions"
        rules={[{ required: true, message: "Enter usage instructions" }]}
      >
        <TextArea placeholder="Describe how to use the products" />
      </Form.Item>

      <Form.Item label="Discount" name="discount">
        <Input placeholder="e.g. Save ₹200 on combo" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Enter price" }]}
      >
        <InputNumber min={0} className="w-full" placeholder="Enter price (₹)" />
      </Form.Item>

      <Form.Item label="Rating" name="rating">
        <InputNumber min={0} max={5} step={0.1} className="w-full" placeholder="Rating (0–5)" />
      </Form.Item>

      <Form.Item
        label="Stock"
        name="stock"
        rules={[{ required: true, message: "Enter stock quantity" }]}
      >
        <InputNumber min={0} className="w-full" placeholder="Enter stock count" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-gray-700">
          Add Product Package
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProductPackageForm;
