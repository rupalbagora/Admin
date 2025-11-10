import React, { useEffect } from "react";
import {
  Form,
  Input,
//   Button,
  message,
  Tag,
} from "antd";
import { SafetyCertificateOutlined } from "@ant-design/icons"; // ✅ Fixed icon

const { TextArea } = Input;

export interface PrivacyPolicy {
  _id?: string;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

interface PrivacyPolicyFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData) => void;
  initialData?: PrivacyPolicy | null;
  loading?: boolean;
}

const PrivacyPolicyForm: React.FC<PrivacyPolicyFormProps> = ({
  visible,
  //onCancel,
  onSubmit,
  initialData,
//   loading = false,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        title: initialData.title,
        content: initialData.content,
      });
    } else {
      form.resetFields();
    }
  }, [initialData, form, visible]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      
      // Append all fields
      formData.append("title", values.title);
      formData.append("content", values.content);

      await onSubmit(formData);
    } catch (error) {
      message.error("Something went wrong while saving privacy policy");
    }
  };

//   const handleCancel = () => {
//     form.resetFields();
//     onCancel();
//   };

  return (
    <Form 
      form={form} 
      layout="vertical" 
      onFinish={handleFinish}
      className="privacy-policy-form"
    >
      {/* Info Indicator */}
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <Tag icon={<SafetyCertificateOutlined />} color="green" style={{ fontSize: '14px', padding: '8px 16px' }}> {/* ✅ Fixed icon */}
          Privacy Policy Information
        </Tag>
      </div>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter title" }]}
      >
        <Input placeholder="Enter title (e.g., Privacy Policy, Data Protection Policy)" />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please enter content" }]}
      >
        <TextArea 
          rows={12} 
          placeholder="Enter detailed privacy policy content including data collection, usage, storage, sharing, user rights, cookies, security measures, etc."
          showCount
          maxLength={10000}
        />
      </Form.Item>

      {/* Hidden submit button for modal to trigger */}
      <button 
        type="submit" 
        style={{ display: 'none' }}
        className="privacy-policy-form-submit-button"
      />
    </Form>
  );
};

export default PrivacyPolicyForm;