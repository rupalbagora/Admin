import React, { useEffect, useState } from "react";
import { Card, Table, Button, Input, Modal, Space, message } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CertificateForm from "./CertificateForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
	fetchCertificates,
	deleteCertificate,
} from "../../redux/Slice/Uploadcertificate/certificateSlice";
import { type ICertificate } from "../../redux/types/subadmintypes/uploadcertificate.types";

const { Search } = Input;

const ManageCertificates: React.FC = () => {
	const dispatch = useAppDispatch();
	const { items: certificates, loading } = useAppSelector(
		(state) => state.certificates
	);

	const [searchText, setSearchText] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editingCertificate, setEditingCertificate] =
		useState<ICertificate | null>(null);

	useEffect(() => {
		dispatch(fetchCertificates());
	}, [dispatch]);

	const handleDelete = (id: string) => {
		if (!id) return message.error("Certificate ID missing");

		Modal.confirm({
			title: "Delete Certificate?",
			content: "Are you sure you want to delete this certificate?",
			okText: "Yes",
			cancelText: "No",
			onOk: async () => {
				try {
					const result = await dispatch(deleteCertificate(id)).unwrap();
					console.log("Deleted ID:", result);
					message.success("Certificate deleted successfully");
				} catch (err: any) {
					console.error("Delete error:", err);
					message.error(err ?? "Delete failed");
				}
			},
		});
	};

	const handleEdit = (cert: ICertificate) => {
		setEditingCertificate(cert);
		setIsModalOpen(true);
	};

	const filteredCertificates = certificates.filter((cert) =>
		cert.title.toLowerCase().includes(searchText.toLowerCase())
	);

	const columns = [
		{ title: "Title", dataIndex: "title", key: "title" },
		{
			title: "Uploaded At",
			dataIndex: "createdAt",
			render: (date: string) => new Date(date).toLocaleString(),
		},
		{
			title: "Actions",
			key: "actions",
			render: (_: any, record: ICertificate) => (
				<Space>
					<a href={record.imageUrl} target="_blank" rel="noopener noreferrer">
						<Button>View</Button>
					</a>
					<Button icon={<EditOutlined />} onClick={() => handleEdit(record)}>
						Edit
					</Button>
					<Button
						danger
						icon={<DeleteOutlined />}
						onClick={() => handleDelete(record._id!)}
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
				title="Manage Certificates"
				extra={
					<Button
						type="primary"
						icon={<PlusOutlined />}
						onClick={() => {
							setEditingCertificate(null);
							setIsModalOpen(true);
						}}
					>
						Add Certificate
					</Button>
				}
			>
				<div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
					<Search
						placeholder="Search certificates..."
						value={searchText}
						onChange={(e) => setSearchText(e.target.value)}
						allowClear
						size="large"
						className="w-full md:w-1/2"
					/>
				</div>
				<Table
					columns={columns}
					dataSource={filteredCertificates}
					rowKey="_id"
					loading={loading}
					pagination={{ pageSize: 10 }}
				/>
			</Card>

			<Modal
				title={editingCertificate ? "Edit Certificate" : "Add Certificate"}
				open={isModalOpen}
				footer={null}
				onCancel={() => {
					setIsModalOpen(false);
					setEditingCertificate(null);
				}}
				destroyOnClose
			>
				<CertificateForm
					editingCertificate={editingCertificate}
					onSubmit={() => {
						setIsModalOpen(false);
						setEditingCertificate(null);
						dispatch(fetchCertificates());
					}}
				/>
			</Modal>
		</div>
	);
};

export default ManageCertificates;
