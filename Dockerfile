### Multi-stage Dockerfile for Vite + React app
### Build stage
FROM node:20-alpine AS build
WORKDIR /app

# copy package files first for caching
COPY package.json package-lock.json* ./
COPY public ./public
COPY src ./src
COPY vite.config.js .

# Allow the API base to be provided at build time (Vite needs it at build)
ARG VITE_API_BASE=http://localhost:8081
RUN echo "VITE_API_BASE=${VITE_API_BASE}" > .env

# install and build
RUN npm install --silent
RUN npm run build

### Production stage - serve with nginx
FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html

# replace default nginx config with our SPA-friendly config
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
