import { z } from "zod/v4";

export const coordinateSchema = z.object({
  lat: z.number().min(-90).max(90),
  lng: z.number().min(-180).max(180),
});

export const routeSummarySchema = z.object({
  id: z.string().min(1),
  source: z.enum(["strava", "manual"]),
  name: z.string().min(1),
  distanceMeters: z.number().nonnegative(),
  startedAt: z.string().datetime(),
});

export const memoryEventSchema = z.object({
  id: z.string().min(1),
  routeId: z.string().min(1),
  happenedAt: z.string().datetime(),
  message: z.string().min(1),
  distanceMeters: z.number().nonnegative(),
});

export const routesNearbyRequestSchema = z.object({
  lat: z.number(),
  lng: z.number(),
  radiusKm: z.number().positive().max(100),
});

export const routesNearbyResponseSchema = z.object({
  routes: z.array(routeSummarySchema),
});

export type Coordinate = z.infer<typeof coordinateSchema>;
export type RouteSummary = z.infer<typeof routeSummarySchema>;
export type MemoryEvent = z.infer<typeof memoryEventSchema>;
export type RoutesNearbyRequest = z.infer<typeof routesNearbyRequestSchema>;
export type RoutesNearbyResponse = z.infer<typeof routesNearbyResponseSchema>;
