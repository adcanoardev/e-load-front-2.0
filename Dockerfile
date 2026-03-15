FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:20-alpine AS runner
RUN apk add --no-cache dumb-init
WORKDIR /app
RUN addgroup -S eload && adduser -S eload -G eload
COPY --from=deps /app/node_modules ./node_modules
COPY --chown=eload:eload . .
USER eload
EXPOSE 5173
ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "run", "dev"]
