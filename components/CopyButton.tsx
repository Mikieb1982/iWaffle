const { useState, useCallback } = React;

const CopyButton = ({ textToCopy }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(textToCopy).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [textToCopy]);

  const Icon = () => copied ? (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><polyline points="20 6 9 17 4 12"></polyline></svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
  );

  return (
    <button
      onClick={handleCopy}
      className={`px-2 py-1 text-xs font-semibold rounded-md flex items-center gap-1 transition-all duration-200 ${
        copied
          ? 'bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-300'
          : 'bg-bg-primary hover:bg-border-color text-text-secondary border border-border-color'
      }`}
    >
      <Icon />
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
};
