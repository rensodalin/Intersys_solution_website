import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/products_/access-control_/salto_/$productId',
)({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/products_/access-control_/salto_/$productId"!</div>
}
