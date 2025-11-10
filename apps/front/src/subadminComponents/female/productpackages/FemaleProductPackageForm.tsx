import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export interface ProductPackage {
  _id?: string;
  name: string;
  price: number;
  review?: string;
  description?: string;
  offers?: string;
  items: string[];
  usage?: string;
  image?: string;
  gender: string;
}

interface FemaleProductPackageFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: ProductPackage | null;
  loading?: boolean;
}

const FemaleProductPackageForm: React.FC<FemaleProductPackageFormProps> = ({
  visible,
  onSubmit,
  initialData,
 // loading = false,
}) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        name: initialData.name,
        price: initialData.price,
        review: initialData.review,
        description: initialData.description,
        offers: initialData.offers,
        usage: initialData.usage,
        items: initialData.items?.join(", ") || "",
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
      
      // Append all fields - gender fixed as "Female"
      formData.append("name", values.name);
      formData.append("price", values.price.toString());
      formData.append("review", values.review || "");
      formData.append("description", values.description || "");
      formData.append("offers", values.offers || "");
      formData.append("usage", values.usage || "");
      formData.append("gender", "Female"); // ✅ Fixed as Female

      // Convert items string to array
      const itemsArray = values.items.split(",").map((item: string) => item.trim()).filter((item: string) => item);
      itemsArray.forEach((item: string) => {
        formData.append("items", item);
      });

      // Append image if exists
      if (fileList.length > 0 && fileList[0].originFileObj) {
        formData.append("image", fileList[0].originFileObj);
      }

      await onSubmit(formData, initialData?._id);
    } catch (error) {
      message.error("Something went wrong while saving the female product package");
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
      className="female-product-package-form"
    >
      {/* Gender Indicator
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <Tag icon={<WomanOutlined />} color="pink" style={{ fontSize: '14px', padding: '8px 16px' }}>
          Female Product Package
        </Tag>
      </div> */}

      <Form.Item
        label="Package Name"
        name="name"
        rules={[{ required: true, message: "Please enter package name" }]}
      >
        <Input placeholder="Enter female package name" />
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
        label="Description"
        name="description"
        rules={[{ required: true, message: "Please enter description" }]}
      >
        <TextArea 
          rows={3} 
          placeholder="Enter package description for female customers"
        />
      </Form.Item>

      <Form.Item
        label="Items"
        name="items"
        rules={[{ required: true, message: "Please enter items" }]}
        extra="Separate items with commas"
      >
        <TextArea 
          rows={3} 
          placeholder="Enter items for female customers (e.g., Face Cream, Lipstick, Perfume)"
        />
      </Form.Item>

      <Form.Item
        label="Review"
        name="review"
      >
        <TextArea 
          rows={2} 
          placeholder="Enter review"
        />
      </Form.Item>

      <Form.Item
        label="Offers"
        name="offers"
      >
        <Input placeholder="Enter offers (e.g., Save ₹200 on female beauty combo)" />
      </Form.Item>

      <Form.Item
        label="Usage Instructions"
        name="usage"
      >
        <TextArea 
          rows={2} 
          placeholder="Enter usage instructions for female customers"
        />
      </Form.Item>

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
        className="female-product-package-form-submit-button"
      />
    </Form>
  );
};

export default FemaleProductPackageForm;