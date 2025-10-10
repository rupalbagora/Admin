import React from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hooks";
import { uploadCertificate } from "../../redux/Slice/Uploadcertificate/certificateSlice";

interface CertificateFormProps {
  onSubmit?: () => void; // optional callback after upload
}

const CertificateForm: React.FC<CertificateFormProps> = ({ onSubmit }) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const handleFinish = async (values: any) => {
    if (!values.file || values.file.length === 0) {
      message.error("Please upload a file");
      return;
    }

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("certificateImage", values.file[0].originFileObj);

    try {
      await dispatch(uploadCertificate(formData)).unwrap();
      message.success("Certificate uploaded successfully!");
      form.resetFields();
      onSubmit?.();
    } catch (err: any) {
      message.error(err?.message || "Upload failed");
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
