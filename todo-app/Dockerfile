# Base image
FROM node:16-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application
COPY . .

# Build the application
RUN npm run build

# Set environment variables
ENV NODE_ENV=production

# Expose port 3000
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
