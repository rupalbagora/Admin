import React, { useEffect } from "react";
import { Card, Form, Input, Button, message } from "antd";
import {
  MailOutlined,
  BarcodeOutlined,
  NumberOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  verifyAppointment,
  resetAppointmentState,
} from "../../redux/Slice/appointment/appointmentSlice";

const AppointmentForm: React.FC = () => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const { loading, success, message: successMsg, error } = useAppSelector(
    (state) => state.appointment
  );

  const handleSubmit = (values: { email: string; appointmentCode: string; chairNo: string }) => {
    dispatch(verifyAppointment(values));
  };

  useEffect(() => {
    if (success) {
      message.success(successMsg || "Appointment verified successfully");
      form.resetFields();
      dispatch(resetAppointmentState());
    } else if (error) {
      message.error(error || "Verification failed");
      dispatch(resetAppointmentState());
    }
  }, [success, error, successMsg, dispatch, form]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-8">
      <Card
        title={
          <span className="text-xl font-semibold text-gray-700">
            Verify Appointment
          </span>
        }
        className="w-full max-w-md sm:max-w-lg md:max-w-xl shadow-lg border border-gray-200 rounded-2xl bg-white"
      >
        <Form
          layout="vertical"
          form={form}
          onFinish={handleSubmit}
          requiredMark={false}
          className="mt-4 space-y-4"
        >
          {/* Email Field */}
          <Form.Item
            label={<span className="text-gray-600 font-medium">Email</span>}
            name="email"
            rules={[
              { required: true, message: "Please enter the email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="Enter email address"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Appointment Code */}
          <Form.Item
            label={<span className="text-gray-600 font-medium">Appointment Code</span>}
            name="appointmentCode"
            rules={[{ required: true, message: "Please enter appointment code" }]}
          >
            <Input
              size="large"
              prefix={<BarcodeOutlined className="text-gray-400" />}
              placeholder="Enter appointment code"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Chair Number */}
          <Form.Item
            label={<span className="text-gray-600 font-medium">Chair Number</span>}
            name="chairNo"
            rules={[{ required: true, message: "Please enter chair number" }]}
          >
            <Input
              size="large"
              prefix={<NumberOutlined className="text-gray-400" />}
              placeholder="Enter chair number"
              className="rounded-lg"
            />
          </Form.Item>

          {/* Submit Button */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              icon={<CheckCircleOutlined />}
              loading={loading}
              className="w-full mt-2 bg-blue-600 hover:bg-blue-700 rounded-lg"
              size="large"
            >
              {loading ? "Verifying..." : "Verify Appointment"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AppointmentForm;
