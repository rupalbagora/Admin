// components/aboutus/AboutUsForm.tsx
import React from "react";
import { Form, Input, Button } from "antd";

export interface AboutUs {
	id: string;
	welcome: string;
	informationCollection: string;
	useOfInformation: string;
	security: string;
	changesOfPolicy: string;
	createdAt: string;
}

interface AboutUsFormProps {
	onAddAboutUs: (data: AboutUs) => void;
}

const { TextArea } = Input;

const AboutUsForm: React.FC<AboutUsFormProps> = ({ onAddAboutUs }) => {
	const [form] = Form.useForm();

	const handleFinish = (values: any) => {
		const newAboutUs: AboutUs = {
			id: Date.now().toString(),
			welcome: values.welcome,
			informationCollection: values.informationCollection,
			useOfInformation: values.useOfInformation,
			security: values.security,
			changesOfPolicy: values.changesOfPolicy,
			createdAt: new Date().toISOString(),
		};

		onAddAboutUs(newAboutUs);
		form.resetFields();
	};

	return (
		<Form
			form={form}
			layout="vertical"
			onFinish={handleFinish}
			style={{ marginTop: 10 }}
		>
			{/* === Welcome Section === */}
			<Form.Item
				label="Welcome to Our App (Description)"
				name="welcome"
				rules={[
					{ required: true, message: "Please enter welcome description" },
				]}
			>
				<TextArea rows={3} placeholder="Write a short welcome message..." />
			</Form.Item>

			{/* === Information Collection === */}
			<Form.Item
				label="Information Collection"
				name="informationCollection"
				rules={[
					{
						required: true,
						message: "Please enter information collection details",
					},
				]}
			>
				<TextArea
					rows={3}
					placeholder="Describe what information is collected..."
				/>
			</Form.Item>

			{/* === Use of Information === */}
			<Form.Item
				label="Use of Information"
				name="useOfInformation"
				rules={[
					{ required: true, message: "Please enter how information is used" },
				]}
			>
				<TextArea
					rows={3}
					placeholder="Explain how you use collected information..."
				/>
			</Form.Item>

			{/* === Security === */}
			<Form.Item
				label="Security"
				name="security"
				rules={[{ required: true, message: "Please enter security details" }]}
			>
				<TextArea
					rows={3}
					placeholder="Describe how you secure user information..."
				/>
			</Form.Item>

			{/* === Changes of Policy === */}
			<Form.Item
				label="Changes of Policy"
				name="changesOfPolicy"
				rules={[
					{ required: true, message: "Please describe changes of policy" },
				]}
			>
				<TextArea
					rows={3}
					placeholder="Explain how users will be notified of changes..."
				/>
			</Form.Item>

			{/* === Submit === */}
			<Form.Item>
				<Button type="primary" htmlType="submit" className="bg-gray-700 w-full">
					Save About Us
				</Button>
			</Form.Item>
		</Form>
	);
};

export default AboutUsForm;
