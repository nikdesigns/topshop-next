'use client';

import { useEffect, useMemo, useState } from 'react';
import { Download, ExternalLink, FileImage, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AssetSizeVariant } from '@/lib/assets-downloads';

type AssetVariantActionsProps = {
  variants: AssetSizeVariant[];
};

type BusyFormat = 'jpg' | 'pdf' | null;

function withExtension(filename: string, extension: string) {
  return filename.replace(/\.[a-z0-9]+$/i, extension);
}

function triggerBlobDownload(blob: Blob, filename: string) {
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = objectUrl;
  anchor.download = filename;
  anchor.rel = 'noopener';
  anchor.click();
  URL.revokeObjectURL(objectUrl);
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Unable to load asset image.'));
    image.src = src;
  });
}

function renderWhiteBackgroundCanvas(image: HTMLImageElement) {
  const canvas = document.createElement('canvas');
  canvas.width = image.naturalWidth || image.width;
  canvas.height = image.naturalHeight || image.height;
  const context = canvas.getContext('2d');

  if (!context) {
    throw new Error('Canvas context is unavailable.');
  }

  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);

  return canvas;
}

export function AssetVariantActions({ variants }: AssetVariantActionsProps) {
  const [selectedKey, setSelectedKey] = useState(variants[0]?.key ?? 'xl');
  const [busyFormat, setBusyFormat] = useState<BusyFormat>(null);
  const [error, setError] = useState('');

  const selectedVariant = useMemo(() => {
    return variants.find((variant) => variant.key === selectedKey) ?? variants[0];
  }, [selectedKey, variants]);

  useEffect(() => {
    if (!selectedVariant) {
      return;
    }

    if (selectedVariant.key !== selectedKey) {
      setSelectedKey(selectedVariant.key);
    }
  }, [selectedKey, selectedVariant]);

  if (!selectedVariant) {
    return null;
  }

  const jpgName = withExtension(selectedVariant.downloadName, '.jpg');
  const pdfName = withExtension(selectedVariant.downloadName, '.pdf');

  const handleJpgDownload = async () => {
    setBusyFormat('jpg');
    setError('');

    try {
      const image = await loadImage(selectedVariant.src);
      const canvas = renderWhiteBackgroundCanvas(image);
      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 0.92);
      });

      if (!blob) {
        throw new Error('Unable to generate JPG.');
      }

      triggerBlobDownload(blob, jpgName);
    } catch (downloadError) {
      setError(
        downloadError instanceof Error ? downloadError.message : 'JPG export failed.',
      );
    } finally {
      setBusyFormat(null);
    }
  };

  const handlePdfDownload = async () => {
    setBusyFormat('pdf');
    setError('');

    try {
      const image = await loadImage(selectedVariant.src);
      const canvas = renderWhiteBackgroundCanvas(image);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
      const { jsPDF } = await import('jspdf');
      const pageWidth = canvas.width;
      const pageHeight = canvas.height;

      const pdf = new jsPDF({
        orientation: pageWidth >= pageHeight ? 'landscape' : 'portrait',
        unit: 'pt',
        format: [pageWidth, pageHeight],
        compress: true,
      });

      pdf.addImage(dataUrl, 'JPEG', 0, 0, pageWidth, pageHeight);
      pdf.save(pdfName);
    } catch (downloadError) {
      setError(
        downloadError instanceof Error ? downloadError.message : 'PDF export failed.',
      );
    } finally {
      setBusyFormat(null);
    }
  };

  return (
    <div className="assets-variant-panel">
      <div className="assets-variant-toolbar">
        <label className="assets-variant-field" htmlFor={`size-${selectedVariant.downloadName}`}>
          <span>Size</span>
          <select
            id={`size-${selectedVariant.downloadName}`}
            className="assets-variant-select"
            value={selectedVariant.key}
            onChange={(event) => {
              setSelectedKey(event.target.value as AssetSizeVariant['key']);
              setError('');
            }}
          >
            {variants.map((variant) => (
              <option key={variant.key} value={variant.key}>
                {variant.label}
              </option>
            ))}
          </select>
        </label>
        <p className="assets-variant-dims">{selectedVariant.dimensionsLabel}</p>
      </div>

      <div className="assets-format-actions-wrap">
        <div className="assets-format-actions">
          <Button asChild variant="outline" size="sm">
            <a href={selectedVariant.src} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={13} aria-hidden="true" />
              Preview
            </a>
          </Button>
          <Button asChild size="sm">
            <a href={selectedVariant.src} download={selectedVariant.downloadName}>
              <Download size={13} aria-hidden="true" />
              PNG
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleJpgDownload}
            disabled={busyFormat !== null}
          >
            <FileImage size={13} aria-hidden="true" />
            {busyFormat === 'jpg' ? 'JPG...' : 'JPG'}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handlePdfDownload}
            disabled={busyFormat !== null}
          >
            <FileText size={13} aria-hidden="true" />
            {busyFormat === 'pdf' ? 'PDF...' : 'PDF'}
          </Button>
        </div>
        <p className="assets-format-note">PNG transparent, JPG white background, PDF export.</p>
        {error ? (
          <p role="alert" className="assets-format-error">
            {error}
          </p>
        ) : null}
      </div>
    </div>
  );
}
