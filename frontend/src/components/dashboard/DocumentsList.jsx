import React, { useState } from 'react';
import { FileText, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Download, Calendar, Clock } from 'lucide-react';

const DocumentsList = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');

  // Mock documents data
  const documents = [
    {
      id: 1,
      title: 'AI Ethics Research Paper',
      type: 'Academic Essay',
      role: 'Professor',
      wordCount: 2847,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T14:22:00Z',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Product Launch Blog Post',
      type: 'Blog Post',
      role: 'Marketing Specialist',
      wordCount: 1256,
      createdAt: '2024-01-14T09:15:00Z',
      updatedAt: '2024-01-14T11:45:00Z',
      status: 'draft'
    },
    {
      id: 3,
      title: 'Client Proposal Email',
      type: 'Professional Email',
      role: 'Business Professional',
      wordCount: 423,
      createdAt: '2024-01-13T16:20:00Z',
      updatedAt: '2024-01-13T16:35:00Z',
      status: 'completed'
    },
    {
      id: 4,
      title: 'Creative Writing Piece',
      type: 'Creative Writing',
      role: 'Poet',
      wordCount: 892,
      createdAt: '2024-01-12T14:10:00Z',
      updatedAt: '2024-01-12T15:30:00Z',
      status: 'completed'
    },
    {
      id: 5,
      title: 'Technical Documentation',
      type: 'Technical Writing',
      role: 'Scientist',
      wordCount: 3421,
      createdAt: '2024-01-11T11:00:00Z',
      updatedAt: '2024-01-11T17:45:00Z',
      status: 'completed'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return { bg: 'var(--accent-green-200)', text: '#059669' };
      case 'draft':
        return { bg: 'var(--accent-orange-200)', text: '#D97706' };
      default:
        return { bg: 'var(--accent-grey-200)', text: 'var(--text-muted)' };
    }
  };

  const filteredDocuments = documents
    .filter(doc => {
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           doc.role.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesFilter = filterType === 'all' || 
                           (filterType === 'completed' && doc.status === 'completed') ||
                           (filterType === 'draft' && doc.status === 'draft');
      
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'recent':
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        case 'oldest':
          return new Date(a.updatedAt) - new Date(b.updatedAt);
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        case 'wordCount':
          return b.wordCount - a.wordCount;
        default:
          return 0;
      }
    });

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ 
        padding: '2rem', 
        borderBottom: '1px solid var(--border-light)',
        background: 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <div>
            <h1 className="heading-1" style={{ marginBottom: '0.5rem' }}>My Documents</h1>
            <p className="body-medium" style={{ color: 'var(--text-muted)' }}>
              Manage and organize your AI-generated content
            </p>
          </div>
          <button className="btn-primary">
            <FileText size={16} style={{ marginRight: '0.5rem' }} />
            New Document
          </button>
        </div>

        {/* Search and Filters */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '300px' }}>
            <Search size={18} style={{ 
              position: 'absolute', 
              left: '1rem', 
              top: '50%', 
              transform: 'translateY(-50%)', 
              color: 'var(--text-muted)' 
            }} />
            <input
              type="text"
              placeholder="Search documents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem 0.75rem 3rem',
                border: '1px solid var(--border-input)',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                background: 'var(--bg-page)'
              }}
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border-input)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              background: 'var(--bg-page)',
              minWidth: '120px'
            }}
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="draft">Drafts</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '0.75rem',
              border: '1px solid var(--border-input)',
              borderRadius: '0.5rem',
              fontSize: '0.875rem',
              background: 'var(--bg-page)',
              minWidth: '120px'
            }}
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="alphabetical">A-Z</option>
            <option value="wordCount">Word Count</option>
          </select>
        </div>
      </div>

      {/* Documents Grid */}
      <div style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        {filteredDocuments.length === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            color: 'var(--text-muted)',
            padding: '3rem',
            background: 'var(--bg-card)',
            borderRadius: '0.75rem',
            border: '1px solid var(--border-light)'
          }}>
            <FileText size={48} style={{ marginBottom: '1rem', opacity: 0.3 }} />
            <h3 className="heading-3" style={{ marginBottom: '0.5rem' }}>No documents found</h3>
            <p className="body-medium">
              {searchQuery ? 'Try adjusting your search terms' : 'Create your first document to get started'}
            </p>
          </div>
        ) : (
          <div className="ai-grid">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="voice-card hover-lift" style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <h3 className="voice-card-title" style={{ marginBottom: '0.5rem' }}>
                      {doc.title}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span className="body-small" style={{ 
                        background: 'var(--accent-blue-200)', 
                        color: 'var(--accent-blue-400)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem'
                      }}>
                        {doc.type}
                      </span>
                      <span className="body-small" style={{ 
                        background: 'var(--accent-purple-200)', 
                        color: 'var(--accent-purple-400)',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem'
                      }}>
                        {doc.role}
                      </span>
                    </div>
                  </div>
                  
                  <div style={{ position: 'relative' }}>
                    <button style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      borderRadius: '0.25rem',
                      color: 'var(--text-muted)'
                    }}>
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <FileText size={14} style={{ color: 'var(--text-muted)' }} />
                    <span className="body-small" style={{ color: 'var(--text-muted)' }}>
                      {doc.wordCount.toLocaleString()} words
                    </span>
                  </div>
                  
                  <div style={{ 
                    ...getStatusColor(doc.status),
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    background: getStatusColor(doc.status).bg,
                    color: getStatusColor(doc.status).text
                  }}>
                    {doc.status}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                    <span className="caption" style={{ color: 'var(--text-muted)' }}>
                      Created {formatDate(doc.createdAt)}
                    </span>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={14} style={{ color: 'var(--text-muted)' }} />
                    <span className="caption" style={{ color: 'var(--text-muted)' }}>
                      Updated {formatDate(doc.updatedAt)}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="btn-secondary" style={{ 
                    flex: 1, 
                    padding: '0.5rem', 
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem'
                  }}>
                    <Eye size={14} />
                    View
                  </button>
                  <button className="btn-secondary" style={{ 
                    flex: 1, 
                    padding: '0.5rem', 
                    fontSize: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.25rem'
                  }}>
                    <Edit size={14} />
                    Edit
                  </button>
                  <button className="btn-secondary" style={{ 
                    padding: '0.5rem', 
                    fontSize: '0.75rem',
                    minWidth: 'auto'
                  }}>
                    <Download size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentsList;