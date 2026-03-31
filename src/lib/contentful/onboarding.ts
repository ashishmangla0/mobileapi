import { getEntries } from "./entries";
import { buildImageVariants } from "./image";

export const getOnboarding = async (params = {}) => {
  const res = await getEntries({
    content_type: "onboardingFlow",
    ...params,
  });

  // 🔥 flatten slides
  const flattenedSlides = res.data.flatMap(
    (item: any) =>
      item.slides?.map((slide: any) => ({
        id: slide.id ,
        title: slide.title,
        description: slide.description,
        primaryActionText: slide.primaryActionText,
        secondaryCta: slide.secondaryCta,
        image: buildImageVariants(slide.asset),
      })) || [],
  );

  return {
    data: flattenedSlides,
    total: flattenedSlides.length,
  };
};
