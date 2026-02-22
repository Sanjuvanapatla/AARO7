const pushLeadToCrm = async (eventType, payload) => {
  const webhookUrl = process.env.CRM_WEBHOOK_URL;
  if (!webhookUrl) return;
  if (typeof fetch !== 'function') {
    console.warn('CRM webhook skipped: fetch is not available in this Node runtime.');
    return;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventType,
        source: 'aaro7_website',
        timestamp: new Date().toISOString(),
        payload,
      }),
    });

    if (!response.ok) {
      console.warn(`CRM webhook failed (${eventType}): ${response.status}`);
    }
  } catch (error) {
    console.warn(`CRM webhook error (${eventType}): ${error.message}`);
  }
};

module.exports = { pushLeadToCrm };
