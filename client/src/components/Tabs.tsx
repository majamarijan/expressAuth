import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function TabsLine() {
  return (
    <Tabs defaultValue="all"  onValueChange={(val)=> console.log(val)} className="text-sm p-0">
      <TabsList variant="line">
        <TabsTrigger value="all" asChild><span className='hover:cursor-pointer'>All</span></TabsTrigger>
        <TabsTrigger value="HP" asChild><span className='hover:cursor-pointer'>HP</span></TabsTrigger>
        <TabsTrigger value="color" asChild><span className='hover:cursor-pointer'>HP</span></TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
