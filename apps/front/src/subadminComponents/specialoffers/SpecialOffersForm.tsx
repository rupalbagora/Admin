import React from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Upload,
  message,
  Rate,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";

// Type for each special offer
export interface SpecialOffer {
  id: string;
  title: string;
  price: number;
  tag: string;
  image?: string;
  rating: number;
  discount: number;
}

// Props for the modal form
interface SpecialOfferFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (offer: SpecialOffer) => void;
}

const SpecialOfferForm: React.FC<SpecialOfferFormProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  // Convert image file to Base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  // Fixed input styles for uniformity
  const fixedInputStyle: React.CSSProperties = {
    height: 40,
    fontSize: 15,
    borderRadius: 6,
  };

  // Submit handler
  const handleFinish = async (values: any) => {
    let imageBase64 = "";

    if (values.image && values.image[0]?.originFileObj) {
      imageBase64 = await toBase64(values.image[0].originFileObj);
    }

    const newOffer: SpecialOffer = {
      id: Date.now().toString(),
      title: values.title,
      price: values.price,
      tag: values.tag,
      image: imageBase64,
      rating: values.rating || 0,
      discount: values.discount,
    };

    onSubmit(newOffer);
    form.resetFields();
  };

  return (
    <Modal
      title="Add Special Offer"
      open={visible}
      onCancel={onCancel}
      onOk={() => form.submit()}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{
          rating: 0,
          discount: 0,
        }}
      >
        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Enter title" style={fixedInputStyle} />
        </Form.Item>

        {/* Price */}
        <Form.Item
          label="Price (₹)"
          name="price"
          rules={[{ required: true, message: "Please enter price" }]}
        >
          <InputNumber
            min={0}
            placeholder="Enter price"
            style={{ ...fixedInputStyle, width: "100%" }}
          />
        </Form.Item>

        {/* Tag */}
        <Form.Item
          label="Tag"
          name="tag"
          rules={[{ required: true, message: "Please enter tag" }]}
        >
          <Input placeholder="Enter tag (e.g., Hot Deal, Limited Offer)" style={fixedInputStyle} />
        </Form.Item>

        {/* Rating */}
        <Form.Item label="Rating" name="rating">
          <Rate />
        </Form.Item>

        {/* Discount */}
        <Form.Item
          label="Discount (%)"
          name="discount"
          rules={[{ required: true, message: "Please enter discount percentage" }]}
        >
          <InputNumber
            min={0}
            max={100}
            placeholder="Enter discount (0-100)"
            style={{ ...fixedInputStyle, width: "100%" }}
          />
        </Form.Item>

        {/* Image Upload */}
        <Form.Item
          label="Offer Image"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
          rules={[{ required: true, message: "Please upload an image" }]}
        >
          <Upload
            listType="picture"
            maxCount={1}
            beforeUpload={(file) => {
              const isImage = file.type.startsWith("image/");
              if (!isImage) {
                message.error("Only image files are allowed!");
                return Upload.LIST_IGNORE;
              }
              return false;
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SpecialOfferForm;
