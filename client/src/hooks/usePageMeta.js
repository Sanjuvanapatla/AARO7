import { useEffect } from 'react';

const DEFAULT_TITLE = 'AARO7 Fintech Pvt Ltd';
const DEFAULT_DESCRIPTION =
  'AARO7 is an end-to-end AI engineering hub for custom models, RAG systems, and agentic workflow automation.';

const ensureMetaTag = (name) => {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  return tag;
};

const usePageMeta = ({ title, description, schema } = {}) => {
  const schemaString = schema ? JSON.stringify(schema) : '';

  useEffect(() => {
    const previousTitle = document.title;
    const descriptionTag = ensureMetaTag('description');
    const previousDescription = descriptionTag.getAttribute('content') || '';

    document.title = title ? `${title} | ${DEFAULT_TITLE}` : DEFAULT_TITLE;
    descriptionTag.setAttribute('content', description || DEFAULT_DESCRIPTION);

    let schemaScript = null;
    if (schemaString) {
      schemaScript = document.createElement('script');
      schemaScript.type = 'application/ld+json';
      schemaScript.text = schemaString;
      document.head.appendChild(schemaScript);
    }

    return () => {
      document.title = previousTitle || DEFAULT_TITLE;
      descriptionTag.setAttribute('content', previousDescription || DEFAULT_DESCRIPTION);
      if (schemaScript && schemaScript.parentNode) {
        schemaScript.parentNode.removeChild(schemaScript);
      }
    };
  }, [title, description, schemaString]);
};

export default usePageMeta;
