function SummaryCard({ title, amount, color }) {
    return (
      <div className={`p-4 rounded-xl shadow-md text-white ${color || "bg-blue-500"}`}>
        <h2 className="text-lg font-semibold">{title}</h2>
        <p className="text-2xl font-bold mt-2">₹{amount}</p>
      </div>
    );
  }
  
  export default SummaryCard;