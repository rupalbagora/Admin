// import React, { useState } from "react";
// import { Card, Table, Input, Button, Modal, Tag } from "antd";
// import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
// import OurserviceForm, { Service } from "./OurserviceForm";

// const UploadServices: React.FC = () => {
//   const [services, setServices] = useState<Service[]>([]);
//   const [searchText, setSearchText] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleAddService = (service: Service) => {
//     setServices((prev) => [...prev, service]);
//     setModalVisible(false);
//   };

//   const handleDelete = (id: string) => {
//     Modal.confirm({
//       title: "Delete this service?",
//       onOk: () => setServices((prev) => prev.filter((s) => s.id !== id)),
//     });
//   };

//   const filteredServices = services.filter(
//     (s) =>
//       s.serviceName.toLowerCase().includes(searchText.toLowerCase()) ||
//       s.title.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const columns = [
//     {
//       title: "Service Name",
//       dataIndex: "serviceName",
//       key: "serviceName",
//       render: (text: string) => text || "-",
//     },
//     {
//       title: "Price (₹)",
//       dataIndex: "price",
//       key: "price",
//       render: (value: number) => (value ? `₹${value}` : "-"),
//     },
//     {
//       title: "Title",
//       dataIndex: "title",
//       key: "title",
//       render: (text: string) => text || "-",
//     },
//     {
//       title: "Image",
//       dataIndex: "image",
//       key: "image",
//       render: (img: string) =>
//         img ? (
//           <img
//             src={img}
//             alt="service"
//             style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 8 }}
//           />
//         ) : (
//           "-"
//         ),
//     },
//     {
//       title: "Highlights",
//       dataIndex: "highlights",
//       key: "highlights",
//       render: (highlights: string[] = []) =>
//         highlights.length > 0 ? (
//           highlights.map((h, i) => (
//             <Tag color="gold" key={i}>
//               {h}
//             </Tag>
//           ))
//         ) : (
//           <Tag color="default">None</Tag>
//         ),
//     },
//     {
//       title: "Extra",
//       dataIndex: "extra",
//       key: "extra",
//       render: (extra: { name: string; price: number }[] = []) =>
//         extra.length > 0 ? (
//           extra.map((e, i) => (
//             <Tag color="green" key={i}>
//               {`${e.name} ₹${e.price}`}
//             </Tag>
//           ))
//         ) : (
//           <Tag color="default">None</Tag>
//         ),
//     },
//     {
//       title: "Actions",
//       key: "actions",
//       render: (_: any, record: Service) => (
//         <Button
//           danger
//           icon={<DeleteOutlined />}
//           onClick={() => handleDelete(record.id)}
//         >
//           Delete
//         </Button>
//       ),
//     },
//   ];

//   return (
//     <div style={{ padding: 24 }}>
//       <Card
//         title="Service Management"
//         extra={
//           <Button
//             icon={<PlusOutlined />}
//             type="primary"
//             onClick={() => setModalVisible(true)}
//           >
//             Add Service
//           </Button>
//         }
//       >
//         <Input.Search
//           placeholder="Search services..."
//           value={searchText}
//           onChange={(e) => setSearchText(e.target.value)}
//           allowClear
//           style={{ marginBottom: 16, width: "50%" }}
//         />

//         <Table
//           columns={columns}
//           dataSource={filteredServices}
//           rowKey={(record) => record.id.toString()}
//           locale={{ emptyText: "No services added" }}
//         />
//       </Card>

//       <OurserviceForm
//         visible={modalVisible}
//         onCancel={() => setModalVisible(false)}
//         onSubmit={handleAddService}
//       />
//     </div>
//   );
// };

// export default UploadServices;
