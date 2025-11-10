import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Upload,
  message,
  Tag,
} from "antd";
import { UploadOutlined, InfoCircleOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export interface AboutSalon {
  _id?: string;
  title: string;
  description: string;
  image: string;
  addedBy?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface AboutSalonFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: AboutSalon | null;
  loading?: boolean;
}

const AboutSalonForm: React.FC<AboutSalonFormProps> = ({
  visible,
  onCancel,
  onSubmit,
  initialData,
  loading = false,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        title: initialData.title,
        description: initialData.description,
      });

      setFileList(
        initialData.image
          ? [
              {
                uid: "-1",
                name: "Existing Image",
                status: "done",
                url: initialData.image,
              },
            ]
          : []
      );
    } else {
      form.resetFields();
      setFileList([]);
    }
  }, [initialData, form, visible]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      
      // Append all fields
      formData.append("title", values.title);
      formData.append("description", values.description);

      // Append image if exists
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      } else if (!initialData) {
        message.error("Please upload an image");
        return;
      }

      await onSubmit(formData, initialData?._id);
    } catch (error) {
      message.error("Something went wrong while saving salon information");
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  return (
    <Form 
      form={form} 
      layout="vertical" 
      onFinish={handleFinish}
      className="about-salon-form"
    >
      {/* Info Indicator */}
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <Tag icon={<InfoCircleOutlined />} color="blue" style={{ fontSize: '14px', padding: '8px 16px' }}>
          About Our Salon Information
        </Tag>
      </div>

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter title" }]}
      >
        <Input placeholder="Enter title (e.g., Our Story, About Us, Welcome to Our Salon)" />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <TextArea 
          rows={6} 
          placeholder="Enter detailed description about your salon, services, history, team, etc."
          showCount
          maxLength={2000}
        />
      </Form.Item>

      <Form.Item 
        label="Salon Image"
        rules={!initialData ? [{ required: true, message: "Please upload an image" }] : []}
        extra="Upload a high-quality image that represents your salon"
      >
        <Upload
          listType="picture"
          maxCount={1}
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          beforeUpload={() => false}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>
            {initialData ? "Change Image" : "Select Image"}
          </Button>
        </Upload>
        {!initialData && (
          <div style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>
            Image is required for new salon information
          </div>
        )}
      </Form.Item>

      {/* Hidden submit button for modal to trigger */}
      <button 
        type="submit" 
        style={{ display: 'none' }}
        className="about-salon-form-submit-button"
      />
    </Form>
  );
};

export default AboutSalonForm;