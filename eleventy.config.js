// This JSDoc comment enables TypeScript autocomplete in your editor
/** @type {import("@11ty/eleventy").UserConfig} */

// Main Eleventy configuration function
// This is where you customize how Eleventy builds your site
export default function (eleventyConfig) {

  // ============================================================
  // CUSTOM FILTER: Date Formatting
  // ============================================================
  // Filters allow you to transform data in your templates
  // Usage in templates: {{ post.date | date }} or {{ post.date | date("LLL d, yyyy") }}
  eleventyConfig.addFilter("date", (dateObj, format = "yyyy-LL-dd") => {
    // If no date provided, return empty string
    if (!dateObj) return "";

    // Helper function to convert various date formats to JavaScript Date objects
    const toDate = (value) => {
      // Already a Date object? Return it as-is
      if (value instanceof Date) return value;
      
      // String date? Try to parse it
      if (typeof value === "string") {
        const iso = Date.parse(value);
        if (!Number.isNaN(iso)) return new Date(iso);
      }
      
      // Luxon DateTime object? (common in 11ty)
      if (value && typeof value.toJSDate === "function") {
        try {
          return value.toJSDate();
        } catch (e) {
          /* If conversion fails, continue to fallback */
        }
      }
      
      // Last resort: try to create a Date from whatever we have
      const fallback = new Date(value);
      return Number.isNaN(fallback.getTime()) ? null : fallback;
    };

    // Convert input to Date object
    const date = toDate(dateObj);
    if (!date) return "";

    // Default format: YYYY-MM-DD (e.g., "2025-12-31")
    if (format === "yyyy-LL-dd") {
      return date.toISOString().slice(0, 10);
    }

    // Format with abbreviated month name (e.g., "Dec 31, 2025")
    if (format.includes("LLL")) {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
      });
    }

    // Fallback: return ISO string (e.g., "2025-12-31T00:00:00.000Z")
    return date.toISOString();
  });

  // ============================================================
  // PASSTHROUGH COPY: Static Files
  // ============================================================
  // These files are copied directly to the output without processing
  
  // Copy everything from "public" folder to the root of "_site" output
  // Example: public/images/logo.png → _site/images/logo.png
  eleventyConfig.addPassthroughCopy({ "public": "/" });
  
  // Copy the RSS feed stylesheet to maintain the same path
  // This makes your RSS feed look nice when viewed in a browser
  eleventyConfig.addPassthroughCopy("content/feed/pretty-atom-feed.xsl");

  // ============================================================
  // COLLECTIONS: Organizing Your Content
  // ============================================================
  // Collections group related content together (like blog posts)
  
  // Create a "posts" collection from all Markdown files in content/blog/
  // The .reverse() puts newest posts first
  // You can then loop through this in templates with {% for post in collections.posts %}
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByGlob("content/blog/*.md").reverse()
  );

  // ============================================================
  // DIRECTORY CONFIGURATION
  // ============================================================
  // Tell Eleventy where to find files and where to put the output
  return {
    dir: {
      input: "content",                  // Source files location
      includes: "_includes",              // Reusable components/partials
      layouts: "_includes/layouts",       // Page layout templates
      output: "_site"                     // Built site goes here (don't commit this!)
    },
    // Process Markdown files with Nunjucks templating (allows {% %} and {{ }} syntax)
    markdownTemplateEngine: "njk",
    // Process HTML files with Nunjucks as well
    htmlTemplateEngine: "njk"
  };
}
