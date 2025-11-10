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
  Image,
} from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ReloadOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  fetchAboutSalons,
  addAboutSalon,
  updateAboutSalon,
  deleteAboutSalon,
} from "../../redux/Slice/AboutOurSaloon/aboutSalonSlice";
import AboutSalonForm, { type AboutSalon } from "./AboutSalonForm";

const { Search } = Input;

const ManageAboutSalon: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const { aboutSalons = [], loading = false, error = null } = useAppSelector((state: any) => state.aboutSalons);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingSalon, setEditingSalon] = useState<AboutSalon | null>(null);
  const [searchText, setSearchText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  
  useEffect(() => {
    dispatch(fetchAboutSalons());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);
      if (id) {
        await dispatch(updateAboutSalon({ id, formData })).unwrap();
        message.success("✅ Salon information updated successfully");
      } else {
        await dispatch(addAboutSalon(formData)).unwrap();
        message.success("✅ Salon information added successfully");
      }
      setModalVisible(false);
      setEditingSalon(null);
      dispatch(fetchAboutSalons());
    } catch (error: any) {
      message.error(error || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteAboutSalon(id)).unwrap();
      message.success("🗑️ Salon information deleted successfully");
      dispatch(fetchAboutSalons());
    } catch (error: any) {
      message.error("Failed to delete salon information");
    }
  };

  const handleModalOk = () => {
    const salonForm = document.querySelector('.about-salon-form-submit-button');
    if (salonForm) {
      (salonForm as HTMLButtonElement).click();
    }
  };

  const filteredSalons = aboutSalons.filter((salon: AboutSalon) =>
    salon.title.toLowerCase().includes(searchText.toLowerCase()) ||
    salon.description.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img: string) =>
        img ? (
          <Image
            src={img}
            alt="salon"
            width={80}
            height={60}
            style={{ borderRadius: 6, objectFit: "cover" }}
            preview={true}
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
      title: "Description", 
      dataIndex: "description", 
      key: "description",
      ellipsis: true,
      render: (description: string) => (
        <div style={{ maxWidth: 300 }}>
          {description.length > 100 ? `${description.substring(0, 100)}...` : description}
        </div>
      )
    },
    {
      title: "Created",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: AboutSalon) => (
        <Space>
          {/* Edit Button */}
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingSalon(record);
              setModalVisible(true);
            }}
          />
          
          {/* Delete Button */}
          <Popconfirm
            title="Are you sure to delete this salon information?"
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
      title={
        <span>
          <InfoCircleOutlined style={{ marginRight: 8 }} />
          About Our Salon Management ({aboutSalons.length} entries)
        </span>
      }
      extra={
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(fetchAboutSalons())}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingSalon(null);
              setModalVisible(true);
            }}
          >
            Add Salon Info
          </Button>
        </Space>
      }
    >
      <Search
        placeholder="Search salon information..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ marginBottom: 16, width: "50%" }}
      />

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredSalons}
        loading={loading}
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "No salon information found" }}
      />

      {/* Add/Edit Modal */}
      <Modal
        title={editingSalon ? "Edit Salon Information" : "Add Salon Information"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingSalon(null);
        }}
        onOk={handleModalOk}
        okText={editingSalon ? "Update" : "Create"}
        confirmLoading={submitLoading}
        width={700}
        destroyOnClose
      >
        <AboutSalonForm
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingSalon(null);
          }}
          onSubmit={handleAddOrUpdate}
          initialData={editingSalon}
          loading={submitLoading}
        />
      </Modal>
    </Card>
  );
};

export default ManageAboutSalon;