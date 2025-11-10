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
  FileTextOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchTermsCondition,
  createOrUpdateTermsCondition,
} from "../../../redux/Slice/documents/termsConditionSlice";
import TermsConditionForm from "./TermsConditionForm";

const ManageTermsCondition: React.FC = () => {
  const dispatch = useAppDispatch();
  const { termsCondition, loading, error } = useAppSelector((state: any) => state.termsCondition);

  const [modalVisible, setModalVisible] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  
  useEffect(() => {
    dispatch(fetchTermsCondition());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const handleSave = async (formData: FormData) => {
    try {
      setSubmitLoading(true);
      await dispatch(createOrUpdateTermsCondition(formData)).unwrap();
      message.success(termsCondition ? "✅ Terms & Conditions updated successfully" : "✅ Terms & Conditions created successfully");
      setModalVisible(false);
      dispatch(fetchTermsCondition());
    } catch (error: any) {
      message.error(error || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleModalOk = () => {
    const termsConditionForm = document.querySelector('.terms-condition-form-submit-button');
    if (termsConditionForm) {
      (termsConditionForm as HTMLButtonElement).click();
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
          <FileTextOutlined style={{ marginRight: 8 }} />
          Terms & Conditions Management
        </span>
      }
      extra={
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(fetchTermsCondition())}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => setModalVisible(true)}
          >
            {termsCondition ? "Edit Terms & Conditions" : "Create Terms & Conditions"}
          </Button>
        </Space>
      }
    >
      {loading ? (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <Spin size="large" />
        </div>
      ) : termsCondition ? (
        <div>
          <Descriptions 
            bordered 
            column={1}
            size="default"
            labelStyle={{ fontWeight: 'bold', width: '150px' }}
          >
            <Descriptions.Item label="Title">
              <Tag color="orange" style={{ fontSize: '16px', padding: '4px 8px' }}>
                {termsCondition.title}
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
                {formatContent(termsCondition.content)}
              </div>
            </Descriptions.Item>
            
            <Descriptions.Item label="Created">
              {new Date(termsCondition.createdAt).toLocaleString()}
            </Descriptions.Item>
            
            <Descriptions.Item label="Last Updated">
              {new Date(termsCondition.updatedAt).toLocaleString()}
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
          <h3 style={{ color: '#999', marginBottom: '8px' }}>No Terms & Conditions Content</h3>
          <p style={{ color: '#999', marginBottom: '16px' }}>
            Click "Create Terms & Conditions" to add your terms and conditions information
          </p>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => setModalVisible(true)}
          >
            Create Terms & Conditions
          </Button>
        </div>
      )}

      {/* Add/Edit Modal */}
      <Modal
        title={termsCondition ? "Edit Terms & Conditions" : "Create Terms & Conditions"}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleModalOk}
        okText={termsCondition ? "Update" : "Create"}
        confirmLoading={submitLoading}
        width={900}
        destroyOnClose
      >
        <TermsConditionForm
          visible={modalVisible}
          onCancel={() => setModalVisible(false)}
          onSubmit={handleSave}
          initialData={termsCondition}
          loading={submitLoading}
        />
      </Modal>
    </Card>
  );
};

export default ManageTermsCondition;