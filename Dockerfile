# Use an official Node.js runtime as a parent image
FROM node:latest as builder

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code to the container
COPY . .

# Install app dependencies
RUN npm i && npm run ng build

#Create the nginx stage for serving content
FROM nginx:alpine

#Set the working directory to nginx asset directory
WORKDIR /usr/share/nginx/html

#Remove default nginx static assets
RUN rm -rf ./*

#Copy static assets from builder stage
COPY --from=builder /app/dist/sgt-front-dpz .

#Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

#docker build -t "nombreaplicacion" .

#----> El punto es muy importante para indicar la ruta raiz.
#Para eso el dockerfile debe estar en la raiz del proyecto.

#docker run --rm -it -p 8080:80 "angular-nginx-docker"]
