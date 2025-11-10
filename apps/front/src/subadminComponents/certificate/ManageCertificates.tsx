import React, { useEffect, useState } from "react";
import {
  Card,
  Table,
  Button,
  Input,
  Modal,
  message,
  Space,
  Tag,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchCertificates,
  addCertificate,
  updateCertificate,
  deleteCertificate,
} from "../../redux/Slice/Uploadcertificate/certificateSlice";
import CertificateForm, { type Certificate } from "./CertificateForm";

const { Search } = Input;

const ManageCertificates: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // ✅ Using Redux state
  const { certificates = [], loading = false, error = null } = useAppSelector((state: any) => state.certificates);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState<Certificate | null>(null);
  const [searchText, setSearchText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  
  // ✅ Fetch all certificates on mount
  useEffect(() => {
    dispatch(fetchCertificates());
  }, [dispatch]);

  // ✅ Handle errors
  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // ✅ Handle Add or Edit
  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);
      if (id) {
        // ✅ Edit existing certificate
        await dispatch(updateCertificate({ id, formData })).unwrap();
        message.success("✅ Certificate updated successfully");
      } else {
        // ✅ Add new certificate
        await dispatch(addCertificate(formData)).unwrap();
        message.success("✅ Certificate added successfully");
      }
      setModalVisible(false);
      setEditingCertificate(null);
      dispatch(fetchCertificates()); // Refresh the list
    } catch (error: any) {
      console.error("Operation error:", error);
      message.error(error?.message || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  // ✅ Delete Certificate
  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCertificate(id)).unwrap();
      message.success("🗑️ Certificate deleted successfully");
      dispatch(fetchCertificates());
    } catch (error: any) {
      message.error("Failed to delete certificate");
    }
  };

  // ✅ Handle Modal OK/Submit
  const handleModalOk = () => {
    // Trigger form submission from CertificateForm
    const certificateForm = document.querySelector('.certificate-form-submit-button');
    if (certificateForm) {
      (certificateForm as HTMLButtonElement).click();
    }
  };

  // ✅ Filter search results
  const filteredCertificates = certificates.filter((cert: Certificate) =>
    cert.title.toLowerCase().includes(searchText.toLowerCase())
  );

  // ✅ Table Columns
  const columns = [
    {
      title: "Certificate Image",
      dataIndex: "imageUrl",
      key: "imageUrl",
      render: (imageUrl: string) =>
        imageUrl ? (
          <img
            src={imageUrl}
            alt="certificate"
            width={80}
            height={60}
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          <Tag color="red">No Image</Tag>
        ),
    },
    { 
      title: "Title", 
      dataIndex: "title", 
      key: "title" 
    },
    { 
      title: "Uploaded Date", 
      dataIndex: "createdAt", 
      key: "createdAt",
      render: (date: string) => date ? new Date(date).toLocaleDateString() : '-'
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Certificate) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingCertificate(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this certificate?"
            onConfirm={() => handleDelete(record._id!)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Card
      title={`Certificate Management &nbsp; (${certificates.length} certificates)`}
      extra={
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(fetchCertificates())}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingCertificate(null);
              setModalVisible(true);
            }}
          >
            Add Certificate
          </Button>
        </Space>
      }
    >
      <Search
        placeholder="Search certificates by title..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ marginBottom: 16, width: "50%" }}
      />

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredCertificates}
        loading={loading}
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "No certificates found" }}
      />

      <Modal
        title={editingCertificate ? "Edit Certificate" : "Add Certificate"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingCertificate(null);
        }}
        onOk={handleModalOk}
        okText={editingCertificate ? "Update" : "Create"}
        confirmLoading={submitLoading}
        width={600}
        destroyOnClose
      >
        <CertificateForm
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingCertificate(null);
          }}
          onSubmit={handleAddOrUpdate}
          initialData={editingCertificate}
          loading={submitLoading}
        />
      </Modal>
    </Card>
  );
};

export default ManageCertificates;