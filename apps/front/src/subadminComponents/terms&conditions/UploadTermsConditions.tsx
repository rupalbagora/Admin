// components/terms/UploadTermConditions.tsx
import React, { useState } from "react";
import { Card, Table, Button, Input, Modal, Space } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import TermConditionForm, { type TermCondition } from "./TermsConditionsForm";

const { Search } = Input;

const UploadTermConditions: React.FC = () => {
	const [terms, setTerms] = useState<TermCondition[]>([]);
	const [searchText, setSearchText] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);

	// Add new term condition
	const handleAddTerm = (term: TermCondition) => {
		setTerms((prev) => [...prev, term]);
		setIsModalOpen(false);
	};

	// Delete term condition
	const handleDelete = (id: string) => {
		Modal.confirm({
			title: "Delete Term Condition?",
			content: "Are you sure you want to delete this entry?",
			okText: "Yes",
			cancelText: "No",
			onOk: () => setTerms((prev) => prev.filter((t) => t.id !== id)),
		});
	};

	// Filter terms
	const filteredTerms = terms.filter((t) =>
		t.useOfServices.toLowerCase().includes(searchText.toLowerCase())
	);

	// Table columns
	const columns = [
		{
			title: "Use of Services",
			dataIndex: "useOfServices",
			key: "useOfServices",
		},
		{
			title: "User Responsibilities",
			dataIndex: "userResponsibilities",
			key: "userResponsibilities",
		},
		{
			title: "Limitation of Liability",
			dataIndex: "limitationOfLiability",
			key: "limitationOfLiability",
		},
		{
			title: "Changes of Terms",
			dataIndex: "changesOfTerms",
			key: "changesOfTerms",
		},
		{
			title: "Accepted",
			dataIndex: "accepted",
			key: "accepted",
			render: (value: boolean) => (value ? "Yes" : "No"),
		},
		{
			title: "Actions",
			key: "actions",
			render: (_: any, record: TermCondition) => (
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
				title="Terms & Conditions Management"
				extra={
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => setIsModalOpen(true)}
						className="bg-gray-700"
					>
						Add Terms & Conditions
					</Button>
				}
			>
				<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<Search
						placeholder="Search Terms..."
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						allowClear
						size="large"
						className="w-full md:w-1/2 bg-[#2523232c]"
					/>
				</div>

				<Table
					columns={columns}
					dataSource={filteredTerms}
					rowKey="id"
					locale={{ emptyText: "No terms added" }}
					pagination={{ pageSize: 5 }}
				/>
			</Card>

			<Modal
				title="Add Terms & Conditions"
				open={isModalOpen}
				footer={null}
				onCancel={() => setIsModalOpen(false)}
				destroyOnClose
			>
				<TermConditionForm onAddTermCondition={handleAddTerm} />
			</Modal>
		</div>
	);
};

// export default UploadTermConditions;
