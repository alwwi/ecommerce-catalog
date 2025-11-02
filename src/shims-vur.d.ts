// Ini memberi tahu TypeScript cara menangani file yang berakhiran .vue
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
