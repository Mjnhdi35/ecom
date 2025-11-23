# Nuxt UI - Tài liệu Tham khảo Đầy đủ

> **Nguồn**: Tài liệu này được tổng hợp từ [Nuxt UI Documentation](https://ui.nuxt.com/docs) và [Nuxt Documentation](https://nuxt.com/docs) thông qua MCP (Model Context Protocol).

## 📚 Mục lục

1. [Giới thiệu](#giới-thiệu)
2. [Cài đặt](#cài-đặt)
3. [Components](#components)
4. [Composables](#composables)
5. [Examples & Patterns](#examples--patterns)
6. [Best Practices](#best-practices)
7. [Tài liệu tham khảo](#tài-liệu-tham-khảo)

---

## Giới thiệu

**Nuxt UI** là một thư viện UI toàn diện cho các ứng dụng Vue và Nuxt, cung cấp hơn 110+ components được styled đầy đủ và accessible.

### Tính năng chính

- ✅ **110+ Components**: Button, Form, Table, Modal, và nhiều hơn nữa
- ✅ **Fully Accessible**: Tuân thủ WCAG guidelines
- ✅ **Type-safe**: Hỗ trợ TypeScript đầy đủ
- ✅ **Customizable**: Dễ dàng tùy chỉnh với Tailwind CSS
- ✅ **Dark Mode**: Hỗ trợ light/dark mode out of the box
- ✅ **SSR Ready**: Tương thích với Server-Side Rendering

**Nguồn**: [Nuxt UI Introduction](https://ui.nuxt.com/docs/getting-started)

---

## Cài đặt

### 1. Thêm vào dự án Nuxt

```bash
# Sử dụng pnpm (khuyến nghị)
pnpm add @nuxt/ui

# Hoặc yarn
yarn add @nuxt/ui

# Hoặc npm
npm install @nuxt/ui

# Hoặc bun
bun add @nuxt/ui
```

⚠️ **Lưu ý**: Nếu dùng pnpm, đảm bảo set `shamefully-hoist=true` trong `.npmrc` hoặc cài `tailwindcss` ở root directory.

**Nguồn**: [Nuxt UI Installation Guide](https://ui.nuxt.com/docs/getting-started/installation/nuxt)

### 2. Cấu hình `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui'],
  css: ['~/assets/css/main.css'],
});
```

### 3. Import CSS

```css
/* app/assets/css/main.css */
@import 'tailwindcss';
@import '@nuxt/ui';
```

### 4. Wrap App với UApp Component

```vue
<!-- app.vue -->
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```

> Component `UApp` cung cấp cấu hình global và cần thiết cho **Toast**, **Tooltip** và **Programmatic Overlays**.

**Nguồn**: [Nuxt UI App Component](https://ui.nuxt.com/docs/components/app)

### 5. Sử dụng Template có sẵn

```bash
# Starter template
npm create nuxt@latest -- -t ui

# Landing page
npm create nuxt@latest -- -t ui/landing

# Documentation
npm create nuxt@latest -- -t ui/docs

# SaaS
npm create nuxt@latest -- -t ui/saas

# Dashboard
npm create nuxt@latest -- -t ui/dashboard
```

**Nguồn**: [Nuxt UI Templates](https://ui.nuxt.com/docs/getting-started/installation/nuxt#use-a-nuxt-template)

---

## Components

### Button

Component button có thể hoạt động như link hoặc trigger action.

**Nguồn**: [Button Component Documentation](https://ui.nuxt.com/docs/components/button)

#### Ví dụ cơ bản

```vue
<template>
  <UButton>Click me</UButton>
</template>
```

#### Với màu sắc và variants

```vue
<template>
  <div class="flex flex-wrap gap-2">
    <!-- Colors -->
    <UButton color="primary">Primary</UButton>
    <UButton color="success">Success</UButton>
    <UButton color="error">Error</UButton>
    <UButton color="warning">Warning</UButton>

    <!-- Variants -->
    <UButton variant="solid">Solid</UButton>
    <UButton variant="outline">Outline</UButton>
    <UButton variant="soft">Soft</UButton>
    <UButton variant="ghost">Ghost</UButton>
  </div>
</template>
```

#### Với icon

```vue
<template>
  <UButton icon="i-lucide-rocket" color="primary"> Launch </UButton>
</template>
```

#### Với loading state

```vue
<script setup>
const loading = ref(false);

async function handleClick() {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 2000));
  loading.value = false;
}
</script>

<template>
  <UButton :loading="loading" @click="handleClick"> Submit </UButton>
</template>
```

#### Auto loading với promise

```vue
<script setup>
async function onClick() {
  return new Promise<void>(res => setTimeout(res, 1000))
}
</script>

<template>
  <UButton loading-auto @click="onClick"> Button </UButton>
</template>
```

**Nguồn**: [Button Examples](https://ui.nuxt.com/docs/components/button#loading)

---

### Form

Component form với validation và submission handling tích hợp.

**Nguồn**: [Form Component Documentation](https://ui.nuxt.com/docs/components/form)

#### Form với Valibot

```vue
<script setup lang="ts">
import * as v from 'valibot';
import type { FormSubmitEvent } from '@nuxt/ui';

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Must be at least 8 characters')),
});

type Schema = v.InferOutput<typeof schema>;

const state = reactive({
  email: '',
  password: '',
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: 'Form submitted successfully',
    color: 'success',
  });
  console.log(event.data);
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput
        v-model="state.email"
        type="email"
        placeholder="Enter your email"
      />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput
        v-model="state.password"
        type="password"
        placeholder="Enter your password"
      />
    </UFormField>

    <UButton type="submit">Submit</UButton>
  </UForm>
</template>
```

#### Form với Zod

```vue
<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

const schema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters'),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
  email: undefined,
  password: undefined,
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: 'Form submitted successfully',
    color: 'success',
  });
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormField label="Email" name="email">
      <UInput v-model="state.email" type="email" />
    </UFormField>

    <UFormField label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormField>

    <UButton type="submit">Submit</UButton>
  </UForm>
</template>
```

**Nguồn**: [Form Examples](https://ui.nuxt.com/docs/components/form#schema-validation)

#### Validation libraries hỗ trợ

- [Valibot](https://github.com/fabian-hiller/valibot)
- [Zod](https://github.com/colinhacks/zod)
- [Regle](https://github.com/victorgarciaesgi/regle)
- [Yup](https://github.com/jquense/yup)
- [Joi](https://github.com/hapijs/joi)
- [Superstruct](https://github.com/ianstormtaylor/superstruct)

**Nguồn**: [Form Validation Libraries](https://ui.nuxt.com/docs/components/form#schema-validation)

---

### Input

Input element để nhập text với nhiều tính năng.

**Nguồn**: [Input Component Documentation](https://ui.nuxt.com/docs/components/input)

#### Input cơ bản

```vue
<script setup>
const value = ref('');
</script>

<template>
  <UInput v-model="value" placeholder="Enter text..." />
</template>
```

#### Input với icon

```vue
<template>
  <UInput v-model="value" icon="i-lucide-search" placeholder="Search..." />
</template>
```

#### Input với clear button

```vue
<script setup>
const value = ref('Click to clear');
</script>

<template>
  <UInput
    v-model="value"
    placeholder="Type something..."
    :ui="{ trailing: 'pe-1' }"
  >
    <template v-if="value?.length" #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        icon="i-lucide-circle-x"
        aria-label="Clear input"
        @click="value = ''"
      />
    </template>
  </UInput>
</template>
```

**Nguồn**: [Input Clear Button Example](https://ui.nuxt.com/docs/components/input#with-clear-button)

#### Input password với toggle

```vue
<script setup>
const show = ref(false);
const password = ref('');
</script>

<template>
  <UInput
    v-model="password"
    placeholder="Password"
    :type="show ? 'text' : 'password'"
    :ui="{ trailing: 'pe-1' }"
  >
    <template #trailing>
      <UButton
        color="neutral"
        variant="link"
        size="sm"
        :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
        :aria-label="show ? 'Hide password' : 'Show password'"
        @click="show = !show"
      />
    </template>
  </UInput>
</template>
```

**Nguồn**: [Input Password Toggle Example](https://ui.nuxt.com/docs/components/input#with-password-toggle)

---

### Table

Component table responsive để hiển thị data, built trên TanStack Table.

**Nguồn**: [Table Component Documentation](https://ui.nuxt.com/docs/components/table)

#### Table cơ bản

```vue
<script setup lang="ts">
import { h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';

const UBadge = resolveComponent('UBadge');

type Payment = {
  id: string;
  date: string;
  status: 'paid' | 'failed' | 'refunded';
  email: string;
  amount: number;
};

const data = ref<Payment[]>([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594,
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276,
  },
]);

const columns: TableColumn<Payment>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'date',
    header: 'Date',
    cell: ({ row }) => {
      return new Date(row.getValue('date')).toLocaleString('en-US', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const color = {
        paid: 'success' as const,
        failed: 'error' as const,
        refunded: 'neutral' as const,
      }[row.getValue('status') as string];

      return h(UBadge, { class: 'capitalize', variant: 'subtle', color }, () =>
        row.getValue('status'),
      );
    },
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: () => h('div', { class: 'text-right' }, 'Amount'),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
      }).format(amount);
      return h('div', { class: 'text-right font-medium' }, formatted);
    },
  },
];
</script>

