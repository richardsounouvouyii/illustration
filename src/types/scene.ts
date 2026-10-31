export interface SceneElementConfig {
  assetId: string;
  left: number;
  top: number;
  scaleX?: number;
  scaleY?: number;
  angle?: number;
  zIndex?: number;
  customColors?: Record<string, string>;
}

export interface SceneTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  thumbnailUrl?: string;
  defaultFormat: string;
  backgroundColor: string;
  elements: SceneElementConfig[];
  texts?: Array<{
    text: string;
    left: number;
    top: number;
    fontSize: number;
    fontFamily: string;
    fill: string;
    isBubble?: boolean;
  }>;
}
