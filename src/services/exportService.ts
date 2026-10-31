import { jsPDF } from 'jspdf';
import type { PageFormat, PageFormatConfig } from '../types/project';

const FORMAT_TO_PDF_MM: Partial<Record<PageFormat, { w: number; h: number }>> = {
  a4_portrait: { w: 210, h: 297 },
  a4_landscape: { w: 297, h: 210 },
  a5_portrait: { w: 148, h: 210 },
  a5_landscape: { w: 210, h: 148 },
  square: { w: 210, h: 210 }
};

function pxToMm(px: number): number {
  return (px * 25.4) / 96;
}

export const exportService = {
  downloadDataUrl(dataUrl: string, filename: string): void {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  exportAsPNG(dataUrl: string, filename = 'illustration.png'): void {
    this.downloadDataUrl(dataUrl, filename);
  },

  exportAsPDF(
    dataUrl: string,
    formatConfig: PageFormatConfig,
    filename = 'illustration.pdf'
  ): void {
    const mapped = FORMAT_TO_PDF_MM[formatConfig.id];
    const widthMm = mapped?.w ?? pxToMm(formatConfig.width);
    const heightMm = mapped?.h ?? pxToMm(formatConfig.height);
    const isLandscape = widthMm > heightMm;

    const pdf = new jsPDF({
      orientation: isLandscape ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [widthMm, heightMm]
    });

    pdf.addImage(dataUrl, 'PNG', 0, 0, widthMm, heightMm);
    pdf.save(filename);
  }
};
