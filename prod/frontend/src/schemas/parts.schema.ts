import { z } from "zod";

// Base schema for all parts
export const basePartSchema = z.object({
  partTypeId: z.string().min(1, "Выберите тип детали"),
  stampNumberId: z.string().min(1, "Выберите клеймо"),
  statusId: z.string().min(1, "Выберите статус"),
  depotId: z.string().optional(),
  serialNumber: z.string().optional(),
  manufactureYear: z.string().optional(),
  currentLocation: z.string().optional(),
  notes: z.string().optional(),
});

// Wheel Pair schema (code: 1)
export const wheelPairSchema = basePartSchema.extend({
  thicknessLeft: z.number().positive("Толщина должна быть положительной").optional(),
  thicknessRight: z.number().positive("Толщина должна быть положительной").optional(),
  wheelType: z.string().optional(),
});

// Side Frame schema (code: 3)
export const sideFrameSchema = basePartSchema.extend({
  serviceLifeYears: z.number().int().positive("Срок службы должен быть положительным").optional(),
  extendedUntil: z.string().optional(),
});

// Bolster schema (code: 2)
export const bolsterSchema = basePartSchema.extend({
  serviceLifeYears: z.number().int().positive("Срок службы должен быть положительным").optional(),
  extendedUntil: z.string().optional(),
});

// Coupler schema (code: 4)
export const couplerSchema = basePartSchema;

// Shock Absorber schema (code: 10)
export const shockAbsorberSchema = basePartSchema.extend({
  model: z.string().optional(),
  manufacturerCode: z.string().optional(),
  serviceLifeYears: z.number().int().positive("Срок службы должен быть положительным").optional(),
  nextRepairDate: z.string().optional(),
});

// Update schemas (without partTypeId since it can't be changed)
export const basePartUpdateSchema = basePartSchema.omit({ partTypeId: true });

export const wheelPairUpdateSchema = wheelPairSchema.omit({ partTypeId: true });
export const sideFrameUpdateSchema = sideFrameSchema.omit({ partTypeId: true });
export const bolsterUpdateSchema = bolsterSchema.omit({ partTypeId: true });
export const couplerUpdateSchema = couplerSchema.omit({ partTypeId: true });
export const shockAbsorberUpdateSchema = shockAbsorberSchema.omit({ partTypeId: true });

// Type inference
export type WheelPairFormData = z.infer<typeof wheelPairSchema>;
export type SideFrameFormData = z.infer<typeof sideFrameSchema>;
export type BolsterFormData = z.infer<typeof bolsterSchema>;
export type CouplerFormData = z.infer<typeof couplerSchema>;
export type ShockAbsorberFormData = z.infer<typeof shockAbsorberSchema>;

export type WheelPairUpdateFormData = z.infer<typeof wheelPairUpdateSchema>;
export type SideFrameUpdateFormData = z.infer<typeof sideFrameUpdateSchema>;
export type BolsterUpdateFormData = z.infer<typeof bolsterUpdateSchema>;
export type CouplerUpdateFormData = z.infer<typeof couplerUpdateSchema>;
export type ShockAbsorberUpdateFormData = z.infer<typeof shockAbsorberUpdateSchema>;
