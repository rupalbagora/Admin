import React, { useEffect } from "react";
import { Form, Input, Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../redux/hooks";
import {
  uploadCertificate,
  updateCertificate,
} from "../../redux/Slice/Uploadcertificate/certificateSlice";
import { ICertificate } from "../../redux/types/subadmintypes/uploadcertificate.types";

interface CertificateFormProps {
  onSubmit?: () => void; // optional callback after upload/update
  editingCertificate?: ICertificate | null; // null for add
}

const CertificateForm: React.FC<CertificateFormProps> = ({
  onSubmit,
  editingCertificate,
}) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (editingCertificate) {
      form.setFieldsValue({ title: editingCertificate.title });
    } else {
      form.resetFields();
    }
  }, [editingCertificate, form]);

  const handleFinish = async (values: any) => {
    const formData = new FormData();
    formData.append("title", values.title);
    if (values.file?.[0]?.originFileObj) {
      formData.append("certificateImage", values.file[0].originFileObj);
    }

    try {
      if (editingCertificate) {
        await dispatch(
          updateCertificate({ id: editingCertificate._id!, formData })
        ).unwrap();
        message.success("Certificate updated successfully!");
      } else {
        await dispatch(uploadCertificate(formData)).unwrap();
        message.success("Certificate uploaded successfully!");
      }
      form.resetFields();
      onSubmit?.();
    } catch (err: any) {
      message.error(err?.message || "Operation failed");
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
      >
        <Upload beforeUpload={() => false} maxCount={1}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          {editingCertificate ? "Update Certificate" : "Upload Certificate"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default CertificateForm;
