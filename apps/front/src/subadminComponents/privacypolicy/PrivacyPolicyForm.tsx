// components/privacypolicy/PrivacyPolicyForm.tsx
import React from "react";
import { Form, Input, Button } from "antd";

// 🔹 Named export for type
export type PrivacyPolicy = {
  id: string;
  privacyPolicy: string;
  informationCollection: string;
  useOfInformation: string;
  security: string;
  changesToPolicy: string;
  createdAt: string;
};

interface PrivacyPolicyFormProps {
  onAddPrivacyPolicy: (data: PrivacyPolicy) => void;
}

const { TextArea } = Input;

const PrivacyPolicyForm: React.FC<PrivacyPolicyFormProps> = ({ onAddPrivacyPolicy }) => {
  const [form] = Form.useForm();

  const handleFinish = (values: any) => {
    const newPolicy: PrivacyPolicy = {
      id: Date.now().toString(),
      privacyPolicy: values.privacyPolicy,
      informationCollection: values.informationCollection,
      useOfInformation: values.useOfInformation,
      security: values.security,
      changesToPolicy: values.changesToPolicy,
      createdAt: new Date().toISOString(),
    };

    onAddPrivacyPolicy(newPolicy);
    form.resetFields();
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} style={{ marginTop: 10 }}>
      <Form.Item
        label="Privacy Policy Description"
        name="privacyPolicy"
        rules={[{ required: true, message: "Please enter privacy policy" }]}
      >
        <TextArea rows={3} placeholder="Enter privacy policy details..." />
      </Form.Item>

      <Form.Item
        label="Information Collection"
        name="informationCollection"
        rules={[{ required: true, message: "Please enter information collection details" }]}
      >
        <TextArea rows={3} placeholder="Describe what information is collected..." />
      </Form.Item>

      <Form.Item
        label="Use of Information"
        name="useOfInformation"
        rules={[{ required: true, message: "Please enter how information is used" }]}
      >
        <TextArea rows={3} placeholder="Explain how collected information is used..." />
      </Form.Item>

      <Form.Item
        label="Security"
        name="security"
        rules={[{ required: true, message: "Please enter security details" }]}
      >
        <TextArea rows={3} placeholder="Explain how you secure information..." />
      </Form.Item>

      <Form.Item
        label="Changes to Policy"
        name="changesToPolicy"
        rules={[{ required: true, message: "Please describe changes to policy" }]}
      >
        <TextArea rows={3} placeholder="Explain how users will be notified of changes..." />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-gray-700 w-full">
          Save Privacy Policy
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PrivacyPolicyForm;
