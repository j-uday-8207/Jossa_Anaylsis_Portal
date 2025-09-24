import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UserFeatures.css';

const UserFeatures = () => {
  // State for user data
  const [watchlist, setWatchlist] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState({});
  const [alerts, setAlerts] = useState([]);
  const [showWatchlist, setShowWatchlist] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem('josaa_watchlist') || '[]');
    const savedBookmarks = JSON.parse(localStorage.getItem('josaa_bookmarks') || '[]');
    const savedNotes = JSON.parse(localStorage.getItem('josaa_notes') || '{}');
    const savedAlerts = JSON.parse(localStorage.getItem('josaa_alerts') || '[]');
    
    setWatchlist(savedWatchlist);
    setBookmarks(savedBookmarks);
    setNotes(savedNotes);
    setAlerts(savedAlerts);
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('josaa_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('josaa_bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem('josaa_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('josaa_alerts', JSON.stringify(alerts));
  }, [alerts]);

  // Add to watchlist
  const addToWatchlist = (institute, branch) => {
    const newItem = {
      id: Date.now(),
      institute,
      branch,
      dateAdded: new Date().toLocaleDateString()
    };
    setWatchlist(prev => [...prev, newItem]);
  };

  // Remove from watchlist
  const removeFromWatchlist = (id) => {
    setWatchlist(prev => prev.filter(item => item.id !== id));
  };

  // Add bookmark
  const addBookmark = (title, url, type, description) => {
    const newBookmark = {
      id: Date.now(),
      title,
      url,
      type, // 'analysis', 'chart', 'comparison'
      description,
      dateAdded: new Date().toLocaleDateString()
    };
    setBookmarks(prev => [...prev, newBookmark]);
  };

  // Remove bookmark
  const removeBookmark = (id) => {
    setBookmarks(prev => prev.filter(item => item.id !== id));
  };

  // Add/Update note
  const saveNote = (institute, noteText) => {
    setNotes(prev => ({
      ...prev,
      [institute]: {
        text: noteText,
        lastUpdated: new Date().toLocaleDateString()
      }
    }));
  };

  // Delete note
  const deleteNote = (institute) => {
    setNotes(prev => {
      const updated = { ...prev };
      delete updated[institute];
      return updated;
    });
  };

  // Add alert
  const addAlert = (institute, branch, currentCutoff, targetCutoff, alertType) => {
    const newAlert = {
      id: Date.now(),
      institute,
      branch,
      currentCutoff,
      targetCutoff,
      alertType, // 'increase', 'decrease', 'any_change'
      isActive: true,
      dateCreated: new Date().toLocaleDateString()
    };
    setAlerts(prev => [...prev, newAlert]);
  };

  // Toggle alert
  const toggleAlert = (id) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === id ? { ...alert, isActive: !alert.isActive } : alert
    ));
  };

  // Remove alert
  const removeAlert = (id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="user-features">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <Link to="/" style={{ 
          background: 'rgba(255, 255, 255, 0.1)', 
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '12px',
          padding: '12px 20px',
          color: '#ffffff',
          textDecoration: 'none',
          fontFamily: 'Raleway, sans-serif',
          fontWeight: '600',
          transition: 'all 0.3s ease'
        }}>
          ← Back to Home
        </Link>
        <h2>Personal Dashboard</h2>
        <div style={{ width: '120px' }}></div> {/* Spacer for centering */}
      </div>
      
      {/* Navigation Tabs */}
      <div className="feature-tabs">
        <button 
          className={`tab-button ${showWatchlist ? 'active' : ''}`}
          onClick={() => {
            setShowWatchlist(true);
            setShowBookmarks(false);
            setShowNotes(false);
            setShowAlerts(false);
          }}
        >
          ⭐ Watchlist ({watchlist.length})
        </button>
        <button 
          className={`tab-button ${showBookmarks ? 'active' : ''}`}
          onClick={() => {
            setShowWatchlist(false);
            setShowBookmarks(true);
            setShowNotes(false);
            setShowAlerts(false);
          }}
        >
          📌 Bookmarks ({bookmarks.length})
        </button>
        <button 
          className={`tab-button ${showNotes ? 'active' : ''}`}
          onClick={() => {
            setShowWatchlist(false);
            setShowBookmarks(false);
            setShowNotes(true);
            setShowAlerts(false);
          }}
        >
          📝 Notes ({Object.keys(notes).length})
        </button>
        <button 
          className={`tab-button ${showAlerts ? 'active' : ''}`}
          onClick={() => {
            setShowWatchlist(false);
            setShowBookmarks(false);
            setShowNotes(false);
            setShowAlerts(true);
          }}
        >
          🔔 Alerts ({alerts.filter(a => a.isActive).length})
        </button>
      </div>

      {/* Watchlist Section */}
      {showWatchlist && (
        <WatchlistSection 
          watchlist={watchlist}
          onRemove={removeFromWatchlist}
          onAdd={addToWatchlist}
        />
      )}

      {/* Bookmarks Section */}
      {showBookmarks && (
        <BookmarksSection 
          bookmarks={bookmarks}
          onRemove={removeBookmark}
          onAdd={addBookmark}
        />
      )}

      {/* Notes Section */}
      {showNotes && (
        <NotesSection 
          notes={notes}
          onSave={saveNote}
          onDelete={deleteNote}
        />
      )}

      {/* Alerts Section */}
      {showAlerts && (
        <AlertsSection 
          alerts={alerts}
          onAdd={addAlert}
          onToggle={toggleAlert}
          onRemove={removeAlert}
        />
      )}
    </div>
  );
};

