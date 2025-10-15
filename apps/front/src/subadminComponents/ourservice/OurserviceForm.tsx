import React from "react";
import {
  Modal,
  Form,
  Input,
  InputNumber,
  Button,
  Space,
  Upload,
  message,
} from "antd";
import { PlusOutlined, MinusCircleOutlined, UploadOutlined } from "@ant-design/icons";

export interface Service {
  id: string;
  serviceName: string;
  price: number;
  title: string;
  highlights: string[];
  extra: { name: string; price: number }[];
  image?: string; // 🆕 Image field
}

interface OurServiceFormProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (service: Service) => void;
}

const OurServiceForm: React.FC<OurServiceFormProps> = ({
  visible,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  // 🎨 Common fixed style for all input boxes
  const fixedInputStyle: React.CSSProperties = {
    height: 40,
    fontSize: 15,
    borderRadius: 6,
  };

  const buttonWidth = 300;

  // Convert image to Base64
  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });

  const handleFinish = async (values: any) => {
    let imageBase64 = "";

    if (values.image && values.image[0]?.originFileObj) {
      imageBase64 = await toBase64(values.image[0].originFileObj);
    }

    const newService: Service = {
      id: Date.now().toString(),
      serviceName: values.serviceName,
      price: values.price,
      title: values.title,
      highlights: values.highlights || [],
      extra: values.extra || [],
      image: imageBase64, // 🆕 Include image
    };

    onSubmit(newService);
    form.resetFields();
  };

  return (
    <Modal
      title="Add Service"
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
          highlights: [""],
          extra: [{ name: "", price: undefined }],
        }}
      >
        {/* Service Name */}
        <Form.Item
          label="Service Name"
          name="serviceName"
          rules={[{ required: true, message: "Please enter service name" }]}
        >
          <Input placeholder="Enter service name" style={fixedInputStyle} />
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

        {/* Title */}
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please enter title" }]}
        >
          <Input placeholder="Enter title" style={fixedInputStyle} />
        </Form.Item>

        {/* Highlights */}
        <Form.Item label="Highlights" required>
          <Form.List name="highlights">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8 }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name]}
                      fieldKey={[field.fieldKey]}
                      rules={[{ required: true, message: "Enter highlight" }]}
                      style={{ width: "100%" }}
                    >
                      <Input
                        placeholder="Enter highlight"
                        style={{ ...fixedInputStyle, width: "100%" }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ color: "red", fontSize: 18 }}
                      />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    style={{ width: buttonWidth }}
                  >
                    Add Highlight
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        {/* Extra */}
        <Form.Item label="Extra">
          <Form.List name="extra">
            {(fields, { add, remove }) => (
              <>
                {fields.map((field) => (
                  <Space
                    key={field.key}
                    style={{ display: "flex", marginBottom: 8, width: "100%" }}
                    align="baseline"
                  >
                    <Form.Item
                      {...field}
                      name={[field.name, "name"]}
                      fieldKey={[field.fieldKey, "name"]}
                      rules={[{ required: true, message: "Enter extra name" }]}
                      style={{ flex: 1 }}
                    >
                      <Input
                        placeholder="Enter extra name"
                        style={fixedInputStyle}
                      />
                    </Form.Item>
                    <Form.Item
                      {...field}
                      name={[field.name, "price"]}
                      fieldKey={[field.fieldKey, "price"]}
                      rules={[{ required: true, message: "Enter price" }]}
                      style={{ width: 300 }}
                    >
                      <InputNumber
                        min={0}
                        placeholder="Price"
                        style={{ ...fixedInputStyle, width: "100%" }}
                      />
                    </Form.Item>
                    {fields.length > 1 && (
                      <MinusCircleOutlined
                        onClick={() => remove(field.name)}
                        style={{ color: "red", fontSize: 18 }}
                      />
                    )}
                  </Space>
                ))}
                <Form.Item>
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    icon={<PlusOutlined />}
                    style={{ width: buttonWidth }}
                  >
                    Add Extra
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        {/* 🆕 Image Upload - moved here after Extra */}
        <Form.Item
          label="Service Image"
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
                message.error("You can only upload image files!");
                return Upload.LIST_IGNORE;
              }
              return false; // prevent auto upload
            }}
          >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OurServiceForm;
