# FROM node:22

# WORKDIR /app

# COPY ./package*.json ./

# RUN npm install

# COPY . .

# EXPOSE 5000

# CMD ["npm", "run", "dev"]


FROM node:22  

WORKDIR /app

# Copy package files first (caches layers)
COPY package*.json ./

RUN npm ci --legacy-peer-deps  # Faster install, handles deps

# Copy source code
COPY . .

# Expose port
EXPOSE 5000

# Run dev script with Nodemon
CMD ["npm", "run", "dev"]