import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { getOrders, updateOrderStatus, deleteOrder, getOrderStats, Order } from '../../services/orderService';
import { signOut } from '../../services/authService';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 2rem;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const Logo = styled.h1`
  color: #294f02;
  margin: 0;
  font-size: 1.5rem;
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 1rem;
`;

const BackButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const LogoutButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #c82333;
  }
`;

const Content = styled.div`
  max-width: 1400px;
  margin: 5rem auto 0;
`;

const Title = styled.h2`
  color: #294f02;
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const StatCard = styled.div<{ color?: string }>`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  text-align: center;
  border-left: 4px solid ${props => props.color || '#4CAF50'};
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

const StatLabel = styled.div`
  color: #666;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const TableContainer = styled.div`
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  overflow: hidden;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #f9f9f9;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
  color: #333;
  border-bottom: 2px solid #eee;
`;

const Td = styled.td`
  padding: 1rem;
  border-bottom: 1px solid #eee;
  color: #666;
`;

const StatusBadge = styled.span<{ status: string }>`
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;

  ${props => {
    switch (props.status) {
      case 'pending':
        return 'background: #fff3cd; color: #856404;';
      case 'confirmed':
        return 'background: #cce5ff; color: #004085;';
      case 'shipped':
        return 'background: #d4edda; color: #155724;';
      case 'completed':
        return 'background: #d1e7dd; color: #0f5132;';
      case 'cancelled':
        return 'background: #f8d7da; color: #721c24;';
      default:
        return 'background: #e9ecef; color: #495057;';
    }
  }}
`;

const ActionButton = styled.button<{ variant?: 'danger' | 'success' | 'primary' }>`
  padding: 0.3rem 0.6rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.8rem;
  margin-right: 0.5rem;

  ${props => {
    switch (props.variant) {
      case 'danger':
        return 'background: #dc3545; color: white;';
      case 'success':
        return 'background: #28a745; color: white;';
      case 'primary':
        return 'background: #007bff; color: white;';
      default:
        return 'background: #6c757d; color: white;';
    }
  }}

  &:hover {
    opacity: 0.8;
  }
`;

const Select = styled.select`
  padding: 0.3rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.85rem;
  cursor: pointer;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const EmptyMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
`;

const RefreshButton = styled.button`
  background: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 1rem;

  &:hover {
    background: #45a049;
  }
`;

const getStatusText = (status: string) => {
  switch (status) {
    case 'pending': return 'Chờ xử lý';
    case 'confirmed': return 'Đã xác nhận';
    case 'shipped': return 'Đang giao';
    case 'completed': return 'Hoàn thành';
    case 'cancelled': return 'Đã hủy';
    default: return status;
  }
};

const AdminOrdersPage = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    shipped: 0,
    completed: 0,
    cancelled: 0
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);

    const [ordersResult, statsResult] = await Promise.all([
      getOrders(),
      getOrderStats()
    ]);

    if (ordersResult.success && ordersResult.data) {
      setOrders(ordersResult.data);
    }

    if (statsResult.success && statsResult.data) {
      setStats(statsResult.data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    const result = await updateOrderStatus(orderId, newStatus);
    if (result.success) {
      fetchData();
    } else {
      alert('Có lỗi xảy ra khi cập nhật trạng thái!');
    }
  };

  const handleDelete = async (orderId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
      const result = await deleteOrder(orderId);
      if (result.success) {
        fetchData();
      } else {
        alert('Có lỗi xảy ra khi xóa đơn hàng!');
      }
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString('vi-VN');
  };

  return (
    <PageContainer>
      <Header>
        <Logo>ADMIN - Quản lý đơn hàng</Logo>
        <HeaderButtons>
          <BackButton onClick={handleBack}>← Về trang chủ</BackButton>
          <LogoutButton onClick={handleLogout}>Đăng xuất</LogoutButton>
        </HeaderButtons>
      </Header>

      <Content>
        <Title>Quản lý đơn hàng</Title>

        <StatsGrid>
          <StatCard color="#6c757d">
            <StatNumber>{stats.total}</StatNumber>
            <StatLabel>Tổng đơn hàng</StatLabel>
          </StatCard>
          <StatCard color="#ffc107">
            <StatNumber>{stats.pending}</StatNumber>
            <StatLabel>Chờ xử lý</StatLabel>
          </StatCard>
          <StatCard color="#17a2b8">
            <StatNumber>{stats.confirmed}</StatNumber>
            <StatLabel>Đã xác nhận</StatLabel>
          </StatCard>
          <StatCard color="#007bff">
            <StatNumber>{stats.shipped}</StatNumber>
            <StatLabel>Đang giao</StatLabel>
          </StatCard>
          <StatCard color="#28a745">
            <StatNumber>{stats.completed}</StatNumber>
            <StatLabel>Hoàn thành</StatLabel>
          </StatCard>
          <StatCard color="#dc3545">
            <StatNumber>{stats.cancelled}</StatNumber>
            <StatLabel>Đã hủy</StatLabel>
          </StatCard>
        </StatsGrid>

        <RefreshButton onClick={fetchData}>
          🔄 Làm mới dữ liệu
        </RefreshButton>

        <TableContainer>
          {loading ? (
            <LoadingMessage>Đang tải dữ liệu...</LoadingMessage>
          ) : orders.length === 0 ? (
            <EmptyMessage>Chưa có đơn hàng nào</EmptyMessage>
          ) : (
            <Table>
              <thead>
                <tr>
                  <Th>Mã đơn</Th>
                  <Th>Khách hàng</Th>
                  <Th>SĐT</Th>
                  <Th>Sản phẩm</Th>
                  <Th>Tổng tiền</Th>
                  <Th>Thanh toán</Th>
                  <Th>Trạng thái</Th>
                  <Th>Ngày đặt</Th>
                  <Th>Thao tác</Th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <Td><strong>{order.order_code}</strong></Td>
                    <Td>
                      <div>{order.customer_name}</div>
                      <small style={{ color: '#999' }}>{order.customer_email}</small>
                    </Td>
                    <Td>{order.customer_phone}</Td>
                    <Td>
                      <div>{order.package_title}</div>
                      <small style={{ color: '#999' }}>x{order.quantity}</small>
                    </Td>
                    <Td><strong style={{ color: '#FF0000' }}>{order.total_amount}</strong></Td>
                    <Td>{order.payment_method}</Td>
                    <Td>
                      <StatusBadge status={order.status || 'pending'}>
                        {getStatusText(order.status || 'pending')}
                      </StatusBadge>
                    </Td>
                    <Td>{formatDate(order.created_at)}</Td>
                    <Td>
                      <Select
                        value={order.status || 'pending'}
                        onChange={(e) => handleStatusChange(order.id!, e.target.value)}
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="shipped">Đang giao</option>
                        <option value="completed">Hoàn thành</option>
                        <option value="cancelled">Đã hủy</option>
                      </Select>
                      <ActionButton variant="danger" onClick={() => handleDelete(order.id!)}>
                        Xóa
                      </ActionButton>
                    </Td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </TableContainer>
      </Content>
    </PageContainer>
  );
};

export default AdminOrdersPage;
