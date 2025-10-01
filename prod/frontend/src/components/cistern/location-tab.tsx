import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui";
import { MapPin, MapIcon } from "lucide-react";

export function LocationTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Пробеги и местоположения
          </CardTitle>
          <CardDescription>История пробегов цистерны с датами получения данных</CardDescription>
        </CardHeader>
        <CardContent>В разработке...</CardContent>
      </Card>

      <Card className="pb-0 gap-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapIcon className="h-5 w-5" />
            Интерактивная карта
          </CardTitle>
          <CardDescription>Отображение текущего местоположения цистерны на карте</CardDescription>
        </CardHeader>
        <CardContent className="px-0">
          <div className="w-full h-[700px] rounded-lg overflow-hidden border">
            <iframe
              src="https://www.openrailwaymap.org/?style=standard&lat=55.519499&lon=28.5920011&zoom=15"
              className="w-full h-full border-0"
              title="Railway Map - Интерактивная карта"
              allowFullScreen
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
