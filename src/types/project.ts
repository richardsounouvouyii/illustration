export type PageFormat = 'a4_portrait' | 'a4_landscape' | 'a5_portrait' | 'a5_landscape' | 'custom' | 'square';

export interface PageFormatConfig {
  id: PageFormat;
  label: string;
  width: number;
  height: number;
  unit: 'px' | 'mm';
}

export const FORMAT_PRESETS: Record<PageFormat, PageFormatConfig> = {
  a4_portrait: { id: 'a4_portrait', label: 'A4 Portrait (794 × 1123)', width: 794, height: 1123, unit: 'px' },
  a4_landscape: { id: 'a4_landscape', label: 'A4 Paysage (1123 × 794)', width: 1123, height: 794, unit: 'px' },
  a5_portrait: { id: 'a5_portrait', label: 'A5 Portrait (559 × 794)', width: 559, height: 794, unit: 'px' },
  a5_landscape: { id: 'a5_landscape', label: 'A5 Paysage (794 × 559)', width: 794, height: 559, unit: 'px' },
  square: { id: 'square', label: 'Carré (800 × 800)', width: 800, height: 800, unit: 'px' },
  custom: { id: 'custom', label: 'Personnalisé', width: 900, height: 600, unit: 'px' }
};

export interface ProjectMetadata {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  format: PageFormat;
  customWidth?: number;
  customHeight?: number;
  backgroundColor: string;
}

export interface Project {
  metadata: ProjectMetadata;
  canvasJson: Record<string, unknown> | null;
  thumbnailUrl?: string;
}
