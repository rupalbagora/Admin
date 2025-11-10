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
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  fetchProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../../../redux/Slice/product/productSlice";
import MaleProductForm, { type Product } from "./MaleProductForm";

const { Search } = Input;

const MaleProducts: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const { products = [], loading = false, error = null } = useAppSelector((state: any) => state.products);

  const [modalVisible, setModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [searchText, setSearchText] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  // ✅ Filter only male products
  const maleProducts = products.filter((product: Product) => product.gender === "Male");

  const handleAddOrUpdate = async (formData: FormData, id?: string) => {
    try {
      setSubmitLoading(true);
      if (id) {
        await dispatch(updateProduct({ id, formData })).unwrap();
        message.success("✅ Male product updated successfully");
      } else {
        await dispatch(addProduct(formData)).unwrap();
        message.success("✅ Male product added successfully");
      }
      setModalVisible(false);
      setEditingProduct(null);
      dispatch(fetchProducts());
    } catch (error: any) {
      message.error(error || "Operation failed");
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      message.success("🗑️ Male product deleted successfully");
      dispatch(fetchProducts());
    } catch (error: any) {
      message.error("Failed to delete product");
    }
  };

  const handleModalOk = () => {
    const productForm = document.querySelector('.male-product-form-submit-button');
    if (productForm) {
      (productForm as HTMLButtonElement).click();
    }
  };

  const filteredProducts = maleProducts.filter((product: Product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchText.toLowerCase()) ||
    product.tag?.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (img: string) =>
        img ? (
          <img
            src={img}
            alt="product"
            width={60}
            height={60}
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          <Tag color="red">No Image</Tag>
        ),
    },
    { 
      title: "Name", 
      dataIndex: "name", 
      key: "name" 
    },
    { 
      title: "Price", 
      dataIndex: "price", 
      key: "price",
      render: (price: string) => `₹${price}`
    },
    { 
      title: "Offer", 
      dataIndex: "offer", 
      key: "offer",
      render: (offer: string) => offer || '-'
    },
    { 
      title: "Rating", 
      dataIndex: "rating", 
      key: "rating",
      render: (rating: string) => rating || '-'
    },
    { 
      title: "Tag", 
      dataIndex: "tag", 
      key: "tag",
      render: (tag: string) => tag ? <Tag color="blue">{tag}</Tag> : '-'
    },
    { 
      title: "Description", 
      dataIndex: "description", 
      key: "description",
      ellipsis: true 
    },
    {
      title: "Icon",
      dataIndex: "icons",
      key: "icons",
      render: (icons: string[]) =>
        icons && icons.length > 0 ? (
          <img
            src={icons[0]}
            alt="icon"
            width={40}
            height={40}
            style={{ borderRadius: 6, objectFit: "cover" }}
          />
        ) : (
          <Tag>No Icon</Tag>
        ),
    },
    // {
    //   title: "Gender",
    //   dataIndex: "gender",
    //   key: "gender",
    //   render: (gender: string) => (
    //     <Tag icon={<ManOutlined />} color="blue">
    //       {gender}
    //     </Tag>
    //   ),
    // },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: Product) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => {
              setEditingProduct(record);
              setModalVisible(true);
            }}
          />
          <Popconfirm
            title="Are you sure to delete this male product?"
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
          {/* <ManOutlined style={{ marginRight: 8 }} /> */}
          Male Products &nbsp; ({maleProducts.length} products)
        </span>
      }
      extra={
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={() => dispatch(fetchProducts())}
            loading={loading}
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setEditingProduct(null);
              setModalVisible(true);
            }}
          >
            Add Product
          </Button>
        </Space>
      }
    >
      <Search
        placeholder="Search male products..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        allowClear
        style={{ marginBottom: 16, width: "50%" }}
      />

      <Table
        rowKey="_id"
        columns={columns}
        dataSource={filteredProducts}
        loading={loading}
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "No male products found" }}
      />

      <Modal
        title={editingProduct ? "Edit Male Product" : "Add Product"}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          setEditingProduct(null);
        }}
        onOk={handleModalOk}
        okText={editingProduct ? "Update" : "Create"}
        confirmLoading={submitLoading}
        width={700}
        destroyOnClose
      >
        <MaleProductForm
          visible={modalVisible}
          onCancel={() => {
            setModalVisible(false);
            setEditingProduct(null);
          }}
          onSubmit={handleAddOrUpdate}
          initialData={editingProduct}
          loading={submitLoading}
        />
      </Modal>
    </Card>
  );
};

export default MaleProducts;