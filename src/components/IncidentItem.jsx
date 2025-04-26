import React, { useState } from 'react';
import './IncidentItem.css';

const IncidentItem = ({ incident }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'high':
        return '#ff4444';
      case 'medium':
        return '#ffbb33';
      case 'low':
        return '#00C851';
      default:
        return '#333';
    }
  };

  return (
    <div className="incident-item">
      <div className="incident-header">
        <div className="incident-main-info">
          <h3>{incident.title}</h3>
          <div 
            className="severity-badge"
            style={{ backgroundColor: getSeverityColor(incident.severity) }}
          >
            {incident.severity}
          </div>
        </div>
        <div className="incident-meta">
          <span className="date">{formatDate(incident.reported_at)}</span>
          <button 
            className="details-button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Hide Details' : 'View Details'}
          </button>
        </div>
      </div>
      {isExpanded && (
        <div className="incident-description">
          <p>{incident.description}</p>
        </div>
      )}
    </div>
  );
};

export default IncidentItem; 