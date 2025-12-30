/** @type {import("@11ty/eleventy").UserConfig} */
export default function (eleventyConfig) {

  eleventyConfig.addFilter("date", (dateObj, format = "yyyy-LL-dd") => {
    if (!dateObj) return "";

    const toDate = (value) => {
      if (value instanceof Date) return value;
      if (typeof value === "string") {
        const iso = Date.parse(value);
        if (!Number.isNaN(iso)) return new Date(iso);
      }
      if (value && typeof value.toJSDate === "function") {
        try {
          return value.toJSDate();
        } catch (e) {
          /* noop */
        }
      }
      const fallback = new Date(value);
      return Number.isNaN(fallback.getTime()) ? null : fallback;
    };

    const date = toDate(dateObj);
    if (!date) return "";

    if (format === "yyyy-LL-dd") {
      return date.toISOString().slice(0, 10);
    }

    if (format.includes("LLL")) {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }

    return date.toISOString();
  });

  // existing config below…

  // Copy static files through to output
  eleventyConfig.addPassthroughCopy({ "public": "/" });
  eleventyConfig.addPassthroughCopy("content/feed/pretty-atom-feed.xsl");

  // Blog collection: anything in src/blog/ with a date
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("content/blog/*.md").reverse()
  );

  return {
    dir: {
      input: "content",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
}
