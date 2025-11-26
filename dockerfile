# ---------------------------------------------------------
# 1. Base image with Node.js and pnpm
# ---------------------------------------------------------
FROM node:latest AS base

# Install pnpm globally
RUN npm install -g pnpm

WORKDIR /app

# ---------------------------------------------------------
# 2. Copy all workspace files
# ---------------------------------------------------------
COPY pnpm-workspace.yaml pnpm-lock.yaml package.json ./
COPY shared ./shared
COPY synctube-backend ./synctube-backend

# ---------------------------------------------------------
# 3. Install dependencies
# ---------------------------------------------------------
RUN pnpm install --frozen-lockfile

# ---------------------------------------------------------
# 4. Build workspaces
# ---------------------------------------------------------
RUN pnpm --filter shared run build
RUN pnpm --filter synctube-backend run build

# ---------------------------------------------------------
# 5. Runtime image (lighter)
# ---------------------------------------------------------
FROM node:latest AS runtime

# Install pnpm in runtime as well
RUN npm install -g pnpm

WORKDIR /app

# Copy only the built artifacts and node_modules from base
COPY --from=base /app ./

# Expose your backend port
EXPOSE 5000

# ---------------------------------------------------------
# 6. Start the app
# ---------------------------------------------------------
CMD ["pnpm", "--filter", "sunctube-backend", "run", "start"]