<template>
  <UTable :data="data" :columns="columns" class="flex-1" />
</template>
```

**Nguồn**: [Table Example](https://ui.nuxt.com/docs/components/table#usage)

#### Table với pagination

```vue
<script setup lang="ts">
import { getPaginationRowModel } from '@tanstack/vue-table';
import type { TableColumn } from '@nuxt/ui';

const table = useTemplateRef('table');

type Payment = {
  id: string;
  date: string;
  email: string;
  amount: number;
};

const data = ref<Payment[]>(/* your data */);

const columns: TableColumn<Payment>[] = [
  { accessorKey: 'id', header: '#' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'email', header: 'Email' },
  { accessorKey: 'amount', header: 'Amount' },
];

const pagination = ref({
  pageIndex: 0,
  pageSize: 5,
});
</script>

<template>
  <div class="w-full space-y-4 pb-4">
    <UTable
      ref="table"
      v-model:pagination="pagination"
      :data="data"
      :columns="columns"
      :pagination-options="{
        getPaginationRowModel: getPaginationRowModel(),
      }"
      class="flex-1"
    />

    <div class="flex justify-center border-t border-default pt-4">
      <UPagination
        :default-page="
          (table?.tableApi?.getState().pagination.pageIndex || 0) + 1
        "
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p) => table?.tableApi?.setPageIndex(p - 1)"
      />
    </div>
  </div>
