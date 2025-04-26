import React, { useState, useEffect } from 'react';
import IncidentForm from './IncidentForm';
import Modal from './Modal';
import { mockIncidents } from '../data/mockIncidents';
import './IncidentDashboard.css';

const IncidentDashboard = () => {
  const [incidents, setIncidents] = useState(mockIncidents);
  const [filterSeverity, setFilterSeverity] = useState('All');
  const [sortOrder, setSortOrder] = useState('newest');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIncidents, setExpandedIncidents] = useState(new Set());
  const [activeTab, setActiveTab] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleAddIncident = (newIncident) => {
    setIncidents(prev => [newIncident, ...prev]);
    setIsModalOpen(false);
  };

  const toggleIncidentDetails = (incidentId) => {
    setExpandedIncidents(prev => {
      const newSet = new Set(prev);
      if (newSet.has(incidentId)) {
        newSet.delete(incidentId);
      } else {
        newSet.add(incidentId);
      }
      return newSet;
    });
  };

  const filteredAndSortedIncidents = incidents
    .filter(incident => {
      const matchesSearch = incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          incident.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeverity = filterSeverity === 'All' ? true : incident.severity === filterSeverity;
      return matchesSearch && matchesSeverity;
    })
    .sort((a, b) => {
      const dateA = new Date(a.reported_at);
      const dateB = new Date(b.reported_at);
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Add keyboard shortcut for search
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === '/' && !isModalOpen) {
        e.preventDefault();
        document.querySelector('.mobile-search input')?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [isModalOpen]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
    document.body.style.overflow = !isDrawerOpen ? 'hidden' : 'auto';
  };

  return (
    <div className={`app-container ${isDrawerOpen ? 'drawer-open' : ''}`}>
      {/* Mobile Header */}
      <header className="mobile-header">
        <div className="mobile-header-content">
          <button 
            className="mobile-nav-toggle"
            onClick={toggleDrawer}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <div className="mobile-search">
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div className={`mobile-nav-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="mobile-nav-drawer-header">
          <h2 className="mobile-nav-drawer-title">AI Safety</h2>
          <button 
            className="mobile-nav-close"
            onClick={toggleDrawer}
            aria-label="Close navigation"
          >
            ×
          </button>
        </div>
        <div className="sidebar-header">
          <button 
            className="new-incident-button"
            onClick={() => {
              setIsModalOpen(true);
              toggleDrawer();
            }}
          >
            + New Incident
          </button>
        </div>
        <nav className="filter-nav">
          <h2>Filter by Severity</h2>
          <div className="filter-buttons">
            <button
              className={`filter-button ${filterSeverity === 'All' ? 'active' : ''}`}
              onClick={() => {
                setFilterSeverity('All');
                setActiveTab('all');
              }}
            >
              All
            </button>
            <button
              className={`filter-button severity-high ${filterSeverity === 'High' ? 'active' : ''}`}
              onClick={() => {
                setFilterSeverity('High');
                setActiveTab('high');
              }}
            >
              High
            </button>
            <button
              className={`filter-button severity-medium ${filterSeverity === 'Medium' ? 'active' : ''}`}
              onClick={() => {
                setFilterSeverity('Medium');
                setActiveTab('medium');
              }}
            >
              Medium
            </button>
            <button
              className={`filter-button severity-low ${filterSeverity === 'Low' ? 'active' : ''}`}
              onClick={() => {
                setFilterSeverity('Low');
                setActiveTab('low');
              }}
            >
              Low
            </button>
          </div>

          <h2>Sort by Date</h2>
          <div className="sort-buttons">
            <button
              className={`sort-button ${sortOrder === 'newest' ? 'active' : ''}`}
              onClick={() => setSortOrder('newest')}
            >
              Newest First
            </button>
            <button
              className={`sort-button ${sortOrder === 'oldest' ? 'active' : ''}`}
              onClick={() => setSortOrder('oldest')}
            >
              Oldest First
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Overlay */}
      <div 
        className={`mobile-overlay ${isDrawerOpen ? 'open' : ''}`}
        onClick={toggleDrawer}
      />

      {/* Existing Sidebar (for laptop view) */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>AI Safety</h1>
          <button 
            className="new-incident-button"
            onClick={() => setIsModalOpen(true)}
          >
            + New Incident
          </button>
        </div>
        
        <nav className="filter-nav">
          <h2>Filter by Severity</h2>
          <div className="filter-buttons">
            <button
              className={`filter-button ${filterSeverity === 'All' ? 'active' : ''}`}
              onClick={() => setFilterSeverity('All')}
            >
              All
            </button>
            <button
              className={`filter-button severity-high ${filterSeverity === 'High' ? 'active' : ''}`}
              onClick={() => setFilterSeverity('High')}
            >
              High
            </button>
            <button
              className={`filter-button severity-medium ${filterSeverity === 'Medium' ? 'active' : ''}`}
              onClick={() => setFilterSeverity('Medium')}
            >
              Medium
            </button>
            <button
              className={`filter-button severity-low ${filterSeverity === 'Low' ? 'active' : ''}`}
              onClick={() => setFilterSeverity('Low')}
            >
              Low
            </button>
          </div>

          <h2>Sort by Date</h2>
          <div className="sort-buttons">
            <button
              className={`sort-button ${sortOrder === 'newest' ? 'active' : ''}`}
              onClick={() => setSortOrder('newest')}
            >
              Newest First
            </button>
            <button
              className={`sort-button ${sortOrder === 'oldest' ? 'active' : ''}`}
              onClick={() => setSortOrder('oldest')}
            >
              Oldest First
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="content-header">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search incidents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-shortcut">/ to Focus</span>
          </div>
        </header>

        <div className="incidents-grid">
          {filteredAndSortedIncidents.length === 0 ? (
            <p className="no-incidents">No incidents match your search.</p>
          ) : (
            filteredAndSortedIncidents.map(incident => (
              <div 
                key={incident.id} 
                className={`incident-card ${expandedIncidents.has(incident.id) ? 'expanded' : ''}`}
                data-severity={incident.severity}
                style={{
                  '--card-bg': incident.severity === 'High' ? '#fde8e8' : 
                              incident.severity === 'Medium' ? '#fef3c7' : 
                              '#d1fae5'
                }}
              >
                <div className="card-header">
                  <span 
                    className={`severity-badge severity-${incident.severity.toLowerCase()}`}
                  >
                    {incident.severity}
                  </span>
                </div>
                <h3>{incident.title}</h3>
                <div className={`incident-description ${expandedIncidents.has(incident.id) ? 'expanded' : ''}`}>
                  {incident.description}
                </div>
                <div className="card-footer">
                  <span className="incident-date">{formatDate(incident.reported_at)}</span>
                  <button 
                    className="view-details"
                    onClick={() => toggleIncidentDetails(incident.id)}
                    aria-expanded={expandedIncidents.has(incident.id)}
                  >
                    {expandedIncidents.has(incident.id) ? 'Show Less' : 'View Details'}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* Floating Action Button */}
      <button 
        className="fab-button"
        onClick={() => setIsModalOpen(true)}
        aria-label="Add new incident"
      >
        +
      </button>

      {/* Modal */}
      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Report New Incident"
      >
        <IncidentForm onSubmit={handleAddIncident} />
      </Modal>
    </div>
  );
};

export default IncidentDashboard; 