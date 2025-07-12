import React, { useState, useEffect } from "react";
import { List, Card, Typography, Tag, Button, Spin } from "antd";
import api from "./api";

const { Title } = Typography;

const DashboardPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await api.get("/users");
        setUsers(data);
      } catch (error) {
        console.error("Failed to fetch users", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px 50px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title level={2}>User Dashboard</Title>
        <Button type="primary" danger onClick={handleLogout}>
          Logout
        </Button>
      </div>
      <List
        grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 4 }}
        dataSource={users}
        renderItem={(user) => (
          <List.Item>
            <Card title={user.name}>
              <strong>Location:</strong> {user.location || "Not specified"}
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
    </div>
  );
};

export default DashboardPage;