</template>
```

**Nguồn**: [Table Pagination Example](https://ui.nuxt.com/docs/components/table#with-pagination)

---

### Modal

Dialog window để hiển thị message hoặc request user input.

**Nguồn**: [Modal Component Documentation](https://ui.nuxt.com/docs/components/modal)

#### Modal cơ bản

```vue
<script setup>
const open = ref(false);
</script>

<template>
  <div>
    <UButton @click="open = true">Open Modal</UButton>

    <UModal v-model:open="open" title="Modal Title">
      <template #body>
        <p>Modal content goes here</p>
      </template>

      <template #footer>
        <UButton @click="open = false">Close</UButton>
      </template>
    </UModal>
  </div>
</template>
```

#### Modal programmatic

```vue
<script setup lang="ts">
import { LazyModalExample } from '#components';

const count = ref(0);
const toast = useToast();
const overlay = useOverlay();

const modal = overlay.create(LazyModalExample);

async function open() {
  const instance = modal.open({
    count: count.value,
  });

  const shouldIncrement = await instance.result;

  if (shouldIncrement) {
    count.value++;
    toast.add({
      title: `Success: ${shouldIncrement}`,
      color: 'success',
      id: 'modal-success',
    });
    modal.patch({
      count: count.value,
    });
    return;
  }

  toast.add({
    title: `Dismissed: ${shouldIncrement}`,
    color: 'error',
    id: 'modal-dismiss',
  });
}
</script>

