import React, { useState, useEffect } from 'react';
import './ProfileModal.css';

const ProfileModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('watchlist');
  const [watchlist, setWatchlist] = useState([]);
  const [bookmarks, setBookmarks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [alerts, setAlerts] = useState([]);

  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({});

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedWatchlist = JSON.parse(localStorage.getItem('josaa_watchlist') || '[]');
      const savedBookmarks = JSON.parse(localStorage.getItem('josaa_bookmarks') || '[]');
      const savedNotes = JSON.parse(localStorage.getItem('josaa_notes') || '[]');
      const savedAlerts = JSON.parse(localStorage.getItem('josaa_alerts') || '[]');

      // Ensure all items are arrays
      setWatchlist(Array.isArray(savedWatchlist) ? savedWatchlist : []);
      setBookmarks(Array.isArray(savedBookmarks) ? savedBookmarks : []);
      setNotes(Array.isArray(savedNotes) ? savedNotes : []);
      setAlerts(Array.isArray(savedAlerts) ? savedAlerts : []);
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      // Set default empty arrays if parsing fails
      setWatchlist([]);
      setBookmarks([]);
      setNotes([]);
      setAlerts([]);
    }
  }, []);

  // Save to localStorage
  const saveToStorage = (key, data) => {
    try {
      // Ensure data is an array before saving
      const dataToSave = Array.isArray(data) ? data : [];
      localStorage.setItem(key, JSON.stringify(dataToSave));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  };

  // Generic add function
  const handleAdd = (type) => {
    const newItem = { ...formData, id: Date.now(), dateAdded: new Date().toLocaleDateString() };
    
    switch (type) {
      case 'watchlist':
        const updatedWatchlist = [...watchlist, newItem];
        setWatchlist(updatedWatchlist);
        saveToStorage('josaa_watchlist', updatedWatchlist);
        break;
      case 'bookmarks':
        const updatedBookmarks = [...bookmarks, newItem];
        setBookmarks(updatedBookmarks);
        saveToStorage('josaa_bookmarks', updatedBookmarks);
        break;
      case 'notes':
        newItem.lastUpdated = new Date().toLocaleDateString();
        const updatedNotes = [...notes, newItem];
        setNotes(updatedNotes);
        saveToStorage('josaa_notes', updatedNotes);
        break;
      case 'alerts':
        newItem.active = true;
        const updatedAlerts = [...alerts, newItem];
        setAlerts(updatedAlerts);
        saveToStorage('josaa_alerts', updatedAlerts);
        break;
      default:
        console.error('Unknown type:', type);
        break;
    }
    
    setFormData({});
    setShowAddForm(false);
  };

  // Generic remove function
  const handleRemove = (type, id) => {
    switch (type) {
      case 'watchlist':
        const filteredWatchlist = watchlist.filter(item => item.id !== id);
        setWatchlist(filteredWatchlist);
        saveToStorage('josaa_watchlist', filteredWatchlist);
        break;
      case 'bookmarks':
        const filteredBookmarks = bookmarks.filter(item => item.id !== id);
        setBookmarks(filteredBookmarks);
        saveToStorage('josaa_bookmarks', filteredBookmarks);
        break;
      case 'notes':
        const filteredNotes = notes.filter(item => item.id !== id);
        setNotes(filteredNotes);
        saveToStorage('josaa_notes', filteredNotes);
        break;
      case 'alerts':
        const filteredAlerts = alerts.filter(item => item.id !== id);
        setAlerts(filteredAlerts);
        saveToStorage('josaa_alerts', filteredAlerts);
        break;
      default:
        console.error('Unknown type:', type);
        break;
    }
  };

  // Toggle alert active status
  const toggleAlert = (id) => {
    if (!Array.isArray(alerts)) {
      console.error('Alerts is not an array');
      return;
    }
    const updatedAlerts = alerts.map(alert =>
      alert.id === id ? { ...alert, active: !alert.active } : alert
    );
    setAlerts(updatedAlerts);
    saveToStorage('josaa_alerts', updatedAlerts);
  };

  if (!isOpen) return null;

  const renderAddForm = () => {
    if (!showAddForm) return null;

    return (
      <div className="profile-add-form">
        {activeTab === 'watchlist' && (
          <>
            <input
              className="profile-form-input"
              type="text"
              placeholder="Institute Name"
              value={formData.institute || ''}
              onChange={(e) => setFormData({...formData, institute: e.target.value})}
            />
            <input
              className="profile-form-input"
              type="text"
              placeholder="Branch Name"
              value={formData.branch || ''}
              onChange={(e) => setFormData({...formData, branch: e.target.value})}
            />
          </>
        )}
        
        {activeTab === 'bookmarks' && (
          <>
            <input
              className="profile-form-input"
              type="text"
              placeholder="Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            <input
              className="profile-form-input"
              type="text"
              placeholder="Description"
              value={formData.description || ''}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
            <select
              className="profile-form-select"
              value={formData.type || ''}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="">Select Type</option>
              <option value="analysis">Analysis</option>
              <option value="cutoff">Cutoff</option>
              <option value="trend">Trend</option>
              <option value="comparison">Comparison</option>
            </select>
          </>
        )}
        
        {activeTab === 'notes' && (
          <>
            <input
              className="profile-form-input"
              type="text"
              placeholder="Institute Name"
              value={formData.institute || ''}
              onChange={(e) => setFormData({...formData, institute: e.target.value})}
            />
            <textarea
              className="profile-form-textarea"
              placeholder="Your notes..."
              value={formData.content || ''}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
            />
          </>
        )}
        
        {activeTab === 'alerts' && (
          <>
            <input
              className="profile-form-input"
              type="text"
              placeholder="Alert Title"
              value={formData.title || ''}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
            <select
              className="profile-form-select"
              value={formData.type || ''}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="">Select Alert Type</option>
              <option value="cutoff-increase">Cutoff Increase</option>
              <option value="cutoff-decrease">Cutoff Decrease</option>
              <option value="new-data">New Data Available</option>
            </select>
            <input
              className="profile-form-input"
              type="text"
              placeholder="Target (e.g., IIT Delhi CSE)"
              value={formData.target || ''}
              onChange={(e) => setFormData({...formData, target: e.target.value})}
            />
          </>
        )}
        
        <div className="profile-form-buttons">
          <button 
            className="profile-save-button"
            onClick={() => handleAdd(activeTab)}
            disabled={!Object.keys(formData).length}
          >
            Add
          </button>
          <button 
            className="profile-cancel-button"
            onClick={() => {
              setShowAddForm(false);
              setFormData({});
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'watchlist':
        return (
          <div className="profile-content">
            <div className="profile-section-header">
              <h3>Personal Watchlist</h3>
              <button 
                className="profile-add-button"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                +
              </button>
            </div>
            {renderAddForm()}
            <div className="profile-items-container">
              {!Array.isArray(watchlist) || watchlist.length === 0 ? (
                <div className="profile-empty-state">
                  <p>No items in watchlist yet. Add your favorite institutes and branches!</p>
                </div>
              ) : (
                watchlist.map(item => (
                  <div key={item.id} className="profile-item">
                    <div className="profile-item-content">
                      <h4>{item.institute}</h4>
                      <p>{item.branch}</p>
                      <span className="profile-date-added">Added: {item.dateAdded}</span>
                    </div>
                    <button 
                      className="profile-remove-button"
                      onClick={() => handleRemove('watchlist', item.id)}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'bookmarks':
        return (
          <div className="profile-content">
            <div className="profile-section-header">
              <h3>Bookmarks</h3>
              <button 
                className="profile-add-button"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                +
              </button>
            </div>
            {renderAddForm()}
            <div className="profile-items-container">
              {!Array.isArray(bookmarks) || bookmarks.length === 0 ? (
                <div className="profile-empty-state">
                  <p>No bookmarks saved yet. Bookmark interesting analysis results!</p>
                </div>
              ) : (
                bookmarks.map(item => (
                  <div key={item.id} className="profile-item">
                    <div className="profile-item-content">
                      <h4>{item.title}</h4>
                      <p>{item.description}</p>
                      <span className="profile-bookmark-type">{item.type}</span>
                      <span className="profile-date-added">Saved: {item.dateAdded}</span>
                    </div>
                    <button 
                      className="profile-remove-button"
                      onClick={() => handleRemove('bookmarks', item.id)}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'notes':
        return (
          <div className="profile-content">
            <div className="profile-section-header">
              <h3>Personal Notes</h3>
              <button 
                className="profile-add-button"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                +
              </button>
            </div>
            {renderAddForm()}
            <div className="profile-items-container">
              {!Array.isArray(notes) || notes.length === 0 ? (
                <div className="profile-empty-state">
                  <p>No notes yet. Add personal notes about institutes!</p>
                </div>
              ) : (
                notes.map(item => (
                  <div key={item.id} className="profile-item profile-note-item">
                    <div className="profile-item-content">
                      <h4>{item.institute}</h4>
                      <p>{item.content}</p>
                      <span className="profile-date-added">Last updated: {item.lastUpdated}</span>
                    </div>
                    <button 
                      className="profile-remove-button"
                      onClick={() => handleRemove('notes', item.id)}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      case 'alerts':
        return (
          <div className="profile-content">
            <div className="profile-section-header">
              <h3>Custom Alerts</h3>
              <button 
                className="profile-add-button"
                onClick={() => setShowAddForm(!showAddForm)}
              >
                +
              </button>
            </div>
            {renderAddForm()}
            <div className="profile-items-container">
              {!Array.isArray(alerts) || alerts.length === 0 ? (
                <div className="profile-empty-state">
                  <p>No alerts set up. Create custom alerts for cutoff changes!</p>
                </div>
              ) : (
                alerts.map(item => (
                  <div key={item.id} className={`profile-item profile-alert-item ${item.active ? 'active' : 'inactive'}`}>
                    <div className="profile-item-content">
                      <h4>{item.title}</h4>
                      <p>Type: {item.type}</p>
                      <p>Target: {item.target}</p>
                      <span className="profile-date-added">Created: {item.dateAdded}</span>
                    </div>
                    <div className="profile-alert-actions">
                      <button 
                        className={`profile-toggle-button ${item.active ? 'active' : 'inactive'}`}
                        onClick={() => toggleAlert(item.id)}
                      >
                        {item.active ? 'ON' : 'OFF'}
                      </button>
                      <button 
                        className="profile-remove-button"
                        onClick={() => handleRemove('alerts', item.id)}
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="profile-modal-overlay" onClick={onClose}>
      <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
        <div className="profile-modal-header">
          <h2>Personal Dashboard</h2>
          <button className="profile-close-button" onClick={onClose}>×</button>
        </div>
        
        <div className="profile-tabs">
          <button 
            className={`profile-tab-button ${activeTab === 'watchlist' ? 'active' : ''}`}
            onClick={() => setActiveTab('watchlist')}
          >
            📌 Watchlist
          </button>
          <button 
            className={`profile-tab-button ${activeTab === 'bookmarks' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookmarks')}
          >
            🔖 Bookmarks
          </button>
          <button 
            className={`profile-tab-button ${activeTab === 'notes' ? 'active' : ''}`}
            onClick={() => setActiveTab('notes')}
          >
            📝 Notes
          </button>
          <button 
            className={`profile-tab-button ${activeTab === 'alerts' ? 'active' : ''}`}
            onClick={() => setActiveTab('alerts')}
          >
            🔔 Alerts
          </button>
        </div>

        <div className="profile-modal-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;