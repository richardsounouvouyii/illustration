export interface SelectedObjectProperties {
  type: string;
  left: number;
  top: number;
  width: number;
  height: number;
  scaleX: number;
  scaleY: number;
  angle: number;
  opacity: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  text?: string;
  fontSize?: number;
  fontFamily?: string;
  fontWeight?: string;
  fontStyle?: string;
  textAlign?: string;
  isRecolorable?: boolean;
  layerId?: string;
}

export function isTextObjectType(type: string | undefined | null): boolean {
  if (!type) return false;
  const t = type.toLowerCase();
  return t === 'itext' || t === 'i-text' || t === 'text' || t === 'textbox' || t.includes('text');
}

export function isImageObjectType(type: string | undefined | null): boolean {
  if (!type) return false;
  const t = type.toLowerCase();
  return t === 'image' || t === 'fabricimage';
}
