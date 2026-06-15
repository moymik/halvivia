const allowedTags = new Set(['p', 'br', 'b', 'strong', 'i', 'em', 'ul', 'ol', 'li']);
const allowedSelfClosingTags = new Set(['br']);

function escapeHtml(value: string) {
  return value
    .replace(/&(?!(?:[a-zA-Z][a-zA-Z0-9]+|#\d+|#x[\da-fA-F]+);)/g, '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function normalizeTagName(tag: string) {
  return tag.match(/^<\/?\s*([a-z0-9-]+)/i)?.[1]?.toLowerCase() ?? null;
}

function sanitizeTag(tag: string) {
  const tagName = normalizeTagName(tag);

  if (!tagName || !allowedTags.has(tagName)) {
    return '';
  }

  if (tag.startsWith('</')) {
    return allowedSelfClosingTags.has(tagName) ? '' : `</${tagName}>`;
  }

  return allowedSelfClosingTags.has(tagName) ? `<${tagName}>` : `<${tagName}>`;
}

export function sanitizeHtml(html: string) {
  const withoutUnsafeBlocks = html.replace(
    /<\s*(script|style|iframe|object|embed|svg|math)[^>]*>[\s\S]*?<\s*\/\s*\1\s*>/gi,
    '',
  );

  return withoutUnsafeBlocks
    .split(/(<[^>]+>)/g)
    .map((part) => (part.startsWith('<') ? sanitizeTag(part) : escapeHtml(part)))
    .join('')
    .trim();
}
