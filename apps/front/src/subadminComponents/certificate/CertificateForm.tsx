// components/Certificates/CertificateForm.tsx
import React from "react";
import { Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { Certificate } from "../../redux/types/subadmintypes/uploadcertificate.types";

interface CertificateFormProps {
  onAddCertificate: (cert: Certificate) => void;
}

const CertificateForm: React.FC<CertificateFormProps> = ({ onAddCertificate }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    if (!values.file || values.file.length === 0) return;

    const fileObj = values.file[0].originFileObj as File;

    const newCertificate: Certificate = {
      id: Date.now().toString(),
      title: values.title,
      name: values.name,
      fileUrl: URL.createObjectURL(fileObj),
      uploadedAt: new Date().toISOString(),
    };

    onAddCertificate(newCertificate);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input placeholder="Enter certificate title" />
      </Form.Item>

      <Form.Item
        label="Certificate Name"
        name="name"
        rules={[{ required: true, message: "Please enter certificate name" }]}
      >
        <Input placeholder="Enter certificate name" />
      </Form.Item>

      <Form.Item
        label="Upload File"
        name="file"
        valuePropName="fileList"
        getValueFromEvent={(e: any) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Please upload a file" }]}
      >
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-gray-700">
          Upload
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CertificateForm;
