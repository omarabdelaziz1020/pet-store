import { useState } from "react";
import { Form, Input, Button, Card, App } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useAuth } from "../../providers/useAuth";
import { useNavigate } from "react-router-dom";
import "./LoginPage.scss";

const STATIC_EMAIL = "omar@gmail.com";
const STATIC_PASSWORD = "123456";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginFormData>();
  const { message } = App.useApp();

  const handleLogin = async (values: LoginFormData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (
        values.email === STATIC_EMAIL &&
        values.password === STATIC_PASSWORD
      ) {
        login(values.email, "mock-token");
        message.success("Login successful!");
        navigate("/");
      } else {
        message.error("Invalid email or password");
      }
    } catch {
      message.error("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Card className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to your Pet Store account</p>
        </div>

        <div className="demo-info">
          <strong>Demo Credentials:</strong>
          <br />
          Email: <strong>{STATIC_EMAIL}</strong>
          <br />
          Password: <strong>{STATIC_PASSWORD}</strong>
        </div>

        <Form
          form={form}
          name="login"
          onFinish={handleLogin}
          autoComplete="off"
          className="login-form"
          layout="vertical"
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Enter your email"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: "Please enter your password!" },
              { min: 6, message: "Password must be at least 6 characters!" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Enter your password"
              size="large"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="login-button"
              size="large"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
