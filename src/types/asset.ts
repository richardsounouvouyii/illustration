export type AssetCategory = 
  | 'personnages' 
  | 'animaux' 
  | 'objets' 
  | 'ecole' 
  | 'famille' 
  | 'metiers' 
  | 'sports' 
  | 'transports' 
  | 'decors' 
  | 'accessoires'
  | 'technologie';

export type AssetStyle = 
  | 'editorial_manuel'
  | 'realiste_3d' 
  | 'realiste_vectoriel' 
  | 'photo_detouree' 
  | 'scolaire' 
  | 'moderne' 
  | 'bd' 
  | 'caricature' 
  | 'minimaliste';

export interface RecolorZone {
  id: string;
  name: string; // e.g. "Peau", "Cheveux", "Vêtements", "Fond"
  defaultColor: string;
  selector?: string; // CSS selector or SVG element ID
}

export interface LibraryAsset {
  id: string;
  title: string;
  description?: string;
  category: AssetCategory;
  style: AssetStyle;
  tags: string[];
  format: 'svg' | 'png' | 'webp' | 'jpg' | 'jpeg';
  url: string;
  thumbnailUrl?: string;
  isRecolorable: boolean;
  recolorZones?: RecolorZone[];
  defaultWidth: number;
  defaultHeight: number;
  license?: string;
}
