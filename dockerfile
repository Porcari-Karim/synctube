# ---------------------------------------------------------
# 1. Base image with latest Node and pnpm
# ---------------------------------------------------------
FROM node:latest AS base

# Install pnpm globally
# RUN corepack enable && corepack prepare pnpm@latest --activate
RUN npm install -g pnpm

WORKDIR /app

# ---------------------------------------------------------
# 2. Install dependencies for ALL workspaces
# ---------------------------------------------------------
COPY pnpm-workspace.yaml ./
COPY shared/package.json ./shared/
COPY synctube-backend/package.json ./synctube-backend/

# Copy lock file if you have it
COPY pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

# ---------------------------------------------------------
# 3. Build "shared"
# ---------------------------------------------------------
COPY shared ./shared
RUN pnpm --filter shared run build

# ---------------------------------------------------------
# 4. Build backend
# ---------------------------------------------------------
COPY synctube-backend ./synctube-backend
RUN pnpm --filter synctube-backend run build

# ---------------------------------------------------------
# 5. Runtime image (lighter)
# ---------------------------------------------------------
FROM node:latest AS runtime

# Install pnpm manually
RUN npm install -g pnpm

WORKDIR /app

# Copy only necessary built files
COPY --from=base /app ./

# Expose your backend port
EXPOSE 3000

# ---------------------------------------------------------
# 6. Start the app
# ---------------------------------------------------------
CMD ["pnpm", "--filter", "sunctube-backend", "run", "start"]
