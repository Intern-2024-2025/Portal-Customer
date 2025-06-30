# Step 1: Gunakan node image sebagai base
FROM node:16

# Step 2: Set working directory dalam container
WORKDIR /usr/src/app

# Step 3: Copy package.json dan package-lock.json ke dalam working directory
COPY package*.json ./

# Step 4: Install dependencies
#RUN npm install --only=production

# Step 5: Copy seluruh file proyek ke dalam container
COPY . .

# Step 6: Ekspos port yang akan digunakan Express.js
EXPOSE 5003

# Step 7: Jalankan perintah untuk start aplikasi
CMD ["npm", "start"]
