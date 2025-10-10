import React from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

interface CertificateFormProps {
  onAddCertificate: (cert: any) => void; // callback to update parent state
}

const CertificateForm: React.FC<CertificateFormProps> = ({ onAddCertificate }) => {
  const [form] = Form.useForm();

  const handleFinish = async (values: any) => {
    if (!values.file || values.file.length === 0) {
      message.error("Please upload a file");
      return;
    }

    const token = localStorage.getItem("token"); // ya jahan token store ho
    if (!token) {
      message.error("You are not logged in!");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("certificateImage", values.file[0].originFileObj);

    try {
      const res = await axios.post(
        "http://localhost:5001/api/certificates/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // token bhej rahe hai
          },
        }
      );
      onAddCertificate(res.data.data);
      message.success("Certificate uploaded successfully!");
      form.resetFields();
    } catch (err: any) {
      message.error(err.response?.data?.message || "Upload failed");
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish}>
      <Form.Item
        label="Certificate Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input placeholder="Enter certificate title" />
      </Form.Item>

      <Form.Item
        label="Certificate File"
        name="file"
        valuePropName="fileList"
        getValueFromEvent={(e: any) => e?.fileList || []}
        rules={[{ required: true, message: "Please upload a file" }]}
      >
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Upload Certificate
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CertificateForm;
