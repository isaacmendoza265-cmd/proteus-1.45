# Imagen de producción de Proteus (Coolify, build pack "Dockerfile", puerto 3000).
# Alpine trae wget (busybox), que es lo que usa el healthcheck de Coolify sobre /api/health.
FROM node:22-alpine AS build
RUN apk add --no-cache openssl
WORKDIR /app
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci --no-audit --no-fund
COPY . .
RUN npx prisma generate && npm run build

FROM node:22-alpine
RUN apk add --no-cache openssl
WORKDIR /app
ENV NODE_ENV=production PORT=3000
COPY package.json package-lock.json ./
COPY prisma ./prisma
# server.cjs se empaqueta con --packages=external: necesita las dependencias de producción (express, vite,
# @google/genai, @prisma/client y el CLI de prisma para aplicar las migraciones)
RUN npm ci --omit=dev --no-audit --no-fund && npx prisma generate && npm cache clean --force
COPY --from=build /app/dist ./dist
USER node
EXPOSE 3000
# Las migraciones se aplican al arrancar: si una falla, el contenedor no arranca y Coolify conserva el anterior
CMD ["sh", "-c", "node_modules/.bin/prisma migrate deploy && exec node dist/server.cjs"]
