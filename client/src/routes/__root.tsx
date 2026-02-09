import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'
import Header from '@/components/Header'
import { Separator } from '@/components/ui/separator'
import ErrorComp from '@/components/404'
import { ThemeToggler } from '@/components/ThemeToggler'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: () => <ErrorComp />,
})

function RootComponent() {
  return (
    <>
    <div className='flex gap-4'>
      <Header />
      <ThemeToggler />
    </div>
      <Separator className='my-4' />
      <main className='min-h-screen pt-12'>
        <Outlet />
      </main>
      {/* <ReactQueryDevtools buttonPosition="bottom-left" />
      <TanStackRouterDevtools position="bottom-right" /> */}
    </>
  )
}