import React, { useState } from "react";
import { Form, Input, Select, Upload, Button, Card, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const CreateAdminForm = () => {
  const [isCustom, setIsCustom] = useState(false);

  const handleSubscriptionChange = (value: string) => {
    setIsCustom(value === "custom");
  };

  const handleFinish = (values: any) => {
    console.log("Form values:", values);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex justify-center items-start">
      <Card
        title={
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/logo.png" // 👈 your admin image
              alt="Admin"
               style={{ width: "70px", height: "70px" }}
              className="w-10 h-10 rounded-md object-cover"
            />
            {/* <h2 className="text-xl font-semibold text-gray-800">Create Admin</h2> */}
          </div>
        }
        className="w-full max-w-5xl mx-auto shadow-lg rounded-2xl bg-white"
        bordered={false}
      >
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {/* Name */}
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter name" }]}
          >
            <Input placeholder="Enter name" size="large" />
          </Form.Item>

          {/* Email */}
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input placeholder="example@email.com" size="large" />
          </Form.Item>

          {/* Password */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: "Please enter password" },
              { min: 8, message: "Password must be at least 8 characters" },
            ]}
          >
            <Input.Password placeholder="Enter password" size="large" />
          </Form.Item>

          {/* Phone */}
          <Form.Item
            label="Phone"
            name="phone"
            rules={[{ required: true, message: "Please enter phone number" }]}
          >
            <Input placeholder="Enter phone number" size="large" />
          </Form.Item>

          {/* Address */}
          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: "Please enter address" }]}
          >
            <Input placeholder="Enter address" size="large" />
          </Form.Item>

          {/* Status */}
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Please select status" }]}
          >
            <Select placeholder="-- Select --" size="large">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
            </Select>
          </Form.Item>

          {/* Subscription Period */}
          <Form.Item
            label="Subscription Period"
            name="subscriptionPeriod"
            rules={[{ required: true, message: "Please select subscription" }]}
          >
            <Select onChange={handleSubscriptionChange} size="large">
              <Option value="biannual">Bi-Annual</Option>
              <Option value="halfyearly">Half-Yearly</Option>
              <Option value="yearly">Yearly</Option>
              <Option value="custom">Custom</Option>
            </Select>
          </Form.Item>

          {/* Custom DatePicker (only for custom option) */}
          {isCustom && (
            <Form.Item
              label="Custom Expiry Date"
              name="customDate"
              rules={[{ required: true, message: "Please select custom date" }]}
            >
              <DatePicker
                className="w-full"
                size="large"
                placeholder="Select custom date"
              />
            </Form.Item>
          )}

          {/* Upload Image */}
          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e: any) => e.fileList}
            className="md:col-span-2"
          >
            <Upload beforeUpload={() => false} listType="picture-card" maxCount={1}>
              <div>
                <UploadOutlined />
                <div className="mt-2 text-gray-600">Upload Image</div>
              </div>
            </Upload>
          </Form.Item>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-end mt-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              className="px-10 py-2 rounded-lg shadow-sm bg-blue-600 hover:bg-blue-700"
            >
              Create
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreateAdminForm;
