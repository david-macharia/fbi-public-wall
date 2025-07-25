# Use Node base image
FROM node:20

# Create app directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN yarn install

# Copy the rest of your code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Sync DB schema (no migration folder needed)
RUN npx prisma db push

# Build the app
RUN yarn build

# Expose port
EXPOSE 3000

# Run the app
CMD ["node", "dist/main"]
