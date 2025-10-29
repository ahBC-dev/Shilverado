const CoinSelector = ({ selectedCoin, onCoinChange }) => {
  const coins = [
    { id: 'bitcoin', name: 'Bitcoin' },
    { id: 'ethereum', name: 'Ethereum' },
    { id: 'solana', name: 'Solana' },
    { id: 'cardano', name: 'Cardano' }
  ];

  return (
    <select 
      value={selectedCoin} 
      onChange={(e) => onCoinChange(e.target.value)}
      className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600"
    >
      {coins.map(coin => (
        <option key={coin.id} value={coin.id}>
          {coin.name}
        </option>
      ))}
    </select>
  );
};

export default CoinSelector;