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
  SafetyCertificateOutlined, // 
  FileTextOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchPrivacyPolicy,
  createOrUpdatePrivacyPolicy,
} from "../../../redux/Slice/documents/privacyPolicySlice";
import PrivacyPolicyForm from "./PrivacyPolicyForm";

const ManagePrivacyPolicy: React.FC = () => {
  const dispatch = useAppDispatch();
  const { privacyPolicy, loading, error } = useAppSelector((state: any) => state.privacyPolicy);

  const [modalVisible, setModalVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  useEffect(() => {
    dispatch(fetchPrivacyPolicy());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleSave = async (formData: FormData) => {
    try {
      setSubmitLoading(true);
      await dispatch(createOrUpdatePrivacyPolicy(formData)).unwrap();
      message.success(privacyPolicy ? "✅ Privacy Policy updated successfully" : "✅ Privacy Policy created successfully");
      setModalVisible(false);
      dispatch(fetchPrivacyPolicy());
    } catch (error: any) {
      message.error(error || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleModalOk = () => {
    const privacyPolicyForm = document.querySelector('.privacy-policy-form-submit-button');
    if (privacyPolicyForm) {
      (privacyPolicyForm as HTMLButtonElement).click();
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
          <SafetyCertificateOutlined style={{ marginRight: 8 }} /> {/* ✅ Fixed icon */}
          Privacy Policy Management
        </span>
      }
      extra={
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(fetchPrivacyPolicy())}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setModalVisible(true)}
          >
            {privacyPolicy ? "Edit Privacy Policy" : "Create Privacy Policy"}
          </Button>
        </Space>
      }
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : privacyPolicy ? (
        <div>
          <Descriptions 
            bordered 
            column={1}
            size="default"
            labelStyle={{ fontWeight: 'bold', width: '150px' }}
          >
            <Descriptions.Item label="Title">
              <Tag color="green" style={{ fontSize: '16px', padding: '4px 8px' }}>
                {privacyPolicy.title}
              </Tag>
            </Descriptions.Item>
            
            <Descriptions.Item label="Content">
              <div 
                style={{ 
                  padding: '16px', 
                  backgroundColor: '#fafafa', 
                  borderRadius: '6px',
                  maxHeight: '500px',
                  overflowY: 'auto',
                  fontSize: '14px',
                  lineHeight: '1.6'
                }}
              >
                {formatContent(privacyPolicy.content)}
              </div>
            </Descriptions.Item>
            
            <Descriptions.Item label="Created">
              {new Date(privacyPolicy.createdAt).toLocaleString()}
            </Descriptions.Item>
            
            <Descriptions.Item label="Last Updated">
              {new Date(privacyPolicy.updatedAt).toLocaleString()}
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
          <h3 style={{ color: '#999', marginBottom: '8px' }}>No Privacy Policy Content</h3>
          <p style={{ color: '#999', marginBottom: '16px' }}>
            Click "Create Privacy Policy" to add your privacy policy information
          </p>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Create Privacy Policy
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        title={privacyPolicy ? "Edit Privacy Policy" : "Create Privacy Policy"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
        okText={privacyPolicy ? "Update" : "Create"}
        confirmLoading={submitLoading}
        width={900}
        destroyOnClose
      >
        <PrivacyPolicyForm
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSubmit={handleSave}
          initialData={privacyPolicy}
          loading={submitLoading}
        />
      </Modal>
    </Card>
  );
};

export default ManagePrivacyPolicy;