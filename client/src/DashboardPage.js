import React, { useState, useEffect } from 'react';
import { List, Card, Typography, Tag, Button, Spin, Modal, Form, Input, Select, InputNumber, message } from 'antd';
import api from './api';

const { Title } = Typography;
const { Option } = Select;

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchUsers = async () => {
    try {
      const { data } = await api.get('/users');
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinishAddSkill = async (values) => {
    try {
      await api.post('/skills', values);
      message.success('Skill added successfully! Refreshing...');
      setIsModalVisible(false);
      form.resetFields();
      setLoading(true);
      fetchUsers(); 
    } catch (error) {
      message.error('Failed to add skill.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: '20px 50px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <Title level={2}>User Dashboard</Title>
        <div>
          <Button type="primary" onClick={showModal} style={{ marginRight: '10px' }}>
            Add Skill
          </Button>
          <Button type="primary" danger onClick={handleLogout}>Logout</Button>
        </div>
      </div>

      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Card title={user.name}>
              <strong>Location:</strong> {user.location || 'Not specified'}
              <div style={{ marginTop: 10 }}>
                <strong>Skills:</strong>
                <div>
                  {user.skillInfo.map((skill) => (
                    <Tag color="blue" key={skill._id}>
                      {skill.name}
                    </Tag>
                  ))}
                </div>
              </div>
              <Button type="primary" style={{ marginTop: 20 }} disabled>
                Request Swap
              </Button>
            </Card>
          </List.Item>
        )}
      />

      <Modal title="Add a New Skill" visible={isModalVisible} onCancel={handleCancel} footer={null}>
        <Form form={form} layout="vertical" onFinish={onFinishAddSkill}>
          <Form.Item name="name" label="Skill Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Select>
              <Option value="OFFERED">Offered</Option>
              <Option value="WANTED">Wanted</Option>
            </Select>
          </Form.Item>
          <Form.Item name="level" label="Your Level (1-5)" rules={[{ required: true }]}>
            <InputNumber min={1} max={5} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default DashboardPage;
