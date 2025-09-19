const PromptExamples = ({ onExampleClick }) => {
  const examples = [
    "Draft an email to my team about the new quarterly goals.",
    "Explain the concept of photosynthesis like I'm five.",
    "Write a short, spooky story about a haunted waffle iron.",
    "Generate a list of creative names for a new coffee shop.",
  ];

  const ExampleButton = ({ text }) => (
    <button
      onClick={() => onExampleClick(text)}
      className="w-full text-left p-3 bg-bg-secondary hover:bg-border-color dark:hover:bg-bg-primary/5 rounded-lg border border-border-color transition-colors duration-200 shadow-sm"
    >
      <p className="text-sm font-semibold text-text-primary">{text}</p>
    </button>
  );

  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4">
      <div className="mb-4">
        <LogoIcon />
      </div>
      <h2 className="text-2xl font-bold text-text-primary mb-2">Welcome to iWaffle</h2>
      <p className="text-text-secondary mb-8">
        Your cozy creative playground for cooking up prompts. <br/>
        Start a conversation or try one of these examples:
      </p>
      <div className="w-full max-w-md grid grid-cols-1 sm:grid-cols-2 gap-3">
        {examples.map((ex) => (
          <ExampleButton key={ex} text={ex} />
        ))}
      </div>
    </div>
  );
};
