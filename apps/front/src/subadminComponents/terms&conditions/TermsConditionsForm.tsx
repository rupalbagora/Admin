// // components/terms/TermConditionForm.tsx
// import React from "react";
// import { Form, Input, Button, Checkbox } from "antd";

// // 🔹 Named export for type
// export type TermCondition = {
//   id: string;
//   useOfServices: string;
//   userResponsibilities: string;
//   limitationOfLiability: string;
//   changesOfTerms: string;
//   accepted: boolean;
//   createdAt: string;
// };

// interface TermConditionFormProps {
//   onAddTermCondition: (data: TermCondition) => void;
// }

// const { TextArea } = Input;

// const TermConditionForm: React.FC<TermConditionFormProps> = ({ onAddTermCondition }) => {
//   const [form] = Form.useForm();

//   const handleFinish = (values: any) => {
//     const newTerm: TermCondition = {
//       id: Date.now().toString(),
//       useOfServices: values.useOfServices,
//       userResponsibilities: values.userResponsibilities,
//       limitationOfLiability: values.limitationOfLiability,
//       changesOfTerms: values.changesOfTerms,
//       accepted: values.accepted || false,
//       createdAt: new Date().toISOString(),
//     };

//     onAddTermCondition(newTerm);
//     form.resetFields();
//   };

//   return (
//     <Form form={form} layout="vertical" onFinish={handleFinish} style={{ marginTop: 10 }}>
//       <Form.Item
//         label="Use of Services"
//         name="useOfServices"
//         rules={[{ required: true, message: "Please enter use of services details" }]}
//       >
//         <TextArea rows={3} placeholder="Describe the use of services..." />
//       </Form.Item>

//       <Form.Item
//         label="User Responsibilities"
//         name="userResponsibilities"
//         rules={[{ required: true, message: "Please enter user responsibilities" }]}
//       >
//         <TextArea rows={3} placeholder="Describe user responsibilities..." />
//       </Form.Item>

//       <Form.Item
//         label="Limitation of Liability"
//         name="limitationOfLiability"
//         rules={[{ required: true, message: "Please enter limitation of liability" }]}
//       >
//         <TextArea rows={3} placeholder="Describe limitation of liability..." />
//       </Form.Item>

//       <Form.Item
//         label="Changes of Terms"
//         name="changesOfTerms"
//         rules={[{ required: true, message: "Please describe changes of terms" }]}
//       >
//         <TextArea rows={3} placeholder="Explain how changes of terms will be notified..." />
//       </Form.Item>

//       {/* Checkbox for acceptance */}
//       <Form.Item
//         name="accepted"
//         valuePropName="checked"
//         rules={[{ validator: (_, value) => value ? Promise.resolve() : Promise.reject("You must accept the terms") }]}
//       >
//         <Checkbox>I have read and accept the Terms and Conditions</Checkbox>
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" className="bg-gray-700 w-full">
//           Save Terms & Conditions
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default TermConditionForm;
