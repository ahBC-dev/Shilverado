//mini chart
const MiniChart = ({ data, change }) => {
  if (!data || data.length === 0) return null;

  const isPositive = change >= 0;
  const points = data.map((price, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((price - Math.min(...data)) / (Math.max(...data) - Math.min(...data))) * 80;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${points} 100,100 0,100`;

  return (
    <div className="flex h-12 w-24 mb-4">
      <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
        <defs>
          <linearGradient id={`gradient-${isPositive}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity="0.3" />
            <stop offset="100%" stopColor={isPositive ? '#10B981' : '#EF4444'} stopOpacity="0" />
          </linearGradient>
        </defs>
        <polygon
          points={areaPoints}
          fill={`url(#gradient-${isPositive})`}
        />
        <polyline
          points={points}
          fill="none"
          stroke={isPositive ? '#10B981' : '#EF4444'}
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
};

export default MiniChart;