<template>
  <UButton label="Open" color="neutral" variant="subtle" @click="open" />
</template>
```

**Nguồn**: [Modal Programmatic Example](https://ui.nuxt.com/docs/components/modal#programmatic-usage)

---

### Select

Select element để chọn từ danh sách options.

**Nguồn**: [Select Component Documentation](https://ui.nuxt.com/docs/components/select)

#### Select cơ bản

```vue
<script setup lang="ts">
const items = ref(['Backlog', 'Todo', 'In Progress', 'Done']);

const selected = ref('Backlog');
</script>

<template>
  <USelect v-model="selected" :items="items" class="w-48" />
</template>
```

#### Select với objects

```vue
<script setup lang="ts">
import type { SelectItem } from '@nuxt/ui';

const items = ref<SelectItem[]>([
  {
    label: 'Backlog',
    value: 'backlog',
    icon: 'i-lucide-circle-help',
  },
  {
    label: 'Todo',
    value: 'todo',
    icon: 'i-lucide-circle-plus',
  },
  {
    label: 'In Progress',
    value: 'in_progress',
    icon: 'i-lucide-circle-arrow-up',
  },
  {
    label: 'Done',
    value: 'done',
    icon: 'i-lucide-circle-check',
  },
]);

const value = ref(items.value[0]?.value);
const icon = computed(
  () => items.value.find((item) => item.value === value.value)?.icon,
);
</script>

<template>
  <USelect
    v-model="value"
    :items="items"
    value-key="value"
    :icon="icon"
    class="w-48"
  />
</template>
```

**Nguồn**: [Select Items Icon Example](https://ui.nuxt.com/docs/components/select#with-icon-in-items)

---

### Tabs

Set of tab panels được hiển thị một lần.

**Nguồn**: [Tabs Component Documentation](https://ui.nuxt.com/docs/components/tabs)

#### Tabs cơ bản

```vue
<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui';

const items: TabsItem[] = [
  {
    label: 'Account',
    icon: 'i-lucide-user',
    slot: 'account',
  },
  {
    label: 'Password',
    icon: 'i-lucide-lock',
    slot: 'password',
  },
];

const state = reactive({
  name: 'Benjamin Canac',
  username: 'benjamincanac',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
});
</script>

<template>
  <UTabs :items="items">
    <template #account>
      <UForm :state="state" class="flex flex-col gap-4">
        <UFormField label="Name" name="name">
          <UInput v-model="state.name" class="w-full" />
        </UFormField>
        <UFormField label="Username" name="username">
          <UInput v-model="state.username" class="w-full" />
        </UFormField>
      </UForm>
    </template>

    <template #password>
      <UForm :state="state" class="flex flex-col gap-4">
        <UFormField label="Current Password" name="current" required>
          <UInput
            v-model="state.currentPassword"
            type="password"
            required
            class="w-full"
          />
        </UFormField>
        <UFormField label="New Password" name="new" required>
          <UInput
            v-model="state.newPassword"
            type="password"
            required
            class="w-full"
          />
        </UFormField>
        <UFormField label="Confirm Password" name="confirm" required>
          <UInput
            v-model="state.confirmPassword"
            type="password"
            required
            class="w-full"
          />
        </UFormField>
      </UForm>
    </template>
  </UTabs>
</template>
```

**Nguồn**: [Tabs Example](https://ui.nuxt.com/docs/components/tabs#usage)

---

### Alert

Callout để thu hút sự chú ý của user.

**Nguồn**: [Alert Component Documentation](https://ui.nuxt.com/docs/components/alert)

#### Alert cơ bản

```vue
<template>
  <UAlert
    title="Heads up!"
    description="You can change the primary color in your app config."
    icon="i-lucide-terminal"
  />
