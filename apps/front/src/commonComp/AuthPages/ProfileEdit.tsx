import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { updateUserProfile, updateProfile } from '../../redux/Slice/authSlice';
import { Form, Input, Button, Select, DatePicker, Switch, message, Card, Divider, Space } from 'antd';
import AvatarUpload from './AvatarUpload';
import dayjs from 'dayjs';
// import type { IUser, Gender, ThemePreference } from '../../redux/types/auth.types';

const { TextArea } = Input;
const { Option } = Select;

const ProfileEdit: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.auth);
  const [form] = Form.useForm();
  const [avatarLoading, setAvatarLoading] = useState(false);

  // Set form initial values
  useEffect(() => {
    console.log(avatarLoading)
    if (user) {
      form.setFieldsValue({
        ...user,
        dateOfBirth: user.dateOfBirth ? dayjs(user.dateOfBirth) : null,
        // Handle nested preferences
        ...(user.preferences ? {
          theme: user.preferences.theme,
          language: user.preferences.language,
          emailNotifications: user.preferences.notifications?.email,
          pushNotifications: user.preferences.notifications?.push,
          smsNotifications: user.preferences.notifications?.sms,
        } : {})
      });
    }
  }, [user, form]);

  const handleAvatarUpload = async (file: File) => {
    try {
      setAvatarLoading(true);
      const formData = new FormData();
      formData.append('avatar', file);
      await dispatch(updateProfile(formData)).unwrap();
      message.success('Avatar updated successfully');
    } catch (error) {
      message.error('Failed to update avatar');
    } finally {
      setAvatarLoading(false);
    }
  };

  const onFinish = async (values: any) => {
    try {
      // Transform the values to match the API expected format
      const payload = {
        ...values,
        dateOfBirth: values.dateOfBirth ? values.dateOfBirth.toISOString() : undefined,
        preferences: {
          theme: values.theme,
          language: values.language,
          notifications: {
            email: values.emailNotifications,
            push: values.pushNotifications,
            sms: values.smsNotifications
          }
        }
      };

      await dispatch(updateUserProfile(payload)).unwrap();
      message.success('Profile updated successfully');
    } catch (error) {
      message.error('Failed to update profile');
    }
  };

  // Fields that should be disabled for editing
//   const disabledFields = ['email', 'role', 'isVerified', 'isActive', 'subscriptionType', 'subscriptionStatus'];

  return (
    <Card title="Edit Profile" className="p-0">
      <div className="w-full flex flex-col justify-center items-center">
        {/* Left Column - Avatar */}
        <div className="w-full md:w-1/3 flex flex-col items-center">
          <AvatarUpload
            currentAvatar={typeof user?.avatar === 'string' ? user.avatar : user?.avatar?.url}
            onUpload={handleAvatarUpload}
            size={150}
          />
          <p className="mt-4 text-gray-500 text-center">
            Click on the avatar to upload a new image
          </p>
        </div>

        {/* Right Column - Form */}
        <div className="w-full md:w-2/3">
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            className='p-0'
            initialValues={{
              theme: 'light',
              language: 'en',
              emailNotifications: true,
              pushNotifications: false,
              smsNotifications: false
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Basic Information */}
              <Form.Item
                label="First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please input your first name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please input your last name!' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email"
                name="email"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Date of Birth"
                name="dateOfBirth"
              >
                <DatePicker className="w-full" />
              </Form.Item>

              <Form.Item
                label="Gender"
                name="gender"
              >
                <Select>
                  <Option value="male">Male</Option>
                  <Option value="female">Female</Option>
                  <Option value="other">Other</Option>
                  <Option value="prefer-not-to-say">Prefer not to say</Option>
                </Select>
              </Form.Item>

              {/* Account Information (disabled) */}
              <Form.Item
                label="Role"
                name="role"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Verified"
                name="isVerified"
                valuePropName="checked"
              >
                <Switch disabled />
              </Form.Item>

              <Form.Item
                label="Account Status"
                name="isActive"
                valuePropName="checked"
              >
                <Switch disabled />
              </Form.Item>

              <Form.Item
                label="Subscription Type"
                name="subscriptionType"
              >
                <Input disabled />
              </Form.Item>

              <Form.Item
                label="Subscription Status"
                name="subscriptionStatus"
              >
                <Input disabled />
              </Form.Item>
            </div>

            <Divider orientation="left">Preferences</Divider>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item
                label="Theme"
                name="theme"
              >
                <Select>
                  <Option value="light">Light</Option>
                  <Option value="dark">Dark</Option>
                  <Option value="system">System</Option>
                </Select>
              </Form.Item>

              <Form.Item
                label="Language"
                name="language"
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Email Notifications"
                name="emailNotifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="Push Notifications"
                name="pushNotifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>

              <Form.Item
                label="SMS Notifications"
                name="smsNotifications"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </div>

            <Form.Item
              label="Bio"
              name="bio"
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item>
              <Space>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  loading={loading}
                >
                  Update Profile
                </Button>
                <Button htmlType="button" onClick={() => form.resetFields()}>
                  Reset
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Card>
  );
};

export default ProfileEdit;