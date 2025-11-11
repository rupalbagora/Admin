// import React, { useState } from "react";
// import { Form, Input, Select, Upload, Button, DatePicker } from "antd";
// import { UploadOutlined } from "@ant-design/icons";

// const { Option } = Select;

// interface UserFormProps {
// 	initialValues?: any;
// 	onSubmit: (values: any) => void;
// 	isEditMode?: boolean;
// 	loading?: boolean;
// }

// const UserForm: React.FC<UserFormProps> = ({
// 	initialValues,
// 	onSubmit,
// 	isEditMode,
// 	loading,
// }) => {
// 	const [form] = Form.useForm();
// 	const [isCustom, setIsCustom] = useState(
// 		initialValues?.subscriptionPeriod === "custom"
// 	);

// 	const handleSubscriptionChange = (value: string) => {
// 		setIsCustom(value === "custom");
// 	};

// 	const handleFinish = (values: any) => {
// 		const payload = {
// 			...values,
// 			isActive: values.status === "active",
// 			avatar:
// 				values.image && values.image[0]
// 					? URL.createObjectURL(values.image[0].originFileObj)
// 					: initialValues?.avatar || "",
// 			expireDate:
// 				isCustom && values.customDate
// 					? values.customDate.toISOString()
// 					: undefined,
// 		};

// 		onSubmit(payload);
// 	};

// 	return (
// 		<div className="bg-white p-6 rounded-xl">
// 			<Form
// 				layout="vertical"
// 				form={form}
// 				onFinish={handleFinish}
// 				initialValues={initialValues}
// 				className="grid grid-cols-1 md:grid-cols-2 gap-6"
// 			>
// 				{/* Name */}
// 				<Form.Item
// 					label="Name"
// 					name="fullName"
// 					rules={[{ required: true, message: "Please enter name" }]}
// 				>
// 					<Input placeholder="Enter name" size="large" />
// 				</Form.Item>

// 				{/* Email */}
// 				<Form.Item
// 					label="Email"
// 					name="email"
// 					rules={[
// 						{ required: true, message: "Please enter email" },
// 						{ type: "email", message: "Please enter a valid email" },
// 					]}
// 				>
// 					<Input placeholder="example@email.com" size="large" />
// 				</Form.Item>

// 				{/* Password */}
// 				{!isEditMode && (
// 					<Form.Item
// 						label="Password"
// 						name="password"
// 						rules={[
// 							{ required: true, message: "Please enter password" },
// 							{ min: 8, message: "Password must be at least 8 characters" },
// 						]}
// 					>
// 						<Input.Password placeholder="Enter password" size="large" />
// 					</Form.Item>
// 				)}

// 				{/* Phone */}
// 				<Form.Item
// 					label="Phone"
// 					name="phone"
// 					rules={[{ required: true, message: "Please enter phone number" }]}
// 				>
// 					<Input placeholder="Enter phone number" size="large" />
// 				</Form.Item>

// 				{/* Address */}
// 				<Form.Item
// 					label="Address"
// 					name="address"
// 					rules={[{ required: true, message: "Please enter address" }]}
// 				>
// 					<Input placeholder="Enter address" size="large" />
// 				</Form.Item>

// 				{/* Status */}
// 				<Form.Item
// 					label="Status"
// 					name="status"
// 					rules={[{ required: true, message: "Please select status" }]}
// 				>
// 					<Select placeholder="-- Select --" size="large">
// 						<Option value="active">Active</Option>
// 						<Option value="inactive">Inactive</Option>
// 					</Select>
// 				</Form.Item>

// 				{/* Subscription Period */}
// 				<Form.Item
// 					label="Subscription Period"
// 					name="subscriptionPeriod"
// 					rules={[{ required: true, message: "Please select subscription" }]}
// 				>
// 					<Select
// 						onChange={handleSubscriptionChange}
// 						size="large"
// 						placeholder="Select subscription"
// 					>
// 						{/* <Option value="biannual">Bi-Annual</Option> */}
// 						<Option value="halfyearly">Half-Yearly</Option>
// 						<Option value="yearly">Yearly</Option>
// 						<Option value="custom">Custom</Option>
// 					</Select>
// 				</Form.Item>

// 				{/* Custom Expiry Date */}
// 				{isCustom && (
// 					<Form.Item
// 						label="Custom Expiry Date"
// 						name="customDate"
// 						rules={[{ required: true, message: "Please select custom date" }]}
// 					>
// 						<DatePicker
// 							className="w-full"
// 							size="large"
// 							placeholder="Select custom date"
// 						/>
// 					</Form.Item>
// 				)}

// 				{/* Upload Image */}
// 				<Form.Item
// 					label="Image"
// 					name="image"
// 					valuePropName="fileList"
// 					getValueFromEvent={(e: any) => e.fileList}
// 					className="md:col-span-2"
// 				>
// 					<Upload
// 						beforeUpload={() => false}
// 						listType="picture-card"
// 						maxCount={1}
// 					>
// 						<div>
// 							<UploadOutlined />
// 							<div className="mt-2 text-gray-600">Upload Image</div>
// 						</div>
// 					</Upload>
// 				</Form.Item>

