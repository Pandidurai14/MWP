export default function Header({ activeTab, onTabChange, enrolledCount }) {
  const tabs = [
    { id: 'catalog', label: 'Course Catalog' },
    { id: 'schedule', label: 'My Schedule' },
  ];

  return (
    <header className="app-header">
      <div className="brand">
        <span className="brand-mark">C</span>
        <div className="brand-text">
          <h1>React Course Registration System</h1>
          <p>Enroll in courses · track credits · build your semester</p>
        </div>
      </div>

      <nav className="tabs" role="tablist" aria-label="Primary">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={`tab ${activeTab === tab.id ? 'tab--active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
            {tab.id === 'schedule' && enrolledCount > 0 && (
              <span className="tab-badge">{enrolledCount}</span>
            )}
          </button>
        ))}
      </nav>
    </header>
  );
}
