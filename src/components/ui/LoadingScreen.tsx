const LoadingScreen = () => {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gnade-cream">
      <div className="flex flex-col items-center gap-6">
        <div className="text-center">
          <p
            className="font-serif text-gnade-black animate-pulse"
            style={{
              fontSize: 28,
              letterSpacing: 4,
            }}
          >
            GNADE
          </p>
        </div>
        
        {/* Sleek scaling loading indicator */}
        <div className="w-12 h-[1px] bg-gnade-black/10 relative overflow-hidden">
          <div className="absolute inset-0 bg-gnade-black origin-left animate-[scaleX_1.5s_ease-in-out_infinite_alternate]" />
        </div>
        <style>{`
          @keyframes scaleX {
            0% { transform: scaleX(0); transform-origin: left; }
            50% { transform: scaleX(1); transform-origin: left; }
            50.1% { transform: scaleX(1); transform-origin: right; }
            100% { transform: scaleX(0); transform-origin: right; }
          }
        `}</style>
      </div>
    </div>
  );
};

export default LoadingScreen;
