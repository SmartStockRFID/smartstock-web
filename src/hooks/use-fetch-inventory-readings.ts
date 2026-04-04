import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getInventoryReadings } from "@/api/queries";
import type {
  InventoryReading,
  InventorySummary,
  ReactQueryRequestStatus,
} from "@/types";

interface UseReadingsReturn {
  selectedInventory: InventorySummary | null;
  setSelectedInventory: (inventory: InventorySummary | null) => void;
  inventoryReadings: InventoryReading[] | null;
  requestStatus: ReactQueryRequestStatus;
}

export function useFetchInventoryReadings(): UseReadingsReturn {
  const [selectedInventory, setSelectedInventory] =
    useState<InventorySummary | null>(null);

  const { data, status } = useQuery({
    enabled: !!selectedInventory,
    queryFn: () =>
      selectedInventory ? getInventoryReadings(selectedInventory.id) : [],
    queryKey: ["inventories", "readings"],
  });

  return {
    selectedInventory,
    setSelectedInventory,
    inventoryReadings: data ?? null,
    requestStatus: status,
  };
}
