/** @format */

import isEqual from "fast-deep-equal";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type RingModel = "withPearl" | "plain";
export type Material = "gold" | "whiteGold" | "roseGold";
export type PearlColor = "white" | "pink" | "blue";
export type TextureType = "polished" | "brushed" | "hammered";
export type TextureScale = number;
export type FontFamily = "cursive" | "serif" | "sans-serif" | "monospace" | "fantasy"

export interface RingConfig {
  model: RingModel;
  material: Material;
  pearlColor?: PearlColor;
  textureType?: TextureType;
  textureScale?: TextureScale;
  textConfig:{
    text: string;
    fontFamily: FontFamily;
  }
}

interface RingConfiguratorState {
  config: RingConfig;
  textureLoading: boolean;
  setConfig: (newConfig: Partial<RingConfig>) => void;
  setTextureLoading: (newState: boolean) => void;
  setTextConfig: (newTextConfig: Partial<RingConfig>) => void;
}

export const useRingConfigurator = create<RingConfiguratorState>()(
  subscribeWithSelector((set) => ({
    config: {
      model: "plain",
      material: "gold",
      pearlColor: "white",
      textureType: "polished",
      textureScale: 1,
      textConfig: {
        text: "",
        fontFamily: "cursive",
      },
    },
    textureLoading: false,

    setConfig: (newConfig) =>
      set((state) => {
        const updatedConfig = { ...state.config, ...newConfig };

        // Prevent updates if values remain unchanged
        if (isEqual(state.config, updatedConfig)) {
          return {}; // No state change, avoids re-renders
        }

        return { config: updatedConfig };
      }),

    setTextureLoading: (newState) =>
      set((state) => {
        // Prevent updates if values remain unchanged
        if (newState === state.textureLoading) {
          return {}; // No state change, avoids re-renders
        }

        return { textureLoading: newState };
      }),

    setTextConfig: (newTextConfig: Partial<RingConfig["textConfig"]>) =>
      set((state) => {
        const updatedTextConfig = {
          ...state.config.textConfig,
          ...newTextConfig,
        };

        // Check if the new values are the same as the current ones
        if (isEqual(state.config.textConfig, updatedTextConfig)) {
          return {}; // No state change, avoids re-renders
        }

        return {
          config: {
            ...state.config,
            textConfig: updatedTextConfig,
          },
        };
      }),
  }))
);