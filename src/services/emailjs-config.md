# Hướng dẫn cấu hình EmailJS

## 1. Đăng ký tài khoản EmailJS

1. Truy cập https://www.emailjs.com/
2. Đăng ký tài khoản miễn phí
3. Xác thực email

## 2. Tạo Email Service

1. Vào Dashboard > Email Services
2. Chọn "Add New Service"
3. Chọn Gmail, Outlook hoặc nhà cung cấp email khác
4. Kết nối với tài khoản email admin
5. Copy Service ID

## 3. Tạo Email Templates

### Template cho đơn hàng (Order Notification):
```
Subject: 🛒 Đơn hàng mới từ {{customer_name}}

Xin chào Admin,

Có đơn hàng mới từ khách hàng:

👤 Tên khách hàng: {{customer_name}}
📧 Email: {{customer_email}}
📞 Số điện thoại: {{customer_phone}}
🏠 Địa chỉ: {{customer_address}}

📦 Sản phẩm: {{package_title}}
💰 Giá: {{package_price}}
🔢 Số lượng: {{quantity}}
💵 Tổng tiền: {{total_amount}}
📅 Ngày đặt: {{order_date}}

Vui lòng liên hệ khách hàng để xác nhận đơn hàng.

Trân trọng,
Hệ thống True Vegan Protein
```

### Template cho tư vấn (Consultation Notification):
```
Subject: 💬 Yêu cầu tư vấn mới từ {{customer_name}}

Xin chào Admin,

Có yêu cầu tư vấn mới:

👤 Tên khách hàng: {{customer_name}}
📧 Email: {{customer_email}}
📞 Số điện thoại: {{customer_phone}}
🏷️ Loại tư vấn: {{consultation_type}}
⏰ Thời gian liên hệ: {{contact_time}}

💬 Nội dung:
{{message}}

📅 Ngày gửi: {{submission_date}}

Vui lòng liên hệ khách hàng để tư vấn.

Trân trọng,
Hệ thống True Vegan Protein
```

## 4. Cấu hình trong code

Mở file `src/services/emailService.ts` và cập nhật:

```typescript
// Thay thế các giá trị này bằng thông tin từ EmailJS Dashboard
const EMAILJS_SERVICE_ID = 'service_xxxxxxx'; // Service ID từ bước 2
const EMAILJS_TEMPLATE_ID_ORDER = 'template_order_xxx'; // Template ID cho đơn hàng
const EMAILJS_TEMPLATE_ID_CONSULTATION = 'template_consultation_xxx'; // Template ID cho tư vấn
const EMAILJS_PUBLIC_KEY = 'xxxxxxxxxxxxxx'; // Public Key từ Account > API Keys
```

## 5. Cập nhật email admin

Trong templateParams, thay đổi email admin:
```typescript
to_email: 'your-admin-email@gmail.com', // Thay bằng email admin thực tế
```

## 6. Test chức năng

1. Chạy ứng dụng: `npm start`
2. Thử đặt hàng để kiểm tra email đơn hàng
3. Thử gửi yêu cầu tư vấn để kiểm tra email tư vấn
4. Kiểm tra hộp thư admin và khách hàng

## 7. Lưu ý bảo mật

- Không commit các key thực tế lên Git
- Sử dụng biến môi trường (.env) cho production:

```env
REACT_APP_EMAILJS_SERVICE_ID=service_xxxxxxx
REACT_APP_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxx
REACT_APP_EMAILJS_TEMPLATE_ORDER=template_order_xxx
REACT_APP_EMAILJS_TEMPLATE_CONSULTATION=template_consultation_xxx
```

Sau đó cập nhật code:
```typescript
const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID!;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY!;
// ...
```