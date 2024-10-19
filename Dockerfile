# Use Node.js version 20 as the base image
FROM node:20 as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Create a production build
RUN npm run build

# Use a new stage to serve the build
FROM node:20

# Set the working directory in the container
WORKDIR /app

# Install serve globally
RUN npm install -g serve

# Copy the build from the previous stage
COPY --from=build /app/build ./build

# Expose port 3000
EXPOSE 3000

# Serve the build using serve
CMD ["serve", "-s", "build", "-l", "3000"]
