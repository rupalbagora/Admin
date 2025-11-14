import * as React from 'react';
import { useState } from 'react';
import FemaleHomeServiceForm from './FemaleHomeServiceForm';
import { 
  Card, 
  Table, 
  Input, 
  Button,   
  Space, 
} from "antd";

import { 
  PlusOutlined, 
  ReloadOutlined,
} from "@ant-design/icons";

const { Search } = Input;


const FemaleHomeService : React.FC = ()=>{
  const [modalVisible , setModalVisible] = useState(false);
  const [services, setServices] = useState<Service[]>([
    {
      _id: "1",
      imageUrl: "https://via.placeholder.com/60",
      name: "Hair Cut",
      price: 500,
      description: "Professional hair cut for women",
      extraService: "Includes shampoo",
    },
    {
      _id: "2",
      imageUrl: "https://via.placeholder.com/60",
      name: "Manicure",
      price: 300,
      description: "Beautiful manicure for hands",
      extraService: "Includes nail art",
    },]);

    // return(
    //     <div>
    //         <h1>Female Home service</h1>
    //         <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, consequatur illo eligendi dolores officia asperiores ipsa numquam, tenetur veniam necessitatibus, exercitationem iure similique deserunt perferendis doloribus incidunt molestias eaque dolorem!</p>
    //     </div>
    // )

    const columns = [
  {
    title: "Image",
    dataIndex: "imageUrl",
    key: "imageUrl",
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
    render: (value: string | number) => <span>{value}%</span>,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  { 
    title: "Extra Service", 
    dataIndex: "extraService",
    key: "extraService",
    ellipsis: true 
  },
];

// MAIN COMPONENT

  return (
    <Card
      title={
        <span>
          Female Special Offers 
        </span>
      }
      extra={
        <Space>
          <Button 
            icon={<ReloadOutlined />} 
    
          >
            Refresh
          </Button>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={()=>setModalVisible(true)}
          >
            Add New Offer
          </Button>
        </Space>
      }
    >
      <Search
        placeholder="Search female services..."
        allowClear
        style={{ marginBottom: 16, width: "50%" }}
      />

      <Table
        rowKey="_id"
        columns={columns}
        pagination={{ pageSize: 5 }}
        dataSource={services}
        locale={{ emptyText: "No female offers found" }}
      />

      <FemaleHomeServiceForm 
        visible={modalVisible}
        onCancel={() => setModalVisible(false)} />
    </Card>
  );
};

export default FemaleHomeService;