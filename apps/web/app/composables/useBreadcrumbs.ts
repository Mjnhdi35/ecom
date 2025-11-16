export interface Breadcrumb {
  label: string
  path?: string
}

export const useBreadcrumbs = (items: Breadcrumb[]) => {
  return computed(() => items)
}