</template>
```

#### Alert với colors

```vue
<template>
  <div class="space-y-4">
    <UAlert
      color="primary"
      title="Primary Alert"
      description="This is a primary alert."
    />
    <UAlert
      color="success"
      title="Success Alert"
      description="Operation completed successfully."
    />
    <UAlert
      color="error"
      title="Error Alert"
      description="Something went wrong."
    />
    <UAlert
      color="warning"
      title="Warning Alert"
      description="Please review your changes."
    />
  </div>
</template>
```

#### Alert với close button

```vue
<template>
  <UAlert
    title="Dismissible Alert"
    description="You can close this alert."
    color="neutral"
    variant="outline"
    close
  />
</template>
```

**Nguồn**: [Alert Examples](https://ui.nuxt.com/docs/components/alert#close)

---

### Avatar

Image element với fallback và Nuxt Image support.

**Nguồn**: [Avatar Component Documentation](https://ui.nuxt.com/docs/components/avatar)

#### Avatar cơ bản

```vue
<template>
  <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
</template>
```

#### Avatar với fallback

```vue
<template>
  <div class="flex gap-2">
    <!-- Fallback với icon -->
    <UAvatar icon="i-lucide-image" size="md" />

    <!-- Fallback với text -->
    <UAvatar text="+1" size="md" />

    <!-- Fallback với initials từ alt -->
    <UAvatar alt="Benjamin Canac" size="md" />
  </div>
</template>
```

#### Avatar với tooltip

```vue
<template>
  <UTooltip text="Benjamin Canac">
    <UAvatar src="https://github.com/benjamincanac.png" alt="Benjamin Canac" />
  </UTooltip>
</template>
```

**Nguồn**: [Avatar Tooltip Example](https://ui.nuxt.com/docs/components/avatar#with-tooltip)

---

### Card

Hiển thị nội dung trong card với header, body và footer.

**Nguồn**: [Card Component Documentation](https://ui.nuxt.com/docs/components/card)

#### Card cơ bản

```vue
<template>
  <UCard>
    <p>Card content</p>
  </UCard>
</template>
```

#### Card với header và footer

```vue
<template>
  <UCard>
    <template #header>
      <h3 class="text-lg font-semibold">Card Title</h3>
    </template>

    <p>This is the card body content.</p>

    <template #footer>
      <div class="flex gap-2">
        <UButton color="primary">Action</UButton>
        <UButton variant="outline">Cancel</UButton>
      </div>
    </template>
  </UCard>
</template>
```

---

## Composables

### useToast

Hiển thị toast notifications trong app.

**Nguồn**: [useToast Composable](https://ui.nuxt.com/docs/composables/use-toast)

```vue
<script setup>
const toast = useToast();

function showToast() {
  toast.add({
    title: 'Success',
    description: 'Operation completed successfully',
    color: 'success',
    icon: 'i-lucide-circle-check',
  });
}
</script>

<template>
  <UButton @click="showToast">Show Toast</UButton>
</template>
```

#### Toast với actions

```vue
<script setup>
const toast = useToast();

function showToast() {
  toast.add({
    title: 'File uploaded',
    description: 'Your file has been uploaded',
    actions: [
      {
        label: 'View',
        click: () => {
          // Handle view action
        },
      },
    ],
  });
}
</script>
```

---

### useOverlay

Điều khiển overlays programmatically.

**Nguồn**: [useOverlay Composable](https://ui.nuxt.com/docs/composables/use-overlay)

```vue
<script setup>
const overlay = useOverlay();

function openModal() {
  overlay.open('Modal', {
    title: 'Hello',
    default: () => h('div', 'World'),
  });
}
</script>

<template>
  <UButton @click="openModal">Open Modal</UButton>
