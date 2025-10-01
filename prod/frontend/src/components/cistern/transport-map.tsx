'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';

// Исправляем иконки по умолчанию для Leaflet
delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface TransportMapProps {
  lat?: number;
  lng?: number;
  zoom?: number;
  className?: string;
}

export function TransportMap({ 
  lat = 55.48702, 
  lng = 28.77972, 
  zoom = 14,
  className = "w-full h-full"
}: TransportMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstanceRef.current) {
      // Создаем карту
      const map = L.map(mapRef.current).setView([lat, lng], zoom);

      // Транспортный слой OpenStreetMap - используем официальные тайлы транспорта
      const transportLayer = L.tileLayer('https://tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
        maxZoom: 20,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>'
      });

      // Стандартный слой OpenStreetMap
      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

      // Используем транспортный слой по умолчанию
      transportLayer.addTo(map);

      // Добавляем маркер для Полоцка  
      const marker = L.marker([lat, lng]).addTo(map);
      marker.bindPopup('<b>Полоцк</b><br>Местоположение цистерны').openPopup();

      // Добавляем контроль слоев
      const baseLayers = {
        "Транспорт": transportLayer,
        "OpenStreetMap": osmLayer
      };

      L.control.layers(baseLayers).addTo(map);

      mapInstanceRef.current = map;
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [lat, lng, zoom]);

  return (
    <>
      {/* Подключаем CSS Leaflet */}
      <link
        rel="stylesheet"
        href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />
      <div ref={mapRef} className={className} />
    </>
  );
}