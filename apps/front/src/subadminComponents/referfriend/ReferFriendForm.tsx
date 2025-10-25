// components/referfriend/ReferFriendForm.tsx
import React, { useEffect } from "react";
import { Form, Input, Button, message } from "antd";

interface ReferFriend {
  id: string;
  referralCode: string;
  friendEmail: string;
  createdAt: string;
}

interface ReferFriendFormProps {
  onAddReferFriend: (data: ReferFriend) => void;
}

const ReferFriendForm: React.FC<ReferFriendFormProps> = ({ onAddReferFriend }) => {
  const [form] = Form.useForm();

  // Auto-generate referral code when component loads
  useEffect(() => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    form.setFieldsValue({ referralCode: code });
  }, [form]);

  // Handle form submission
  const handleFinish = (values: any) => {
    const newReferFriend: ReferFriend = {
      id: Date.now().toString(),
      referralCode: values.referralCode,
      friendEmail: values.friendEmail,
      createdAt: new Date().toISOString(),
    };

    onAddReferFriend(newReferFriend);
    message.success("Referral sent successfully!");

    // Reset and generate new code
    form.resetFields();
    const newCode = Math.random().toString(36).substring(2, 10).toUpperCase();
    form.setFieldsValue({ referralCode: newCode });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      style={{ marginTop: 10 }}
    >
      {/* === Referral Code === */}
      <Form.Item label="Share Your Referral Code" name="referralCode">
        <Input disabled />
      </Form.Item>

      {/* === Friend's Email === */}
      <Form.Item
        label="Enter Your Friend's Email"
        name="friendEmail"
        rules={[
          { required: true, message: "Please enter your friend's email" },
          { type: "email", message: "Please enter a valid email" },
        ]}
      >
        <Input placeholder="friend@example.com" />
      </Form.Item>

      {/* === Submit === */}
      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-gray-700 w-full">
          Send Referral
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReferFriendForm;
