import React, { useEffect, useState } from "react";
import {
  Card,
  Button,
  Modal,
  message,
  Space,
  Tag,
  Descriptions,
  Spin,
} from "antd";
import {
  EditOutlined,
  ReloadOutlined,
  InfoCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchAboutUs,
  createOrUpdateAboutUs,
} from "../../../redux/Slice/documents/aboutUsSlice";
import AboutUsForm from "./AboutUsForm";

const ManageAboutUs: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const { aboutUs, loading, error } = useAppSelector((state: any) => state.aboutUs);

  const [modalVisible, setModalVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  useEffect(() => {
    dispatch(fetchAboutUs());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleSave = async (formData: FormData) => {
    try {
      setSubmitLoading(true);
      await dispatch(createOrUpdateAboutUs(formData)).unwrap();
      message.success(aboutUs ? "✅ About Us updated successfully" : "✅ About Us created successfully");
      setModalVisible(false);
      dispatch(fetchAboutUs());
    } catch (error: any) {
      message.error(error || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleModalOk = () => {
    const aboutUsForm = document.querySelector('.about-us-form-submit-button');
    if (aboutUsForm) {
      (aboutUsForm as HTMLButtonElement).click();
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} style={{ marginBottom: '16px', lineHeight: '1.6' }}>
        {paragraph}
      </p>
    ));
  };

  return (
    <Card
      title={
        <span>
          <InfoCircleOutlined style={{ marginRight: 8 }} />
          About Us Management
        </span>
      }
      extra={
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(fetchAboutUs())}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setModalVisible(true)}
          >
            {aboutUs ? "Edit About Us" : "Create About Us"}
          </Button>
        </Space>
      }
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : aboutUs ? (
        <div>
          <Descriptions 
            bordered 
            column={1}
            size="default"
            labelStyle={{ fontWeight: 'bold', width: '150px' }}
          >
            <Descriptions.Item label="Title">
              <Tag color="blue" style={{ fontSize: '16px', padding: '4px 8px' }}>
                {aboutUs.title}
              </Tag>
            </Descriptions.Item>
            
            <Descriptions.Item label="Content">
              <div 
                style={{ 
                  padding: '16px', 
                  backgroundColor: '#fafafa', 
                  borderRadius: '6px',
                  maxHeight: '400px',
                  overflowY: 'auto'
                }}
              >
                {formatContent(aboutUs.content)}
              </div>
            </Descriptions.Item>
            
            <Descriptions.Item label="Last Updated">
              {new Date(aboutUs.updatedAt).toLocaleString()}
            </Descriptions.Item>
          </Descriptions>
        </div>
      ) : (
        <div style={{ 
          textAlign: 'center', 
          padding: '50px',
          border: '2px dashed #d9d9d9',
          borderRadius: '8px'
        }}>
          <FileTextOutlined style={{ fontSize: '48px', color: '#d9d9d9', marginBottom: '16px' }} />
          <h3 style={{ color: '#999', marginBottom: '8px' }}>No About Us Content</h3>
          <p style={{ color: '#999', marginBottom: '16px' }}>
            Click "Create About Us" to add your company information
          </p>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Create About Us
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        title={aboutUs ? "Edit About Us" : "Create About Us"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
        okText={aboutUs ? "Update" : "Create"}
        confirmLoading={submitLoading}
        width={800}
        destroyOnClose
      >
        <AboutUsForm
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSubmit={handleSave}
          initialData={aboutUs}
          loading={submitLoading}
        />
      </Modal>
    </Card>
  );
};

export default ManageAboutUs;