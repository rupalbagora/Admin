// components/YoutubeLinksForm.tsx
import React, { useEffect } from "react";
//import { Form, Input, Button, message } from "antd";
//import type { YoutubeLinksFormData } from "../../redux/types/youtube.types";
import { Card, Table, Button, Input, Upload, Modal, Form } from "antd";

interface YoutubeLinksFormProps {
  initialValues?: Partial<YoutubeLinksFormData>;
  onSubmit: (values: Partial<YoutubeLinksFormData>) => void;
  isEditMode: boolean;
  loading: boolean;
}

const YoutubeLinksForm: React.FC<YoutubeLinksFormProps> = ({
  initialValues,
  onSubmit,
  isEditMode,
  loading,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
      });
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: YoutubeLinksFormData) => {
    try {
      await onSubmit(values);
    } catch {
      message.error("Failed to submit form");
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      initialValues={{
        youtubeLink: "",
        ...initialValues,
      }}
    >
      <Form.Item
        label="YouTube Link"
        name="youtubeLink"
        rules={[
          { required: true, message: "Please input a YouTube link!" },
          { type: "url", message: "Please enter a valid URL!" },
        ]}
      >
        <Input placeholder="Enter YouTube link" />
      </Form.Item>

      <div className="flex justify-end">
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEditMode ? "Update Link" : "Add Link"}
        </Button>
      </div>
    </Form>
  );
};

export default YoutubeLinksForm;

// import React from 'react'

// const youtubeLinksForm = () => {
//   return (
//     <div>
//         hey hey hey 
//     </div>
//   )
// }

// export default youtubeLinksForm
