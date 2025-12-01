# Multi-stage build for Angular SSR application

# Stage 1: Build the Angular application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json yarn.lock ./
COPY .npmrc ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build:ssr

FROM node:20-alpine AS production

WORKDIR /app
COPY package.json yarn.lock ./
COPY .npmrc ./
RUN yarn install --frozen-lockfile --production
RUN rm -f .npmrc
COPY --from=builder /app/dist ./dist
EXPOSE 4000
ENV PORT=4000
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:4000', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"
CMD ["node", "dist/sales-pages/server/server.mjs"]
