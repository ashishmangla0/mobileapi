import { getEntries } from "./entries";

export const getOnboarding = async (params = {}) => {
  return getEntries({
    content_type: "blogPost",
    ...params,
  });
};