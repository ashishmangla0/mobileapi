export const buildImageVariants = (asset: any) => {
  if (!asset?.fields?.file?.url && !asset?.url) return null;

  const baseUrl = asset.url || `https:${asset.fields.file.url}`;

  const width =
    asset.fields?.file?.details?.image?.width || null;

  const height =
    asset.fields?.file?.details?.image?.height || null;

  return {
    original: baseUrl,
    small: `${baseUrl}?w=80&h=80&fit=thumb&fm=webp&q=70`,
    medium: `${baseUrl}?w=300&h=300&fit=thumb&fm=webp&q=75`,
    large: `${baseUrl}?w=800&fit=scale&fm=webp&q=80`,
    width,
    height,
  };
};