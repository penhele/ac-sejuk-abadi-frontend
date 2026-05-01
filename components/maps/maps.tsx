import { cn } from "@/lib/utils";
import {
  Map,
  MapFullscreenControl,
  MapLocateControl,
  MapMarker,
  MapTileLayer,
  MapZoomControl,
} from "../ui/map";
import type { LatLngExpression } from "leaflet";

export default function Maps({ className }: { className?: string }) {
  const OFFICE_COORDINATES = [-6.349903, 106.819736] satisfies LatLngExpression;

  return (
    <Map center={OFFICE_COORDINATES} className={cn(className)} zoom={16}>
      <MapTileLayer />
      <MapMarker position={OFFICE_COORDINATES} />
      <MapZoomControl />
      <MapFullscreenControl />
      <MapLocateControl />
    </Map>
  );
}
