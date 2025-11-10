import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Button, Upload, message} from "antd";
import { UploadOutlined } from "@ant-design/icons";

export interface Product {
  _id?: string;
  name: string;
  price: string;
  offer?: string;
  rating?: string;
  tag?: string;
  description?: string;
  reviews?: string;
  gender?: string;
  image: string;
  icons?: string[];
}

interface FemaleProductFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (formData: FormData, id?: string) => void;
  initialData?: Product | null;
  loading?: boolean;
}

const FemaleProductForm: React.FC<FemaleProductFormProps> = ({
  visible,
  onSubmit,
  initialData,
 // loading = false,
}) => {
  const [form] = Form.useForm();
  const [imageFileList, setImageFileList] = useState<any[]>([]);
  const [iconsFileList, setIconsFileList] = useState<any[]>([]);

  useEffect(() => {
    if (initialData && visible) {
      form.setFieldsValue({
        name: initialData.name,
        price: initialData.price,
        offer: initialData.offer,
        rating: initialData.rating,
        tag: initialData.tag,
        description: initialData.description,
        reviews: initialData.reviews,
      });

      setImageFileList(
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

      setIconsFileList(
        initialData.icons && initialData.icons.length > 0
          ? [
              {
                uid: "-2",
                name: "Existing Icon",
                status: "done",
                url: initialData.icons[0],
              },
            ]
          : []
      );
    } else {
      form.resetFields();
      setImageFileList([]);
      setIconsFileList([]);
    }
  }, [initialData, form, visible]);

  const handleFinish = async (values: any) => {
    try {
      const formData = new FormData();
      
      // Append all fields - gender fixed as "Female"
      formData.append("name", values.name);
      formData.append("price", values.price.toString());
      formData.append("offer", values.offer || "");
      formData.append("rating", values.rating || "");
      formData.append("tag", values.tag || "");
      formData.append("description", values.description || "");
      formData.append("reviews", values.reviews || "");
      formData.append("gender", "Female"); 

      // Append main image if exists
      if (imageFileList.length > 0 && imageFileList[0].originFileObj) {
        formData.append("image", imageFileList[0].originFileObj);
      }

      // Append icon if exists
      if (iconsFileList.length > 0 && iconsFileList[0].originFileObj) {
        formData.append("icons", iconsFileList[0].originFileObj);
      }

      await onSubmit(formData, initialData?._id);
    } catch (error) {
      message.error("Something went wrong while saving the female product");
    }
  };

  // const handleCancel = () => {
  //   form.resetFields();
  //   setImageFileList([]);
  //   setIconsFileList([]);
  //   onCancel();
  // };

  return (
    <Form 
      form={form} 
      layout="vertical" 
      onFinish={handleFinish}
      className="female-product-form"
    >
      {/* Gender Indicator
      <div style={{ marginBottom: 16, textAlign: 'center' }}>
        <Tag icon={<WomanOutlined />} color="pink" style={{ fontSize: '14px', padding: '8px 16px' }}>
          Female Product
        </Tag>
      </div> */}

      <Form.Item
        name="name"
        label="Product Name"
        rules={[{ required: true, message: "Please enter product name" }]}
      >
        <Input placeholder="Enter female product name" />
      </Form.Item>

      <Form.Item
        name="price"
        label="Price"
        rules={[{ required: true, message: "Please enter price" }]}
      >
        <InputNumber 
          min={0} 
          style={{ width: "100%" }} 
          placeholder="Enter product price" 
        />
      </Form.Item>

      <Form.Item name="offer" label="Offer">
        <Input placeholder="Enter offer details" />
      </Form.Item>

      <Form.Item name="rating" label="Rating">
        <Input placeholder="Enter rating (e.g. 4.5)" />
      </Form.Item>

      <Form.Item name="tag" label="Tag">
        <Input placeholder="Product tag (e.g. new, hot, etc.)" />
      </Form.Item>

      <Form.Item name="description" label="Description">
        <Input.TextArea rows={3} placeholder="Enter product description for female customers" />
      </Form.Item>

      <Form.Item name="reviews" label="Reviews">
        <Input placeholder="Enter review info" />
      </Form.Item>

      <Form.Item 
        label="Main Image"
        rules={!initialData ? [{ required: true, message: "Please upload product image" }] : []}
      >
        <Upload
          listType="picture"
          maxCount={1}
          fileList={imageFileList}
          onChange={({ fileList }) => setImageFileList(fileList)}
          beforeUpload={() => false}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>
            {initialData ? "Change Main Image" : "Upload Main Image"}
          </Button>
        </Upload>
        {!initialData && (
          <div style={{ color: '#999', fontSize: '12px', marginTop: '4px' }}>
            Main image is required for new products
          </div>
        )}
      </Form.Item>

      <Form.Item label="Icon">
        <Upload
          listType="picture"
          maxCount={1}
          fileList={iconsFileList}
          onChange={({ fileList }) => setIconsFileList(fileList)}
          beforeUpload={() => false}
          accept="image/*"
        >
          <Button icon={<UploadOutlined />}>
            {initialData ? "Change Icon" : "Upload Icon"}
          </Button>
        </Upload>
      </Form.Item>

      {/* Hidden submit button for modal to trigger */}
      <button 
        type="submit" 
        style={{ display: 'none' }}
        className="female-product-form-submit-button"
      />
    </Form>
  );
};

export default FemaleProductForm;