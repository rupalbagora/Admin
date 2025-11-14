import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
} from "antd";

interface MaleHomeServiceFormProps {
  visible: boolean;
  onCancel: () => void;
  loading?: boolean;
}

const MaleHomeserviceForm: React.FC<MaleHomeServiceFormProps> = ({ visible, onCancel }) => {
  return (
    <Modal
      title="Add New Home Service"
      open={visible}       // AntD v5 uses open
      onCancel={onCancel}
      footer={null}
    >
      {/* <h1>Home Service Form</h1> */}
        <Form 
        // form={form} 
        layout="vertical" 
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Enter male offer title" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[
            { required: true, message: "Please enter discount" },
            { type: 'number', min: 0, max: 100, message: 'Discount must be between 0 and 100' }
          ]}
        >
          <InputNumber 
            min={0} 
            style={{ width: "100%" }} 
            placeholder="Enter discount percentage"
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please select date" }]}
        >
          <Input.TextArea rows={3} placeholder="Enter Description" />
        </Form.Item>

        <Form.Item
          label="Extra Service"
          name="description"
          rules={[{ required: true, message: "Please enter description" }]}
        >
          <Input.TextArea 
            rows={3} 
            placeholder="Enter extra Service."
          />
        </Form.Item>

        <Form.Item 
          label="Upload Image"
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />} style={{marginRight : "330px"}}>
            </Button>

            <Button>Add Service</Button>
          </Upload>
        </Form.Item>
      </Form>

    </Modal>
  );
};

export default MaleHomeserviceForm;
