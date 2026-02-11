import {
  Link,
  Outlet,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import React from 'react'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { QueryClient } from '@tanstack/react-query'
import Header from '@/components/Header'
import { Separator } from '@/components/ui/separator'
import ErrorComp from '@/components/404'
import { ThemeToggler } from '@/components/ThemeToggler'
import Footer from '@/components/Footer'

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: RootComponent,
  notFoundComponent: () => <ErrorComp />,
})

function RootComponent() {
  return (
    <React.Fragment>
      <div id='wrapper' className=''>
      <div className='flex gap-4'>
        <Header />
        <ThemeToggler />
      </div>
        <Separator className='my-4' />
        <main className='min-h-[80vh]'>
          <Outlet />
        </main>
        {/* <ReactQueryDevtools buttonPosition="bottom-left" />
        <TanStackRouterDevtools position="bottom-right" /> */}
      <Footer /> 
      </div>
    </React.Fragment>
  )
}