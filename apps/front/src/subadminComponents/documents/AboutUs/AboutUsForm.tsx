import React, { useEffect } from "react";
import {
  Form,
  Input,
//   Button,
  message,
  Tag,
} from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export interface AboutUs {
  _id?: string;
  title: string;
  content: string;
  updatedAt?: string;
}

interface AboutUsFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData) => void;
  initialData?: AboutUs | null;
  loading?: boolean;
}

const AboutUsForm: React.FC<AboutUsFormProps> = ({
  visible,
 // onCancel,
  onSubmit,
  initialData,
 // loading = false,
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
      message.error("Something went wrong while saving about us information");
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
      className="about-us-form"
    >
      {/* Info Indicator */}
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <Tag icon={<InfoCircleOutlined />} color="blue" style={{ fontSize: '14px', padding: '8px 16px' }}>
          About Us Information
        </Tag>
      </div>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter title" }]}
      >
        <Input placeholder="Enter title (e.g., About Our Company, Our Story, Who We Are)" />
      </Form.Item>

      <Form.Item
        label="Content"
        name="content"
        rules={[{ required: true, message: "Please enter content" }]}
      >
        <TextArea 
          rows={10} 
          placeholder="Enter detailed content about your company, mission, vision, values, history, team, etc."
          showCount
          maxLength={5000}
        />
      </Form.Item>

      {/* Hidden submit button for modal to trigger */}
      <button 
        type="submit" 
        style={{ display: 'none' }}
        className="about-us-form-submit-button"
      />
    </Form>
  );
};

export default AboutUsForm;