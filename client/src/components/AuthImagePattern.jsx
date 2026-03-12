const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="hidden lg:flex flex-col items-center justify-center relative overflow-hidden bg-base-200/50">
      {/* Decorative background orbs */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/8 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-primary/6 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />

      {/* Animated 3×3 grid */}
      <div className="relative z-10 grid grid-cols-3 gap-3 mb-10">
        {[...Array(9)].map((_, i) => (
          <div
            key={i}
            className={`w-16 h-16 xl:w-20 xl:h-20 rounded-2xl border transition-all duration-700
              ${
                i % 2 === 0
                  ? "bg-primary/10 border-primary/20 animate-pulse"
                  : "bg-base-300/30 border-base-300/50"
              }`}
            style={{
              animationDelay: `${i * 0.15}s`,
              animationDuration: "2.5s",
            }}
          />
        ))}
      </div>

      {/* Text */}
      <h2 className="relative z-10 text-xl xl:text-2xl font-bold text-base-content mb-2 tracking-tight">
        {title}
      </h2>
      <p className="relative z-10 text-base-content/50 text-center text-sm leading-relaxed max-w-[280px]">
        {subtitle}
      </p>
    </div>
  );
};

export default AuthImagePattern;
