const StatsPanel = ({ users }) => {
  return (
    <div className="stats-panel">
      <p>Total Users: {users.length}</p>
      {/* More stats can be added here. This file is by far not used unless more stas needed!*/}
    </div>
  );
};

export default StatsPanel;