// low-code: v0 made

"use client";

import { Package2, Search } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Product } from "@/types";
import { Card, CardContent, CardHeader } from "../ui/card";

export function ProductList({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <Card className={className}>
      <CardHeader className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Package2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-2xl text-gray-900 dark:text-gray-50">
              Produtos
            </h2>
            <p className="hidden text-gray-600 sm:block dark:text-gray-200">
              Lista de produtos no inventário RFID
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        <div className="space-y-2">
          <Label htmlFor="search" className="font-medium text-sm">
            Buscar produtos
          </Label>
          <div className="relative">
            <Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 transform text-muted-foreground" />
            <Input
              id="search"
              type="text"
              placeholder="Buscar por nome ou código..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-border bg-input pl-10"
            />
          </div>
        </div>
        <div>
          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              {searchTerm
                ? "Nenhum produto encontrado"
                : "Nenhum produto cadastrado"}
            </div>
          ) : (
            <div className="max-h-[70vh] space-y-4 overflow-y-auto">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="mb-2 flex items-start justify-between rounded-lg border border-border bg-muted/30 p-4"
                >
                  <h3 className="font-semibold text-card-foreground">
                    {product.name}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground"
                  >
                    {product.productCode}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
