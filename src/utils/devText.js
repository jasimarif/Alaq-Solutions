/**
 * Utility for handling developer placeholder tags ([CONFIRM WITH JASIM], [PLACEHOLDER])
 * Rule: Any text containing [CONFIRM WITH JASIM] or [PLACEHOLDER] must render only
 * when import.meta.env.DEV is true. In the production build they must be hidden.
 * Data files must never be edited.
 */

export const isDev = Boolean(import.meta.env.DEV);

const DEV_TAG_REGEX = /\[(CONFIRM WITH JASIM|PLACEHOLDER)[^\]]*\]/i;

/**
 * Returns false in production if the text contains a dev/unconfirmed tag.
 */
export const shouldRenderDevText = (text) => {
  if (isDev) return true;
  if (!text) return true;
  if (typeof text === 'string') {
    return !DEV_TAG_REGEX.test(text);
  }
  return true;
};

/**
 * Filters an array of items (strings or objects).
 * In production, any item containing [CONFIRM WITH JASIM] or [PLACEHOLDER] is omitted.
 */
export const filterDevItems = (items) => {
  if (!Array.isArray(items)) return items;
  if (isDev) return items;

  return items.filter((item) => {
    if (typeof item === 'string') {
      return shouldRenderDevText(item);
    }
    if (typeof item === 'object' && item !== null) {
      const values = Object.values(item);
      const hasUnconfirmed = values.some(
        (v) => typeof v === 'string' && !shouldRenderDevText(v)
      );
      return !hasUnconfirmed;
    }
    return true;
  });
};

/**
 * Format single text string for display.
 * In production, returns null if the text is primarily a placeholder,
 * or cleanly removes the bracketed tag if it's an inline annotation.
 */
export const formatDevText = (text) => {
  if (!text || typeof text !== 'string') return text;
  if (isDev) return text;

  // If text starts with placeholder or is purely an unconfirmed message, hide it
  if (DEV_TAG_REGEX.test(text)) {
    const stripped = text.replace(DEV_TAG_REGEX, '').trim();
    if (!stripped || /^details to follow/i.test(stripped)) {
      return null;
    }
    return stripped;
  }

  return text;
};
