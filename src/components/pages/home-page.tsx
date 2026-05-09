"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { getEmployees, getInventories } from "@/api/queries";
import { cn } from "@/utils";
import { EmployeeForm } from "../employee-registration";
import { EmployeesCard } from "../employees-card";
import { InventoriesCards } from "../inventories-cards/inventories-cards";
import { Toaster } from "../ui/sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ErrorWidget, LoadingWidget } from "./_components";

const PageTabs = {
  inventories: "Inventários",
  employees: "Operadores",
};

export function HomePage() {
  const inventoriesReq = useQuery({
    queryKey: ["inventories"],
    queryFn: getInventories,
  });
  const employeesReq = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("current_tab") ?? PageTabs.inventories;
  return (
    <main className="mx-auto w-full max-w-7xl flex-1 gap-8 px-1 pt-8 pb-2 *:gap-4 max-sm:px-1 sm:flex-row">
      <Toaster />
      <Tabs
        value={currentTab}
        onValueChange={(value) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("current_tab", value);

          router.replace(`/?${params.toString()}`, { scroll: false });
        }}
        className="w-full items-center"
      >
        <TabsList className="w-full max-w-2xl border-2">
          <TabsTrigger value={PageTabs.inventories}>
            {PageTabs.inventories}
          </TabsTrigger>
          <TabsTrigger value={PageTabs.employees}>
            {PageTabs.employees}
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value={PageTabs.inventories}
          className={cn(
            inventoriesReq.status === "success" && "flex w-full gap-4 px-1",
          )}
        >
          {inventoriesReq.status === "pending" && <LoadingWidget />}
          {inventoriesReq.status === "error" && <ErrorWidget />}
          {inventoriesReq.status === "success" && (
            <InventoriesCards inventories={inventoriesReq.data} />
          )}
        </TabsContent>
        <TabsContent
          value={PageTabs.employees}
          className={cn(
            inventoriesReq.status === "success" &&
              "flex w-full gap-4 max-sm:flex-col",
          )}
        >
          {employeesReq.status === "pending" && <LoadingWidget />}
          {employeesReq.status === "error" && <ErrorWidget />}
          {employeesReq.status === "success" && (
            <>
              <EmployeesCard
                emplooyees={employeesReq.data ?? []}
                className="sm:1/2 w-full"
              />
              <EmployeeForm className="h-fit sm:w-1/2" />
            </>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
