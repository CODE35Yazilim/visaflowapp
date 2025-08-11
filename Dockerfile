FROM node:18-alpine AS build
WORKDIR /app
RUN corepack enable

# Sadece package.json'ı kopyala ve bağımlılıkları kur
COPY package.json ./
RUN yarn install

# Uygulama kaynaklarını kopyala ve build et
COPY . .
# build:prod yoksa build'e düş
RUN if yarn run | grep -q "build:prod"; then yarn build:prod; else yarn build; fi

FROM nginx:alpine
COPY --from=build /app/dist/VisaFlowApp /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
