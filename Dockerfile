# Imagen de producción de Proteus (Coolify, build pack "Dockerfile", puerto 3000).
# Alpine trae wget (busybox), que es lo que usa el healthcheck de Coolify sobre /api/health.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY package.json package-lock.json ./
# server.cjs se empaqueta con --packages=external: necesita las dependencias de producción (express, vite, @google/genai)
RUN npm ci --omit=dev --no-audit --no-fund && npm cache clean --force
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
CMD ["node", "dist/server.cjs"]
