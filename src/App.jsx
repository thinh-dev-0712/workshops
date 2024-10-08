import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, Popconfirm, Space, Table, theme } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
const { Header, Sider, Content } = Layout;
const App = () => {
    const [products, setProducts] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(`http://localhost:3000/products`);

                setProducts(
                    response.data.map((item) => ({
                        key: item.id,
                        ...item,
                    }))
                );
            } catch (error) {
                console.log(error);
            }
        })();
    }, []);

    const confirm = async (id) => {
        console.log({ id });
        try {
            await axios.delete(`http://localhost:3000/products/${id}`);
            setProducts(products.filter((item) => item.id !== id));
        } catch (error) {
            console.log(error);
        }
    };
    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
            render: (text) => {
                return <strong>{text}</strong>;
            },
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Mô tả",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Hành động",
            key: "action",
            width: 200,
            render: (_, item) => {
                console.log("item", item);
                return (
                    <>
                        <Space>
                            <Popconfirm
                                title="Delete the task"
                                description="Are you sure to delete this task?"
                                onConfirm={() => confirm(item.id)}
                                // onCancel={cancel}
                                okText="Đồng ý"
                                cancelText="Hủy"
                            >
                                <Button type="primary" danger>
                                    Xóa
                                </Button>
                            </Popconfirm>
                            <Button type="primary">Cập nhật</Button>
                        </Space>
                    </>
                );
            },
        },
    ];

    return (
        <Layout className="h-screen">
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={["1"]}
                    items={[
                        {
                            key: "1",
                            icon: <UserOutlined />,
                            label: "nav 1",
                        },
                        {
                            key: "2",
                            icon: <VideoCameraOutlined />,
                            label: "nav 2",
                        },
                        {
                            key: "3",
                            icon: <UploadOutlined />,
                            label: "nav 3",
                        },
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "16px",
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Table dataSource={products} columns={columns} />
                </Content>
            </Layout>
        </Layout>
    );
};
export default App;

/**
 * Bước 1: Click button lấy ID
 * Bước 2: Cần phải có confirm trước khi xóa:
 * Bước 3: Gửi request lên server để xóa sản phẩm dựa theo ID đã click
 * Bước 4: Nếu thành công thì xóa sản phẩm khỏi state: .filter()
 */