// 				{/* Submit Button */}
// 				<div className="md:col-span-2 flex justify-end mt-4">
// 					<Button
// 						type="primary"
// 						htmlType="submit"
// 						size="large"
// 						loading={loading}
// 						className="px-10 py-2 rounded-lg shadow-sm bg-blue-600 hover:bg-blue-700"
// 					>
// 						{isEditMode ? "Update" : "Create"}
// 					</Button>
// 				</div>
// 			</Form>
// 		</div>
// 	);
// };

// export default UserForm;

import React, { useState } from "react";
import { Form, Input, Select, Upload, Button, DatePicker } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

interface UserFormProps {
	initialValues?: any;
	onSubmit: (values: any) => void;
	isEditMode?: boolean;
	loading?: boolean;
}

const UserForm: React.FC<UserFormProps> = ({
	initialValues,
	onSubmit,
	isEditMode,
	loading,
}) => {
	const [form] = Form.useForm();
	const [isCustom, setIsCustom] = useState(
		initialValues?.subscriptionPeriod === "custom"
	);

	const handleSubscriptionChange = (value: string) => {
		setIsCustom(value === "custom");
	};

	const handleFinish = (values: any) => {
		const currentDate = new Date();
		let expireDate: string | undefined;

		if (values.subscriptionPeriod === "halfyearly") {
			const halfYearLater = new Date(currentDate);
			halfYearLater.setMonth(currentDate.getMonth() + 6);
			expireDate = halfYearLater.toISOString();
		} else if (values.subscriptionPeriod === "yearly") {
			const yearLater = new Date(currentDate);
			yearLater.setFullYear(currentDate.getFullYear() + 1);
			expireDate = yearLater.toISOString();
		} else if (values.subscriptionPeriod === "custom" && values.customDate) {
			expireDate = values.customDate.toISOString();
		}

		const payload = {
			...values,
			isActive: values.status === "active",
			avatar:
				values.image && values.image[0]
					? URL.createObjectURL(values.image[0].originFileObj)
					: initialValues?.avatar || "",
			expireDate,
		};

		onSubmit(payload);
	};

	return (
		<div className="bg-white p-6 rounded-xl">
			<Form
				layout="vertical"
				form={form}
				onFinish={handleFinish}
				initialValues={initialValues}
				className="grid grid-cols-1 md:grid-cols-2 gap-6"
			>
				{/* Name */}
				<Form.Item
					label="Name"
					name="fullName"
					rules={[{ required: true, message: "Please enter name" }]}
				>
					<Input placeholder="Enter name" size="large" />
				</Form.Item>

				{/* Email */}
				<Form.Item
					label="Email"
					name="email"
					rules={[
						{ required: true, message: "Please enter email" },
						{ type: "email", message: "Please enter a valid email" },
					]}
				>
					<Input placeholder="example@email.com" size="large" />
				</Form.Item>

				{/* Password */}
				{!isEditMode && (
					<Form.Item
						label="Password"
						name="password"
						rules={[
							{ required: true, message: "Please enter password" },
							{ min: 8, message: "Password must be at least 8 characters" },
						]}
					>
						<Input.Password placeholder="Enter password" size="large" />
					</Form.Item>
				)}

				{/* Phone */}
				<Form.Item
					label="Phone"
					name="phone"
					rules={[{ required: true, message: "Please enter phone number" }]}
				>
					<Input placeholder="Enter phone number" size="large" />
				</Form.Item>

				{/* Address */}
				<Form.Item
					label="Address"
					name="address"
					rules={[{ required: true, message: "Please enter address" }]}
				>
					<Input placeholder="Enter address" size="large" />
				</Form.Item>

				{/* Status */}
				<Form.Item
					label="Status"
					name="status"
					rules={[{ required: true, message: "Please select status" }]}
				>
					<Select placeholder="-- Select --" size="large">
						<Option value="active">Active</Option>
						<Option value="inactive">Inactive</Option>
					</Select>
				</Form.Item>

				{/* Subscription Period */}
				<Form.Item
					label="Subscription Period"
					name="subscriptionPeriod"
					rules={[{ required: true, message: "Please select subscription" }]}
				>
					<Select
						onChange={handleSubscriptionChange}
						size="large"
						placeholder="Select subscription"
					>
						<Option value="halfyearly">Half-Yearly</Option>
						<Option value="yearly">Yearly</Option>
						<Option value="custom">Custom</Option>
					</Select>
				</Form.Item>

				{/* Custom Expiry Date */}
				{isCustom && (
					<Form.Item
						label="Custom Expiry Date"
						name="customDate"
						rules={[{ required: true, message: "Please select custom date" }]}
					>
						<DatePicker
							className="w-full"
							size="large"
							placeholder="Select custom date"
						/>
					</Form.Item>
				)}

				{/* Upload Image */}
				<Form.Item
					label="Image"
					name="image"
					valuePropName="fileList"
					getValueFromEvent={(e: any) => e.fileList}
					className="md:col-span-2"
				>
					<Upload
						beforeUpload={() => false}
						listType="picture-card"
						maxCount={1}
					>
						<div>
							<UploadOutlined />
							<div className="mt-2 text-gray-600">Upload Image</div>
						</div>
					</Upload>
				</Form.Item>

				{/* Submit Button */}
				<div className="md:col-span-2 flex justify-end mt-4">
					<Button
						type="primary"
						htmlType="submit"
						size="large"
						loading={loading}
						className="px-10 py-2 rounded-lg shadow-sm bg-blue-600 hover:bg-blue-700"
					>
						{isEditMode ? "Update" : "Create"}
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default UserForm;
