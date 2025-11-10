import React, { useEffect, useState } from "react";
import { Form, Input, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export interface Certificate {
  _id?: string;
  title: string;
  imageUrl: string;
  addedBy: string;
  createdAt?: string;
  updatedAt?: string;
}

interface CertificateFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: Certificate | null;
  loading?: boolean;
}

const CertificateForm: React.FC<CertificateFormProps> = ({
  visible,
  //onCancel,
  onSubmit,
  initialData,
  //loading = false,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        title: initialData.title,
      });

      // Set existing image for edit mode
      setFileList(
        initialData.imageUrl
          ? [
              {
                uid: "-1",
                name: "Existing Certificate",
                status: "done",
                url: initialData.imageUrl,
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
      
      // Append title field
      formData.append("title", values.title);

      //  Append certificate image - use correct field name "certificateImage"
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("certificateImage", fileList[0].originFileObj);
      } else if (!initialData && fileList.length === 0) {
        // For new certificates, image is required
        message.error("Please upload a certificate image");
        return;
      }

      await onSubmit(formData, initialData?._id);
    } catch (error) {
      console.error("Form submission error:", error);
      message.error("Something went wrong while saving the certificate");
    }
  };

  // const handleCancel = () => {
  //   form.resetFields();
  //   setFileList([]);
  //   onCancel();
  // };

  return (
    <Form 
      form={form} 
      layout="vertical" 
      onFinish={handleFinish}
      className="certificate-form"
    >
      <Form.Item
        label="Certificate Title"
        name="title"
        rules={[{ required: true, message: "Please enter certificate title" }]}
      >
        <Input placeholder="Enter certificate title" />
      </Form.Item>

      <Form.Item 
        label="Certificate Image"
        required={!initialData}
        rules={!initialData ? [{ required: true, message: "Please upload certificate image" }] : []}
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
            {initialData ? "Change Certificate Image" : "Upload Certificate Image"}
          </Button>
        </Upload>
        {!initialData && (
          <div style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>
            Certificate image is required for new certificates
          </div>
        )}
        {initialData && (
          <div style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>
            Leave empty to keep existing image
          </div>
        )}
      </Form.Item>

      {/* Hidden submit button for modal to trigger */}
      <button 
        type="submit" 
        style={{ display: 'none' }}
        className="certificate-form-submit-button"
      />
    </Form>
  );
};

export default CertificateForm;