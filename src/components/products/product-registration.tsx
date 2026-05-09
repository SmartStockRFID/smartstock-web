// low-code: v0 made

"use client";

import { Loader2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { CreateProductDTO } from "@/types";
import { type ClassNameProp, cn } from "@/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

export function ProductRegistration({ className }: ClassNameProp) {
  const [formData, setFormData] = useState<CreateProductDTO>({
    nome: "",
    codigo_produto: "",
    descricao: "",
    localizacao: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof CreateProductDTO, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Aqui você deve substituir pela URL da sua API
      const response = await fetch("/api/pecas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const newProduct = await response.json();
        toast.success("Produto cadastrado com sucesso!", {
          description: `${newProduct.nome} foi adicionado ao inventário.`,
        });

        setFormData({
          nome: "",
          codigo_produto: "",
          descricao: "",
          localizacao: "",
        });
      } else {
        throw new Error("Erro ao cadastrar produto");
      }
    } catch (_error) {
      toast.error("Erro ao cadastrar produto", {
        description: "Verifique os dados e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn("h-fit space-y-5", className)}>
      <CardHeader>
        <CardTitle className="font-semibold text-2xl text-gray-900 dark:text-gray-50">
          Cadastrar Produto
        </CardTitle>
        <CardDescription className="text-gray-600 dark:text-gray-200">
          Preencha as informações do produto para adicionar ao sistema
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome" className="font-medium text-sm">
              Nome do Produto *
            </Label>
            <Input
              id="nome"
              type="text"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              placeholder="Ex: Parafuso M8x20"
              required
              className="border-border bg-input"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="codigo_produto" className="font-medium text-sm">
              Código do Produto *
            </Label>
            <Input
              id="codigo_produto"
              type="text"
              value={formData.codigo_produto}
              onChange={(e) =>
                handleInputChange("codigo_produto", e.target.value)
              }
              placeholder="Ex: PAR-M8-20"
              required
              className="border-border bg-input"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Cadastrando...
              </>
            ) : (
              "Cadastrar Produto"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
