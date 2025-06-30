# Gunakan image node versi 18 sebagai base image
FROM node:18

# Set working directory di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy seluruh proyek ke dalam container
COPY . .

# Expose port 5173 untuk Vite
EXPOSE 5173

# Jalankan aplikasi menggunakan perintah Vite
CMD ["npm", "run", "dev"]
