export const scenes = ["intro", "welcome", "menu", "fashion", "aquarium", "dining", "waterfall", "fountain"] as const;

export type Scene = (typeof scenes)[number];
