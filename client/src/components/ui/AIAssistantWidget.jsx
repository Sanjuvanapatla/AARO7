import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { sendAssistantMessage } from '../../services/assistantService';

const quickPrompts = [
  'What services does AARO7 provide?',
  'How can we start with AI?',
  'Do you support regulated industries?',
  'How do we estimate ROI?',
];

const quickActions = [
  { label: 'Capabilities', to: '/capabilities' },
  { label: 'Assessment', to: '/assessment' },
  { label: 'ROI', to: '/roi-calculator' },
  { label: 'Book Call', to: '/book-call' },
];

const starterMessage = {
  role: 'assistant',
  content:
    "Hi, I'm Ask AARO7. Ask me about services, use cases, compliance, ROI, or the best next step for your AI initiative.",
};

const normalizeHistory = (messages) =>
  messages
    .filter((item) => item.role === 'user' || item.role === 'assistant')
    .slice(-10)
    .map((item) => ({ role: item.role, content: item.content }));

const AIAssistantWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([starterMessage]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');

  const assistantRef = useRef(null);
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    const onMouseDown = (event) => {
      if (assistantRef.current && !assistantRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onMouseDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onMouseDown);
    };
  }, [open]);

  useEffect(() => {
    if (open && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isSending, open]);

  const send = async (text) => {
    const trimmed = text.trim();
    if (!trimmed || isSending) return;

    const userMessage = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput('');
    setError('');
    setIsSending(true);

    try {
      const data = await sendAssistantMessage({
        message: trimmed,
        history: normalizeHistory(nextMessages),
      });

      const reply =
        typeof data?.reply === 'string' && data.reply.trim()
          ? data.reply.trim()
          : 'I could not generate a valid response this time.';

      setMessages((previous) => [...previous, { role: 'assistant', content: reply }]);
    } catch (requestError) {
      const message =
        requestError?.response?.data?.message ||
        requestError?.message ||
        'Assistant is temporarily unavailable. Please try again.';

      setError(message);
      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content:
            'I am having trouble reaching the model right now. You can still use /assessment, /roi-calculator, or /book-call.',
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    send(input);
  };

  return (
    <div className={`assistant${open ? ' assistant--open' : ''}`} ref={assistantRef}>
      {open ? (
        <div className="assistant__panel">
          <div className="assistant__header">
            <div>
              <h4>Ask AARO7</h4>
              <p className="assistant__subtitle">Real-time AI assistant</p>
            </div>
            <button type="button" className="assistant__close" onClick={() => setOpen(false)} aria-label="Close assistant">
              X
            </button>
          </div>

          <div className="assistant__messages" aria-live="polite">
            {messages.map((item, index) => (
              <div
                key={`${item.role}-${index}`}
                className={`assistant__message assistant__message--${item.role === 'user' ? 'user' : 'assistant'}`}
              >
                {item.content}
              </div>
            ))}
            {isSending ? <div className="assistant__typing">Thinking...</div> : null}
            <div ref={messageEndRef} />
          </div>

          {error ? <p className="assistant__error">{error}</p> : null}

          <div className="assistant__quick-prompts">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                type="button"
                className="assistant__chip"
                onClick={() => send(prompt)}
                disabled={isSending}
              >
                {prompt}
              </button>
            ))}
          </div>

          <div className="assistant__actions">
            {quickActions.map((action) => (
              <Link key={action.to} to={action.to} className="assistant__action-link" onClick={() => setOpen(false)}>
                {action.label}
              </Link>
            ))}
          </div>

          <form className="assistant__form" onSubmit={onSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question and press Enter..."
              disabled={isSending}
            />
            <button type="submit" className="btn btn--primary" disabled={isSending || !input.trim()}>
              {isSending ? '...' : 'Ask'}
            </button>
          </form>
        </div>
      ) : null}

      <button type="button" className="assistant__toggle" onClick={() => setOpen((previous) => !previous)}>
        Ask AARO7
      </button>
    </div>
  );
};

export default AIAssistantWidget;
