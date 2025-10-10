import React, { useEffect, useState } from "react";
import { Card, Table, Button, Input, Modal, Space, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import CertificateForm from "./CertificateForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCertificates, deleteCertificate } from "../../redux/Slice/Uploadcertificate/certificateSlice";

const { Search } = Input;

const ManageCertificates: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items: certificates, loading } = useAppSelector((state) => state.certificates);

  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchCertificates());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Certificate?",
      content: "Are you sure you want to delete this certificate?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          await dispatch(deleteCertificate(id)).unwrap();
          message.success("Certificate deleted successfully");
        } catch (err: any) {
          message.error(err?.message || "Delete failed");
        }
      },
    });
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
      render: (_: any, record: any) => (
        <Space>
          <a href={record.imageUrl} target="_blank" rel="noopener noreferrer">
            <Button>View</Button>
          </a>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record._id)}
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
            onClick={() => setIsModalOpen(true)}
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
          locale={{ emptyText: "No certificates added" }}
          pagination={{ pageSize: 10 }}
        />
      </Card>

      <Modal
        title="Add Certificate"
        open={isModalOpen}
        footer={null}
        onCancel={() => setIsModalOpen(false)}
        destroyOnHidden
      >
        <CertificateForm onSubmit={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ManageCertificates;
