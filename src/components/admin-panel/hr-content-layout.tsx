"use client";
import * as React from "react";
import { Navbar } from "./navbar";
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import Link from "next/link";
import { ScrollArea } from "../ui/scroll-area";
interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function HrContentLayout({ title, children }: ContentLayoutProps) {
  const pathname = usePathname();
  const generateBreadcrumbs = () => {
    const pathnames = pathname.split('/').filter((x) => x);
    const breadcrumbs = pathnames.map((_, index) => {
      const href = '/' + pathnames.slice(0, index + 1).join('/');
      const isLast = index === pathnames.length - 1;
      return {
        href,
        label: pathnames[index],
        isLast,
      };
    });
    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <div>
      <Navbar title={title} />    
      <div className="container pt-8 pb-8 px-4 sm:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb) => (
              <React.Fragment key={breadcrumb.href}>
                <BreadcrumbItem>
                  {breadcrumb.isLast ? (
                    <BreadcrumbPage className="capitalize">{breadcrumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                        <Link href={breadcrumb.href} className="capitalize flex gap-2 items-center">{breadcrumb.label}
                          <BreadcrumbSeparator />
                        </Link>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <ScrollArea className="min-h-[calc(60vh-1rem)] ">
            {children}
        </ScrollArea>
      
      </div>
    </div>
  );
}