// Watchlist Component
const WatchlistSection = ({ watchlist, onRemove, onAdd }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInstitute, setNewInstitute] = useState('');
  const [newBranch, setNewBranch] = useState('');

  const handleAdd = () => {
    if (newInstitute && newBranch) {
      onAdd(newInstitute, newBranch);
      setNewInstitute('');
      setNewBranch('');
      setShowAddForm(false);
    }
  };

  return (
    <div className="feature-section">
      <div className="section-header">
        <h3>⭐ Personal Watchlist</h3>
        <button 
          className="add-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          + Add to Watchlist
        </button>
      </div>

      {showAddForm && (
        <div className="add-form">
          <input
            type="text"
            placeholder="Institute name (e.g., IIT Delhi)"
            value={newInstitute}
            onChange={(e) => setNewInstitute(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Branch name (e.g., Computer Science)"
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
            className="form-input"
          />
          <div className="form-buttons">
            <button onClick={handleAdd} className="save-button">Save</button>
            <button onClick={() => setShowAddForm(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}

      <div className="items-grid">
        {watchlist.length === 0 ? (
          <div className="empty-state">
            <p>📝 No items in your watchlist yet. Add institutes and branches you're interested in!</p>
          </div>
        ) : (
          watchlist.map(item => (
            <div key={item.id} className="watchlist-item">
              <div className="item-content">
                <h4>{item.institute}</h4>
                <p>{item.branch}</p>
                <span className="date-added">Added: {item.dateAdded}</span>
              </div>
              <button 
                className="remove-button"
                onClick={() => onRemove(item.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Bookmarks Component
const BookmarksSection = ({ bookmarks, onRemove, onAdd }) => {
  return (
    <div className="feature-section">
      <div className="section-header">
        <h3>📌 Saved Analysis</h3>
      </div>

      <div className="items-grid">
        {bookmarks.length === 0 ? (
          <div className="empty-state">
            <p>🔖 No bookmarks saved yet. Save your analysis results for quick access!</p>
          </div>
        ) : (
          bookmarks.map(bookmark => (
            <div key={bookmark.id} className="bookmark-item">
              <div className="item-content">
                <h4>{bookmark.title}</h4>
                <p>{bookmark.description}</p>
                <span className="bookmark-type">{bookmark.type}</span>
                <span className="date-added">Saved: {bookmark.dateAdded}</span>
              </div>
              <div className="item-actions">
                <button 
                  className="view-button"
                  onClick={() => window.open(bookmark.url, '_blank')}
                >
                  👁️ View
                </button>
                <button 
                  className="remove-button"
                  onClick={() => onRemove(bookmark.id)}
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Notes Component
const NotesSection = ({ notes, onSave, onDelete }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newInstitute, setNewInstitute] = useState('');
  const [newNote, setNewNote] = useState('');
  const [editingInstitute, setEditingInstitute] = useState(null);
  const [editNote, setEditNote] = useState('');

  const handleAdd = () => {
    if (newInstitute && newNote) {
      onSave(newInstitute, newNote);
      setNewInstitute('');
      setNewNote('');
      setShowAddForm(false);
    }
  };

  const handleEdit = (institute) => {
    setEditingInstitute(institute);
    setEditNote(notes[institute].text);
  };

  const handleSaveEdit = () => {
    if (editingInstitute && editNote) {
      onSave(editingInstitute, editNote);
      setEditingInstitute(null);
      setEditNote('');
    }
  };

  return (
    <div className="feature-section">
      <div className="section-header">
        <h3>📝 Institute Notes</h3>
        <button 
          className="add-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          + Add Note
        </button>
      </div>

      {showAddForm && (
        <div className="add-form">
          <input
            type="text"
            placeholder="Institute name"
            value={newInstitute}
            onChange={(e) => setNewInstitute(e.target.value)}
            className="form-input"
          />
          <textarea
            placeholder="Your notes about this institute..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="form-textarea"
            rows="3"
          />
          <div className="form-buttons">
            <button onClick={handleAdd} className="save-button">Save Note</button>
            <button onClick={() => setShowAddForm(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}

      <div className="notes-list">
        {Object.keys(notes).length === 0 ? (
          <div className="empty-state">
            <p>📄 No notes yet. Add personal notes about institutes to remember important details!</p>
          </div>
        ) : (
          Object.entries(notes).map(([institute, noteData]) => (
            <div key={institute} className="note-item">
              <div className="note-header">
                <h4>{institute}</h4>
                <span className="last-updated">Updated: {noteData.lastUpdated}</span>
              </div>
              {editingInstitute === institute ? (
                <div className="edit-form">
                  <textarea
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                    className="form-textarea"
                    rows="3"
                  />
                  <div className="form-buttons">
                    <button onClick={handleSaveEdit} className="save-button">Save</button>
                    <button onClick={() => setEditingInstitute(null)} className="cancel-button">Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="note-content">
                  <p>{noteData.text}</p>
                  <div className="note-actions">
                    <button onClick={() => handleEdit(institute)} className="edit-button">✏️ Edit</button>
                    <button onClick={() => onDelete(institute)} className="remove-button">🗑️ Delete</button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Alerts Component
const AlertsSection = ({ alerts, onAdd, onToggle, onRemove }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    institute: '',
    branch: '',
    currentCutoff: '',
    targetCutoff: '',
    alertType: 'any_change'
  });

  const handleAdd = () => {
    if (newAlert.institute && newAlert.branch && newAlert.targetCutoff) {
      onAdd(
        newAlert.institute,
        newAlert.branch,
        newAlert.currentCutoff,
        newAlert.targetCutoff,
        newAlert.alertType
      );
      setNewAlert({
        institute: '',
        branch: '',
        currentCutoff: '',
        targetCutoff: '',
        alertType: 'any_change'
      });
      setShowAddForm(false);
    }
  };

  return (
    <div className="feature-section">
      <div className="section-header">
        <h3>🔔 Cutoff Alerts</h3>
        <button 
          className="add-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          + Create Alert
        </button>
      </div>

      {showAddForm && (
        <div className="add-form">
          <input
            type="text"
            placeholder="Institute name"
            value={newAlert.institute}
            onChange={(e) => setNewAlert(prev => ({...prev, institute: e.target.value}))}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Branch name"
            value={newAlert.branch}
            onChange={(e) => setNewAlert(prev => ({...prev, branch: e.target.value}))}
            className="form-input"
          />
          <input
            type="number"
            placeholder="Target cutoff rank"
            value={newAlert.targetCutoff}
            onChange={(e) => setNewAlert(prev => ({...prev, targetCutoff: e.target.value}))}
            className="form-input"
          />
          <select
            value={newAlert.alertType}
            onChange={(e) => setNewAlert(prev => ({...prev, alertType: e.target.value}))}
            className="form-select"
          >
            <option value="any_change">Any Change</option>
            <option value="decrease">Cutoff Decreases (Easier)</option>
            <option value="increase">Cutoff Increases (Harder)</option>
          </select>
          <div className="form-buttons">
            <button onClick={handleAdd} className="save-button">Create Alert</button>
            <button onClick={() => setShowAddForm(false)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}

      <div className="alerts-list">
        {alerts.length === 0 ? (
          <div className="empty-state">
            <p>🔕 No alerts set. Create alerts to get notified when cutoffs change!</p>
          </div>
        ) : (
          alerts.map(alert => (
            <div key={alert.id} className={`alert-item ${alert.isActive ? 'active' : 'inactive'}`}>
              <div className="alert-content">
                <h4>{alert.institute} - {alert.branch}</h4>
                <p>Target Cutoff: {alert.targetCutoff}</p>
                <p>Alert Type: {alert.alertType.replace('_', ' ')}</p>
                <span className="date-created">Created: {alert.dateCreated}</span>
              </div>
              <div className="alert-actions">
                <button 
                  onClick={() => onToggle(alert.id)}
                  className={`toggle-button ${alert.isActive ? 'active' : 'inactive'}`}
                >
                  {alert.isActive ? '🔔 Active' : '🔕 Paused'}
                </button>
                <button 
                  onClick={() => onRemove(alert.id)}
                  className="remove-button"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserFeatures;