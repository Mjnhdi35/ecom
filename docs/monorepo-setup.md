# Monorepo Setup với Nx và pnpm

## Tổng quan

Dự án sử dụng **pnpm workspaces** kết hợp với **Nx** để quản lý monorepo hiệu quả.

## Package Manager: pnpm

### Tại sao pnpm?

1. **Disk Space**: Tiết kiệm disk space với hard links
2. **Speed**: Nhanh hơn npm/yarn
3. **Strict Dependencies**: Ngăn chặn phantom dependencies
4. **Workspace Support**: Built-in workspace support

### Cấu hình (.npmrc)

```ini
# Mỗi workspace có node_modules riêng
shamefully-hoist=false
node-linker=isolated

# Chỉ hoist một số tools cần thiết cho root
public-hoist-pattern[]=*prettier*
public-hoist-pattern[]=*nx*

# Không dùng symlinks, mỗi app có node_modules riêng hoàn toàn
prefer-symlinked-workspace-packages=false
```

### Workspace Configuration (pnpm-workspace.yaml)

```yaml
packages:
  - 'apps/*'
```

## Build System: Nx

### Tại sao Nx?

1. **Caching**: Intelligent caching cho builds và tests
2. **Task Orchestration**: Quản lý dependencies giữa tasks
3. **Affected Detection**: Chỉ build/test những gì thay đổi
4. **Graph Visualization**: Visualize project dependencies

### Cấu hình (nx.json)

```json
{
  "targetDefaults": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["{projectRoot}/build, .output, dist"],
      "cache": true
    },
    "dev": {
      "dependsOn": ["^dev"]
    },
    "lint": {
      "dependsOn": ["^lint"],
      "cache": true
    },
    "tsc": {
      "dependsOn": ["^tsc"],
      "cache": true
    }
  }
}
```

## Project Structure

### Root Level

```
ecom/
├── package.json           # Root dependencies (nx, prettier, typescript)
├── pnpm-workspace.yaml    # Workspace configuration
├── nx.json                # Nx configuration
├── .npmrc                 # pnpm configuration
└── pnpm-lock.yaml         # Lock file
```

### Apps

```
apps/
├── api/                   # NestJS application
│   ├── package.json       # API dependencies
│   └── node_modules/      # Isolated dependencies
└── web/                   # Nuxt.js application
    ├── package.json       # Web dependencies
    └── node_modules/      # Isolated dependencies
```

## Dependency Management

### Root Dependencies

Chỉ chứa các tools chung cho toàn bộ workspace:

- `nx`: Build system
- `prettier`: Code formatting
- `typescript`: Type checking

### App Dependencies

Mỗi app có dependencies riêng:

- **API**: NestJS, TypeORM, Redis, etc.
- **Web**: Nuxt.js, Vue, Tailwind CSS, etc.

### Hoisting Strategy

- **Isolated**: Mỗi app có node_modules riêng
- **Selective Hoisting**: Chỉ hoist một số tools (prettier, nx)
- **No Symlinks**: Mỗi app có dependencies thực sự riêng

## Scripts

### Root Scripts

```json
{
  "scripts": {
    "format": "prettier \"{apps,libs}/**/*.{ts,tsx,vue,js,json}\"",
    "lint": "pnpm nx run-many -t lint",
    "tsc": "pnpm nx run-many -t tsc",
    "build": "pnpm nx run-many -t build",
    "valid": "pnpm format:write && pnpm lint && pnpm tsc && pnpm build"
  }
}
```

### App Scripts

Mỗi app có scripts riêng trong `package.json` của nó.

## Nx Commands

### Run Tasks

```bash
# Run task cho tất cả projects
pnpm nx run-many -t build

# Run task cho một project
pnpm nx build api

# Run task với affected detection
pnpm nx affected -t build
```

### Graph Visualization

```bash
# Visualize project graph
pnpm nx graph
```

## Caching

### Nx Cache

Nx tự động cache:

- Build outputs
- Test results
- Lint results
- Type check results

### Vị trí Cache

- **Local**: `.nx/cache`
- **Remote**: Có thể thiết lập Nx Cloud

## Best Practices

### 1. Dependency Management

- ✅ Mỗi app quản lý dependencies riêng
- ✅ Chỉ hoist tools chung (prettier, nx)
- ✅ Sử dụng exact versions cho production dependencies

### 2. Build Optimization

- ✅ Sử dụng Nx caching
- ✅ Parallel execution khi có thể
- ✅ Affected detection cho CI/CD

### 3. Code Sharing

- ✅ Tạo shared libraries khi cần
- ✅ Sử dụng TypeScript path aliases
- ✅ Shared types trong root hoặc libs

### 4. Testing

- ✅ Unit tests trong mỗi app
- ✅ E2E tests riêng biệt
- ✅ Sử dụng Nx test caching

## Troubleshooting

### Node Modules Conflicts

Nếu gặp conflict, xóa và reinstall:

```bash
rm -rf node_modules apps/*/node_modules pnpm-lock.yaml
pnpm install
```

### Cache Issues

Clear Nx cache:

```bash
pnpm nx reset
```

### Workspace Issues

Verify workspace configuration:

```bash
pnpm list --depth=0
```
