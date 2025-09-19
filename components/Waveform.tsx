
const Waveform = () => {
  return (
    <div className="flex items-center justify-center space-x-1 h-6">
      <div className="wave-bar bg-accent w-1 h-2 rounded-full" style={{ animationDelay: '0s' }}></div>
      <div className="wave-bar bg-accent w-1 h-4 rounded-full" style={{ animationDelay: '0.1s' }}></div>
      <div className="wave-bar bg-accent w-1 h-5 rounded-full" style={{ animationDelay: '0.2s' }}></div>
      <div className="wave-bar bg-accent w-1 h-3 rounded-full" style={{ animationDelay: '0.3s' }}></div>
      <div className="wave-bar bg-accent w-1 h-6 rounded-full" style={{ animationDelay: '0.4s' }}></div>
      <div className="wave-bar bg-accent w-1 h-4 rounded-full" style={{ animationDelay: '0.5s' }}></div>
      <div className="wave-bar bg-accent w-1 h-2 rounded-full" style={{ animationDelay: '0.6s' }}></div>
    </div>
  );
};
