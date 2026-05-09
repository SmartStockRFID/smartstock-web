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
    <main className="flex-1 w-full max-w-7xl mx-auto max-sm:px-1 sm:flex-row pt-8 gap-8 *:gap-4 pb-2 px-1">
      <Toaster />
      <Tabs
        value={currentTab}
        onValueChange={(value) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("current_tab", value);

          router.replace(`/?${params.toString()}`, { scroll: false });
        }}
        className="items-center w-full"
      >
        <TabsList className="w-full max-w-2xl border-2 ">
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
              "flex max-sm:flex-col w-full gap-4",
          )}
        >
          {employeesReq.status === "pending" && <LoadingWidget />}
          {employeesReq.status === "error" && <ErrorWidget />}
          {employeesReq.status === "success" && (
            <>
              <EmployeesCard
                emplooyees={employeesReq.data ?? []}
                className="w-full sm:1/2"
              />
              <EmployeeForm className="sm:w-1/2 h-fit" />
            </>
          )}
        </TabsContent>
      </Tabs>
    </main>
  );
}
