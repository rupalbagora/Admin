// components/UserForm.tsx
import React from "react";
import {
  Form,
  Input,
  Select,
  Button,
  DatePicker,
  Switch,
  message,
  Upload,
  Avatar,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type {
  IUser,
  // UserRole, SubscriptionType, SubscriptionStatus, Gender
} from "../../redux/types/usera.types";
import moment from "moment";
import { useAppSelector } from "../../redux/hooks";
const { Option } = Select;
const { TextArea } = Input;

interface UserFormProps {
  initialValues?: Partial<IUser>;
  onSubmit: (values: Partial<IUser>) => void;
  isEditMode: boolean;
  loading: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
  initialValues,
  onSubmit,
  isEditMode,
  loading,
}) => {
  const [form] = Form.useForm();
  const [avatarUrl, setAvatarUrl] = React.useState(initialValues?.avatar || "");
  const { user } = useAppSelector((state) => state.auth);
  // Set form initial values
  React.useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        // Convert date strings to moment objects if needed
        dateOfBirth: initialValues.dateOfBirth
          ? moment(initialValues.dateOfBirth)
          : null,
      });
      setAvatarUrl(initialValues.avatar || "");
    }
  }, [initialValues, form]);

  const handleSubmit = async (values: any) => {
    try {
      // Convert moment date to ISO string if present
      if (values.dateOfBirth) {
        values.dateOfBirth = values.dateOfBirth.toISOString();
      }

      // Include avatar URL if it exists
      if (avatarUrl) {
        values.avatar = avatarUrl;
      }

      await onSubmit(values);
    } catch (error) {
      message.error("Failed to submit form");
    }
  };

  const handleAvatarUpload = (info: any) => {
    if (info.file.status === "done") {
      // In a real app, you would upload the file to your server here
      // and set the avatar URL to the response
      setAvatarUrl(URL.createObjectURL(info.file.originFileObj));
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  return (
    <Form
  form={form}
  layout="vertical"
  onFinish={handleSubmit}
  initialValues={{
    role: "user",
    isActive: true,
    isVerified: false,
    subscriptionType: "free",
    subscriptionStatus: "pending",
    preferences: {
      theme: "light",
      language: "en",
      notifications: {
        email: true,
        push: false,
        sms: false,
      },
    },
    ...initialValues,
    dateOfBirth: initialValues?.dateOfBirth
      ? moment(initialValues.dateOfBirth)
      : null,
  }}
>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          {/* Avatar Upload */}
          <Form.Item label="Avatar">
            <div className="flex items-center space-x-4">
              <Avatar src={avatarUrl as string} size={64} className="mb-2">
                {initialValues?.firstName?.[0]}
                {initialValues?.lastName?.[0]}
              </Avatar>
              <Upload
                name="avatar"
                showUploadList={false}
                beforeUpload={() => false} // Prevent automatic upload
                onChange={handleAvatarUpload}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </div>
          </Form.Item>

          {/* Basic Information */}
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please input first name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input last name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input type="email" />
          </Form.Item>

          <Form.Item label="Phone" name="phone">
            <Input />
          </Form.Item>

          {!isEditMode && (
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input password!" },
                { min: 8, message: "Password must be at least 8 characters!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
          )}

          <Form.Item label="Date of Birth" name="dateOfBirth">
            <DatePicker className="w-full" />
          </Form.Item>

          <Form.Item label="Gender" name="gender">
            <Select>
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
              <Option value="prefer-not-to-say">Prefer not to say</Option>
            </Select>
          </Form.Item>
        </div>

        {/* Right Column */}
        <div>
          {/* Account Settings */}
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select>
              {/* <Option value="superadmin">Super Admin</Option> */}
              {user?.role === "superadmin" && (
                <Option value="admin">Admin</Option>
              )}
              {/* <Option value="user">User</Option> */}
              <Option value="staff">Staff</Option>
              <Option value="user">Student</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Subscription Type" name="subscriptionType">
            <Select>
              <Option value="free">Free</Option>
              <Option value="basic">Basic</Option>
              <Option value="premium">Premium</Option>
              <Option value="enterprise">Enterprise</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Subscription Status" name="subscriptionStatus">
            <Select>
              <Option value="active">Active</Option>
              <Option value="pending">Pending</Option>
              <Option value="expired">Expired</Option>
              <Option value="cancelled">Cancelled</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Account Status"
            name="isActive"
            valuePropName="checked"
          >
            <Switch checkedChildren="Active" unCheckedChildren="Inactive" />
          </Form.Item>

          <Form.Item
            label="Verified Account"
            name="isVerified"
            valuePropName="checked"
          >
            <Switch checkedChildren="Verified" unCheckedChildren="Unverified" />
          </Form.Item>

          {/* Preferences */}
          <Form.Item label="Theme Preference" name={["preferences", "theme"]}>
            <Select>
              <Option value="light">Light</Option>
              <Option value="dark">Dark</Option>
              <Option value="system">System</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Language" name={["preferences", "language"]}>
            <Input />
          </Form.Item>

          <Form.Item label="Bio" name="bio">
            <TextArea rows={3} />
          </Form.Item>
        </div>
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <Button type="primary" htmlType="submit" loading={loading}>
          {isEditMode ? "Update User" : "Create User"}
        </Button>
      </div>
    </Form>
  );
};

export default UserForm;
