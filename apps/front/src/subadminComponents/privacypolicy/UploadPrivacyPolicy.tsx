// components/privacypolicy/UploadPrivacyPolicy.tsx
import React, { useState } from "react";
import { Card, Table, Button, Input, Modal, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import PrivacyPolicyForm, { type PrivacyPolicy } from "./PrivacyPolicyForm";

const { Search } = Input;

const UploadPrivacyPolicy: React.FC = () => {
	const [policies, setPolicies] = useState<PrivacyPolicy[]>([]);
	const [searchText, setSearchText] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	// === Add Privacy Policy ===
	const handleAddPolicy = (policy: PrivacyPolicy) => {
		setPolicies((prev) => [...prev, policy]);
		setIsModalOpen(false);
	};

	// === Delete ===
	const handleDelete = (id: string) => {
		Modal.confirm({
			title: "Delete Privacy Policy entry?",
			content: "Are you sure you want to delete this entry?",
			okText: "Yes",
			cancelText: "No",
			onOk: () => setPolicies((prev) => prev.filter((p) => p.id !== id)),
		});
	};

	// === Filtered Data ===
	const filteredPolicies = policies.filter((p) =>
		p.privacyPolicy.toLowerCase().includes(searchText.toLowerCase())
	);

	// === Table Columns ===
	const columns = [
		{
			title: "Privacy Policy",
			dataIndex: "privacyPolicy",
			key: "privacyPolicy",
			render: (text: string) => <div>{text || "-"}</div>,
		},
		{
			title: "Information Collection",
			dataIndex: "informationCollection",
			key: "informationCollection",
			render: (text: string) => <div>{text || "-"}</div>,
		},
		{
			title: "Use of Information",
			dataIndex: "useOfInformation",
			key: "useOfInformation",
			render: (text: string) => <div>{text || "-"}</div>,
		},
		{
			title: "Security",
			dataIndex: "security",
			key: "security",
			render: (text: string) => <div>{text || "-"}</div>,
		},
		{
			title: "Changes to Policy",
			dataIndex: "changesToPolicy",
			key: "changesToPolicy",
			render: (text: string) => <div>{text || "-"}</div>,
		},
		{
			title: "Actions",
			key: "actions",
			render: (_: any, record: PrivacyPolicy) => (
				<Space>
					<Button
						danger
						icon={<DeleteOutlined />}
						onClick={() => handleDelete(record.id)}
					>
						Delete
					</Button>
				</Space>
			),
		},
	];

	return (
		<div className="p-6">
			<Card
				title="Privacy Policy Management"
				extra={
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => setIsModalOpen(true)}
						className="bg-gray-700"
					>
						Add Privacy Policy
					</Button>
				}
			>
				{/* Search */}
				<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<Search
						placeholder="Search Privacy Policies..."
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						allowClear
						size="large"
						className="w-full md:w-1/2 bg-[#2523232c]"
					/>
				</div>

				{/* Table */}
				<Table
					columns={columns}
					dataSource={filteredPolicies}
					rowKey="id"
					locale={{ emptyText: "No privacy policy added" }}
					pagination={{ pageSize: 5 }}
				/>
			</Card>

			{/* Modal */}
			<Modal
				title="Add Privacy Policy"
				open={isModalOpen}
				footer={null}
				onCancel={() => setIsModalOpen(false)}
				destroyOnClose
			>
				<PrivacyPolicyForm onAddPrivacyPolicy={handleAddPolicy} />
			</Modal>
		</div>
	);
};

export default UploadPrivacyPolicy;
