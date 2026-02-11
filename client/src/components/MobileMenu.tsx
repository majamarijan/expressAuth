import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react"; // icon library
import { Link } from "@tanstack/react-router";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { VisuallyHidden } from "radix-ui";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet>
      {/* Trigger button (hamburger icon) */}
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>

      {/* Menu content */}
      <SheetContent side="left" className={`w-64 items-start pl-6`} onMouseLeave={()=> setOpen(false)} showCloseButton={false}>
        <SheetHeader className="px-0">
          <SheetTitle className="text-2xl font-bold">Menu</SheetTitle>
        </SheetHeader>
    <NavigationMenu className="items-start">
        <NavigationMenuList className={`flex-col items-start justify-start`}>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
            <Link
              to="/"
              activeProps={{
                className: "font-bold",
              }}
              activeOptions={{ exact: true }}
            >
              Home
            </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
             <Link
              to="/about"
              activeProps={{
                className: "font-bold",
              }}
            >
              About
            </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
            <Link
              to="/cards"
              activeProps={{
                className: "font-bold",
              }}
            >
              Cards
            </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
            <Link
              to="/login"
              activeProps={{
                className: "font-bold",
              }}
              className="outline-1 outline-solid outline-slate-600"
            >
              Login/Register
            </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      </SheetContent>
    </Sheet>
  );
}
