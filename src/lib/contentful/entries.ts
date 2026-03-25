import { apiInstance } from "./client";
import { resolveIncludes } from "./resolve";

interface GetEntriesParams {
  content_type: string;
  limit?: number;
  skip?: number;
  locale?: string;
  include?: number;
  [key: string]: any;
}

export const getEntries = async (params: GetEntriesParams) => {
  try {
    const res = await apiInstance.get("", {
      params: {
        limit: 10,
        skip: 0,
        include: 2,
        locale: "en-IN",
        ...params,
      },
    });

    const { items, includes, total } = res.data;

    const resolved = resolveIncludes(items, includes);

    return {
      data: resolved,
      total,
    };

  } catch (error: any) {
    console.error("❌ Contentful Fetch Error:", error?.response?.data);
    throw error;
  }
};