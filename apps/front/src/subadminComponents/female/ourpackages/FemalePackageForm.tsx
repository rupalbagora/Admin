import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
  Space,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

export interface Package {
  _id?: string;
  title: string;
  price: string;
  services: string;
  about: string;
  discount?: string;
  review?: number;
  rating?: number;
  gender: string;
  image: string;
}

interface FemalePackageFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: Package | null;
  loading?: boolean;
}

const FemalePackageForm: React.FC<FemalePackageFormProps> = ({
  visible,
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
        price: initialData.price,
        services: initialData.services,
        about: initialData.about,
        discount: initialData.discount,
        review: initialData.review,
        rating: initialData.rating,
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
      
      // ✅ Gender automatically set as "Female"
      formData.append("title", values.title);
      formData.append("price", values.price.toString());
      formData.append("services", values.services);
      formData.append("about", values.about);
      formData.append("discount", values.discount || "");
      formData.append("review", values.review?.toString() || "0");
      formData.append("rating", values.rating?.toString() || "0");
      formData.append("gender", "Female"); // ✅ Auto-set as Female

      // Append image if exists
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      await onSubmit(formData, initialData?._id);
    } catch (error) {
      message.error("Something went wrong while saving the female package");
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
      className="female-package-form"
    >
      {/* Gender Indicator
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <Tag icon={<WomanOutlined />} color="pink" style={{ fontSize: '14px', padding: '8px 16px' }}>
          Female Package
        </Tag>
      </div> */}

      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter title" }]}
      >
        <Input placeholder="Enter female package title" />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: "Please enter price" }]}
      >
        <InputNumber 
          min={0} 
          style={{ width: "100%" }} 
          placeholder="Enter package price"
        />
      </Form.Item>

      <Form.Item
        label="Services"
        name="services"
        rules={[{ required: true, message: "Please enter services" }]}
      >
        <Input.TextArea 
          rows={3} 
          placeholder="Enter services specifically for female customers"
        />
      </Form.Item>

      <Form.Item
        label="About"
        name="about"
        rules={[{ required: true, message: "Please enter about description" }]}
      >
        <Input.TextArea 
          rows={3} 
          placeholder="Enter package description for female customers"
        />
      </Form.Item>

      <Form.Item
        label="Discount"
        name="discount"
      >
        <InputNumber 
          min={0} 
          style={{ width: "100%" }} 
          placeholder="Enter discount amount"
        />
      </Form.Item>

      <Space style={{ width: '100%' }}>
        <Form.Item
          label="Review"
          name="review"
          style={{ width: '48%' }}
        >
          <InputNumber 
            min={0} 
            style={{ width: "100%" }} 
            placeholder="Review count"
          />
        </Form.Item>

        <Form.Item
          label="Rating"
          name="rating"
          style={{ width: '48%' }}
        >
          <InputNumber 
            min={0} 
            max={5} 
            style={{ width: "100%" }} 
            placeholder="Rating (0-5)"
          />
        </Form.Item>
      </Space>

      <Form.Item 
        label="Package Image"
        rules={!initialData ? [{ required: true, message: "Please upload an image" }] : []}
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
            Image is required for new packages
          </div>
        )}
      </Form.Item>

      {/* Hidden submit button for modal to trigger */}
      <button 
        type="submit" 
        style={{ display: 'none' }}
        className="female-package-form-submit-button"
      />
    </Form>
  );
};

export default FemalePackageForm;