</template>
```

---

### useFormField

Tích hợp custom inputs với Form component.

**Nguồn**: [useFormField Composable](https://ui.nuxt.com/docs/composables/use-form-field)

```vue
<script setup>
const { id, name, error } = useFormField();
</script>
```

---

### defineShortcuts

Định nghĩa keyboard shortcuts trong app.

**Nguồn**: [defineShortcuts Composable](https://ui.nuxt.com/docs/composables/define-shortcuts)

```vue
<script setup>
defineShortcuts({
  '/': () => {
    // Focus search input
    input.value?.inputRef?.focus();
  },
  'meta+k': () => {
    // Open command palette
    open.value = true;
  },
});
</script>
```

---

## Examples & Patterns

### Form với nested validation

```vue
<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

const schema = z.object({
  name: z.string().min(2),
  news: z.boolean().default(false),
});

type Schema = z.output<typeof schema>;

const nestedSchema = z.object({
  email: z.email(),
});

type NestedSchema = z.output<typeof nestedSchema>;

const state = reactive<Partial<Schema & NestedSchema>>({});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  toast.add({
    title: 'Success',
    description: 'The form has been submitted.',
    color: 'success',
  });
}
</script>

<template>
  <UForm
    ref="form"
    :state="state"
    :schema="schema"
    class="gap-4 flex flex-col w-60"
    @submit="onSubmit"
  >
    <UFormField label="Name" name="name">
      <UInput v-model="state.name" placeholder="John Lennon" />
    </UFormField>

    <div>
      <UCheckbox
        v-model="state.news"
        name="news"
        label="Register to our newsletter"
        @update:model-value="state.email = undefined"
      />
    </div>

    <UForm v-if="state.news" :schema="nestedSchema" nested>
      <UFormField label="Email" name="email">
        <UInput v-model="state.email" placeholder="john@lennon.com" />
      </UFormField>
    </UForm>

    <div>
      <UButton type="submit">Submit</UButton>
    </div>
  </UForm>
</template>
```

**Nguồn**: [Form Nested Example](https://ui.nuxt.com/docs/components/form#nesting-forms)

---

### Table với row actions

```vue
<script setup lang="ts">
import { h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';
import { useClipboard } from '@vueuse/core';

const UButton = resolveComponent('UButton');
const UBadge = resolveComponent('UBadge');
const UDropdownMenu = resolveComponent('UDropdownMenu');

const toast = useToast();
const { copy } = useClipboard();

type Payment = {
  id: string;
  date: string;
  status: 'paid' | 'failed' | 'refunded';
  email: string;
  amount: number;
};

const data = ref<Payment[]>([
  /* your data */
]);

const columns: TableColumn<Payment>[] = [
  // ... other columns
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const items = [
        {
          type: 'label',
          label: 'Actions',
        },
        {
          label: 'Copy payment ID',
          onSelect() {
            copy(row.original.id);
            toast.add({
              title: 'Payment ID copied to clipboard!',
              color: 'success',
              icon: 'i-lucide-circle-check',
            });
          },
        },
        {
          type: 'separator',
        },
        {
          label: 'View customer',
        },
        {
          label: 'View payment details',
        },
      ];

      return h(
        'div',
        { class: 'text-right' },
        h(
          UDropdownMenu,
          {
            content: {
              align: 'end',
            },
            items,
            'aria-label': 'Actions dropdown',
          },
          () =>
            h(UButton, {
              icon: 'i-lucide-ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
              'aria-label': 'Actions dropdown',
            }),
        ),
      );
    },
  },
];
</script>

<template>
  <UTable :data="data" :columns="columns" class="flex-1" />
</template>
```

**Nguồn**: [Table Row Actions Example](https://ui.nuxt.com/docs/components/table#with-row-actions)

---

## Best Practices

### 1. Luôn wrap app với UApp component

```vue
<!-- app.vue -->
<template>
  <UApp>
    <NuxtPage />
  </UApp>
</template>
```

Component `UApp` cần thiết cho:

- Toast notifications
- Tooltip components
- Programmatic Overlays

### 2. Sử dụng FormField cho validation

```vue
<UFormField
  label="Email"
  name="email"
  help="We won't share your email."
  required
