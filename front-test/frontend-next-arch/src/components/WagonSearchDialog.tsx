"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Search, Train, Loader2, MapPin, Calendar, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface RailwayCistern {
  id: string;
  number: string;
  buildDate: string;
  wagonType: {
    name: string;
  };
  manufacturer: {
    name: string;
  };
  affiliation: {
    value: string;
  };
}

interface WagonSearchDialogProps {
  children: React.ReactNode;
}

export default function WagonSearchDialog({ children }: WagonSearchDialogProps) {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<RailwayCistern[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(`/api/railway-cisterns/search?query=${encodeURIComponent(searchQuery)}`);
      const data = await response.json();

      if (response.ok) {
        setSearchResults(data);
      } else {
        console.error("Error searching wagons:", data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching wagons:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const resetSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (!newOpen) {
          resetSearch();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn(
          "w-full max-h-[80vh] overflow-hidden flex flex-col",
          searchResults.length > 1 ? "!max-w-6xl" : "!max-w-2xl"
        )}
      >
        <DialogHeader>
          <DialogTitle>Поиск вагона</DialogTitle>
          <DialogDescription>Введите номер вагона для поиска в базе данных</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden flex flex-col">
          <div className="flex gap-2">
            <Input
              placeholder="Введите номер вагона (например: 12345678)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              className="flex-1"
            />
            <Button onClick={handleSearch} disabled={isLoading || !searchQuery.trim()}>
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            </Button>
          </div>

          <div className="flex-1 overflow-y-auto">
            {isLoading && (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Поиск вагонов...</span>
              </div>
            )}

            {!isLoading && hasSearched && searchResults.length === 0 && (
              <div className="text-center py-8">
                <Train className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 mb-2">Вагоны не найдены</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Попробуйте изменить поисковый запрос</p>
              </div>
            )}

            {!isLoading && !hasSearched && (
              <div className="text-center py-8">
                <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">Введите номер вагона для начала поиска</p>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className={cn(searchResults.length > 1 && "grid grid-cols-2 space-x-2 space-y-2")}>
                {searchResults.map((cistern) => (
                  <Card key={cistern.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                            <Train className="w-5 h-5 text-green-600 dark:text-green-400" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white">№ {cistern.number}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{cistern.wagonType.name}</p>
                          </div>
                        </div>
                        <Badge className="bg-green-500 text-white" variant="secondary">
                          В эксплуатации
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">{cistern.affiliation.value}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600 dark:text-gray-400">
                            Изг.: {new Date(cistern.buildDate).toLocaleDateString("ru-RU")}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">{cistern.manufacturer.name}</span>
                        <Link href={`/wagon-passport/${cistern.id}`} onClick={() => setOpen(false)}>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Открыть паспорт
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
