import Link from "next/link";
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Menu } from "@/components/admin-panel/menu";
import {
  Sheet,
  SheetHeader,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useStore } from "@/hooks/use-store";
import { useSidebarToggle } from "@/hooks/use-sidebar-toggle";
export function SheetMenu() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;
  return (
    <Sheet>
      <SheetTrigger
        className='lg:hidden'
        asChild
      >
        <Button
          className='h-8'
          variant='outline'
          size='icon'
        >
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent
        className='sm:w-72 px-3 h-full flex flex-col'
        side='left'
      >
        <SheetHeader>
          <Button
            className={cn(
              "transition-transform ease-in-out duration-300 mb-1",
              sidebar?.isOpen === false ? "translate-x-1" : "translate-x-0"
            )}
            variant='link'
            asChild
          >
            <Link
              href='/dashboard'
              className='flex items-center gap-2'
            >
              {/* <Image
                src={Logo}
                alt='Logo'
                width={20}
                height={20}
              /> */}
              <h1
                className={cn(
                  "font-bold text-lg whitespace-nowrap transition-[transform,opacity,display] ease-in-out duration-300 text-[#006fee] dark:text-white",
                  sidebar?.isOpen === false
                    ? "-translate-x-96 opacity-0 hidden"
                    : "translate-x-0 opacity-100"
                )}
              >
                Something
              </h1>
            </Link>
          </Button>
        </SheetHeader>
        <Menu isOpen />
      </SheetContent>
    </Sheet>
  );
}