>
  <UInput v-model="email" type="email" />
</UFormField>
```

### 3. Leverage auto-imports

Không cần import components, chỉ cần sử dụng:

```vue
<template>
  <UButton>Click me</UButton>
</template>
```

### 4. Customize theme trong app.config.ts

```ts
// app.config.ts
export default defineAppConfig({
  ui: {
    button: {
      defaultVariants: {
        color: 'primary',
        size: 'md',
      },
    },
  },
});
```

### 5. Sử dụng TypeScript cho type safety

```ts
import type { FormSubmitEvent } from '@nuxt/ui';
import type { TableColumn } from '@nuxt/ui';
```

### 6. Tận dụng examples trong documentation

Xem examples trong documentation để học cách sử dụng components:

- [Button Examples](https://ui.nuxt.com/docs/components/button#examples)
- [Form Examples](https://ui.nuxt.com/docs/components/form#examples)
- [Table Examples](https://ui.nuxt.com/docs/components/table#examples)

---

## Tài liệu tham khảo

### Official Documentation

- **Nuxt UI Documentation**: https://ui.nuxt.com/docs
- **Nuxt UI Components**: https://ui.nuxt.com/docs/components
- **Nuxt UI Composables**: https://ui.nuxt.com/docs/composables
- **Nuxt Documentation**: https://nuxt.com/docs
- **Nuxt 4.x Getting Started**: https://nuxt.com/docs/4.x/getting-started/introduction

### Component Documentation Links

- [Button](https://ui.nuxt.com/docs/components/button)
- [Form](https://ui.nuxt.com/docs/components/form)
- [Input](https://ui.nuxt.com/docs/components/input)
- [Table](https://ui.nuxt.com/docs/components/table)
- [Modal](https://ui.nuxt.com/docs/components/modal)
- [Select](https://ui.nuxt.com/docs/components/select)
- [Tabs](https://ui.nuxt.com/docs/components/tabs)
- [Alert](https://ui.nuxt.com/docs/components/alert)
- [Avatar](https://ui.nuxt.com/docs/components/avatar)
- [Card](https://ui.nuxt.com/docs/components/card)

### Related Resources

- **TanStack Table**: https://tanstack.com/table/latest (Used by Table component)
- **Reka UI**: https://reka-ui.com (Base components)
- **Tailwind CSS**: https://tailwindcss.com (Styling)
- **Vue.js**: https://vuejs.org (Framework)

### GitHub Repositories

- **Nuxt UI**: https://github.com/nuxt/ui
- **Nuxt**: https://github.com/nuxt/nuxt

---

## Danh sách Components đầy đủ (110+)

### Elements

- Alert, Avatar, AvatarGroup, Badge, Banner, Button, Calendar, Card, Chip, Collapsible, Icon, Kbd, Progress, Separator, Skeleton

### Form

- Checkbox, CheckboxGroup, ColorPicker, FileUpload, Form, FormField, Input, InputDate, InputMenu, InputNumber, InputTags, InputTime, PinInput, RadioGroup, Select, SelectMenu, Slider, Switch, Textarea

### Navigation

- Breadcrumb, CommandPalette, Link, NavigationMenu, Pagination, Stepper, Tabs

### Overlay

- ContextMenu, Drawer, DropdownMenu, Modal, Popover, Slideover, Toast, Tooltip

### Data

- Accordion, Carousel, Empty, Table, Timeline, Tree, User

### Layout

- App, Container, Error, Footer, Header, Main

### Dashboard

- DashboardGroup, DashboardNavbar, DashboardPanel, DashboardSidebar, DashboardToolbar

### Page

- Page, PageHeader, PageHero, PageSection, PageCard, PageGrid, PageList, PageColumns

**Nguồn**: [All Components List](https://ui.nuxt.com/docs/components)

---

_Tài liệu này được tạo từ MCP Nuxt và Nuxt UI documentation. Cập nhật lần cuối: 2024_
