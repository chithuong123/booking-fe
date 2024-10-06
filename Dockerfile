# Sử dụng image Node.js để build ứng dụng React
FROM node:alpine AS builder

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép file package.json và cài đặt các dependencies
COPY package*.json ./
RUN npm install --force

# Sao chép toàn bộ mã nguồn và build ứng dụng React
COPY . .
RUN npm run build

# Sử dụng Nginx để serve các file static sau khi build
FROM nginx:alpine

# Sao chép các file build từ bước builder vào Nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Copy file cấu hình Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expose cổng 80 để Nginx phục vụ ứng dụng
EXPOSE 80

# Khởi động Nginx
CMD ["nginx", "-g", "daemon off;"]
