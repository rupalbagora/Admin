import React from "react";
import { Modal, Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Certificate } from "../../redux/types/subadmintypes/uploadcertificate.types";

interface CertificateModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (cert: Certificate) => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ visible, onCancel, onSubmit }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    if (!values.file || !values.file.length) return;

    const fileObj = values.file[0].originFileObj as File;

    const newCertificate: Certificate = {
      id: Date.now().toString(),
      title: values.title,
      name: values.name,
      fileUrl: URL.createObjectURL(fileObj),
      uploadedAt: new Date(),
    };

    onSubmit(newCertificate);
    form.resetFields();
  };

  return (
    <Modal
      title="Upload Certificate"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnHidden
    >
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
          getValueFromEvent={(e: any) => e.fileList}
          rules={[{ required: true, message: "Please upload a file" }]}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CertificateModal;
