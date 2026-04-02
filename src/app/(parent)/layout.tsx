import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { ChildProvider } from "@/providers/child-provider";
import { CloudDecoration } from "@/components/layout/cloud-decoration";

export default function ParentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ChildProvider>
      <SidebarProvider>
        <AppSidebar role="parent" />
        <SidebarInset>
          <header className="flex h-14 shrink-0 items-center gap-2 border-b bg-background/80 backdrop-blur-sm px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage>PediHealth</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </header>
          <main className="relative flex-1 overflow-y-auto p-3 sm:p-6">
            <CloudDecoration />
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </ChildProvider>
  );
}
