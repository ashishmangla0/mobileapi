export const resolveIncludes = (items: any[], includes: any = {}) => {
  const assets = includes?.Asset || [];
  const entries = includes?.Entry || [];

  const getAsset = (id: string) =>
    assets.find((asset: any) => asset.sys.id === id);

  const getEntry = (id: string) =>
    entries.find((entry: any) => entry.sys.id === id);

  const resolveField = (field: any): any => {
    // Handle arrays
    if (Array.isArray(field)) {
      return field.map(resolveField);
    }

    // Handle linked references
    if (field?.sys?.type === "Link") {
      if (field.sys.linkType === "Asset") {
        const asset = getAsset(field.sys.id);

        // ✅ Normalize asset URL here
        return asset
          ? {
              ...asset.fields,
              url: `https:${asset.fields?.file?.url}`,
            }
          : null;
      }

      if (field.sys.linkType === "Entry") {
        const entry = getEntry(field.sys.id);
        return entry ? resolveObject(entry.fields) : null;
      }
    }

    // Handle nested objects
    if (typeof field === "object" && field !== null) {
      return resolveObject(field);
    }

    return field;
  };

  const resolveObject = (obj: any) => {
    const result: any = {};

    for (const key in obj) {
      result[key] = resolveField(obj[key]);
    }

    return result;
  };

  return items.map((item) => ({
    id: item.sys.id,
    ...resolveObject(item.fields),
  }));
};