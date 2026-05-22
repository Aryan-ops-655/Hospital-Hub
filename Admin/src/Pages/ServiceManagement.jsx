import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { assets } from '../../assets/assets.js'

const ServiceManagement = () => {
  const { serviceType } = useParams()
  const [items, setItems] = useState(generateMockData(serviceType))
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [filterStatus, setFilterStatus] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')

  const [formData, setFormData] = useState(getEmptyFormData(serviceType))

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingId) {
      setItems(items.map(item => item.id === editingId ? { ...formData, id: editingId } : item))
      setEditingId(null)
    } else {
      setItems([...items, { ...formData, id: Date.now() }])
    }
    setFormData(getEmptyFormData(serviceType))
    setShowAddForm(false)
  }

  const handleEdit = (item) => {
    setFormData(item)
    setEditingId(item.id)
    setShowAddForm(true)
  }

  const handleDelete = (id) => {
    if (confirm('Are you sure?')) {
      setItems(items.filter(item => item.id !== id))
    }
  }

  const filteredItems = items.filter(item => {
    const statusMatch = filterStatus === 'All' || item.status === filterStatus
    const searchMatch = searchTerm === '' || 
      Object.values(item).some(val => String(val).toLowerCase().includes(searchTerm.toLowerCase()))
    return statusMatch && searchMatch
  })

  const { icon, color, bgColor, headers } = getServiceConfig(serviceType)

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.headerLeft}>
          <div style={{...styles.headerIcon, backgroundColor: bgColor}}>
            <img src={icon} alt={serviceType} style={{width: '40px'}} />
          </div>
          <div>
            <h1 style={{margin: 0, textTransform: 'capitalize'}}>{serviceType} Management</h1>
            <p style={{margin: '5px 0 0 0', color: '#999'}}>Manage your {serviceType} inventory</p>
          </div>
        </div>
        <button 
          onClick={() => {
            setShowAddForm(true)
            setEditingId(null)
            setFormData(getEmptyFormData(serviceType))
          }}
          style={{...styles.addBtn, backgroundColor: color}}
        >
          + Add New {serviceType.slice(0, -1)}
        </button>
      </div>

      {showAddForm && (
        <div style={styles.formOverlay}>
          <div style={styles.formContainer}>
            <div style={styles.formHeader}>
              <h2>{editingId ? 'Edit' : 'Add New'} {serviceType.slice(0, -1)}</h2>
              <button onClick={() => setShowAddForm(false)} style={styles.closeBtn}>✕</button>
            </div>
            <form onSubmit={handleSubmit} style={styles.form}>
              {headers.map((header, idx) => (
                <div key={idx} style={styles.formGroup}>
                  <label>{header.label}</label>
                  {header.type === 'select' ? (
                    <select
                      name={header.key}
                      value={formData[header.key]}
                      onChange={handleChange}
                      required
                      style={styles.input}
                    >
                      <option value="">Select {header.label}</option>
                      {header.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : header.type === 'textarea' ? (
                    <textarea
                      name={header.key}
                      value={formData[header.key]}
                      onChange={handleChange}
                      style={{...styles.input, minHeight: '80px'}}
                    />
                  ) : (
                    <input
                      type={header.type}
                      name={header.key}
                      value={formData[header.key]}
                      onChange={handleChange}
                      required={header.required}
                      style={styles.input}
                    />
                  )}
                </div>
              ))}
              <div style={styles.formActions}>
                <button type="button" onClick={() => setShowAddForm(false)} style={styles.cancelBtn}>Cancel</button>
                <button type="submit" style={{...styles.submitBtn, backgroundColor: color}}>
                  {editingId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div style={styles.filterBar}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.filters}>
          {['All', 'Available', 'In Use', 'Maintenance', 'Low Stock'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                ...styles.filterBtn,
                backgroundColor: filterStatus === status ? color : '#f0f0f0',
                color: filterStatus === status ? '#fff' : '#333'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div style={styles.itemsGrid}>
        {filteredItems.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No {serviceType} found</p>
            <button onClick={() => setShowAddForm(true)} style={{...styles.addBtn, backgroundColor: color}}>
              Add First {serviceType.slice(0, -1)}
            </button>
          </div>
        ) : (
          filteredItems.map(item => (
            <div key={item.id} style={{...styles.itemCard, borderLeft: `4px solid ${color}`}}>
              <div style={styles.itemHeader}>
                <h3 style={{margin: 0}}>{item.name || item.id}</h3>
                <span style={{...styles.statusBadge, backgroundColor: getStatusColor(item.status)}}>
                  {item.status}
                </span>
              </div>
              <div style={styles.itemDetails}>
                {Object.entries(item).map(([key, value]) => {
                  if (key === 'id' || key === 'name' || key === 'status') return null
                  return (
                    <div key={key} style={styles.detailRow}>
                      <span style={styles.detailLabel}>{key}:</span>
                      <span style={styles.detailValue}>{value}</span>
                    </div>
                  )
                })}
              </div>
              <div style={styles.itemActions}>
                <button onClick={() => handleEdit(item)} style={{...styles.actionBtn, backgroundColor: '#3498db'}}>
                  Edit
                </button>
                <button onClick={() => handleDelete(item.id)} style={{...styles.actionBtn, backgroundColor: '#e74c3c'}}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

function generateMockData(serviceType) {
  const mockData = {
    beds: [
      { id: 1, name: 'Bed A1', type: 'ICU', floor: '3', status: 'In Use', equipment: 'Ventilator' },
      { id: 2, name: 'Bed A2', type: 'General', floor: '3', status: 'Available', equipment: 'None' },
      { id: 3, name: 'Bed B1', type: 'General', floor: '2', status: 'Available', equipment: 'Monitor' },
    ],
    oxygen: [
      { id: 1, name: 'Cylinder O1', capacity: '10L', status: 'Available', location: 'Store 1' },
      { id: 2, name: 'Cylinder O2', capacity: '10L', status: 'In Use', location: 'ICU' },
    ],
    equipment: [
      { id: 1, name: 'Ventilator V1', type: 'Ventilator', status: 'Available', location: 'ICU Store' },
      { id: 2, name: 'Monitor M1', type: 'Monitor', status: 'In Use', location: 'Room 101' },
    ],
    ambulance: [
      { id: 1, name: 'Ambulance A1', type: 'Advanced', status: 'Available', driver: 'John Doe' },
      { id: 2, name: 'Ambulance A2', type: 'Basic', status: 'In Use', driver: 'Jane Smith' },
    ]
  }
  return mockData[serviceType] || []
}

function getEmptyFormData(serviceType) {
  const templates = {
    beds: { name: '', type: '', floor: '', status: 'Available', equipment: '' },
    oxygen: { name: '', capacity: '', status: 'Available', location: '' },
    equipment: { name: '', type: '', status: 'Available', location: '' },
    ambulance: { name: '', type: '', status: 'Available', driver: '' }
  }
  return templates[serviceType] || {}
}

function getServiceConfig(serviceType) {
  const configs = {
    beds: {
      icon: assets.bed,
      color: '#e74c3c',
      bgColor: '#fadbd8',
      headers: [
        { key: 'name', label: 'Bed Name', type: 'text', required: true },
        { key: 'type', label: 'Bed Type', type: 'select', options: ['ICU', 'General', 'HDU', 'NICU'], required: true },
        { key: 'floor', label: 'Floor Number', type: 'text', required: true },
        { key: 'equipment', label: 'Equipment', type: 'text' },
        { key: 'status', label: 'Status', type: 'select', options: ['Available', 'In Use', 'Maintenance'], required: true }
      ]
    },
    oxygen: {
      icon: assets.oxygen,
      color: '#3498db',
      bgColor: '#d6eaf8',
      headers: [
        { key: 'name', label: 'Cylinder Name', type: 'text', required: true },
        { key: 'capacity', label: 'Capacity (Liters)', type: 'text', required: true },
        { key: 'location', label: 'Location', type: 'text', required: true },
        { key: 'status', label: 'Status', type: 'select', options: ['Available', 'In Use', 'Low Stock', 'Empty'], required: true }
      ]
    },
    equipment: {
      icon: assets.medical,
      color: '#27ae60',
      bgColor: '#d5f4e6',
      headers: [
        { key: 'name', label: 'Equipment Name', type: 'text', required: true },
        { key: 'type', label: 'Equipment Type', type: 'select', options: ['Ventilator', 'Monitor', 'Defibrillator', 'Pump'], required: true },
        { key: 'location', label: 'Location', type: 'text', required: true },
        { key: 'status', label: 'Status', type: 'select', options: ['Available', 'In Use', 'Maintenance'], required: true }
      ]
    },
    ambulance: {
      icon: assets.ambulance,
      color: '#f39c12',
      bgColor: '#fdebd0',
      headers: [
        { key: 'name', label: 'Ambulance Name', type: 'text', required: true },
        { key: 'type', label: 'Ambulance Type', type: 'select', options: ['Basic', 'Advanced', 'ICU'], required: true },
        { key: 'driver', label: 'Driver Name', type: 'text', required: true },
        { key: 'status', label: 'Status', type: 'select', options: ['Available', 'In Use', 'Maintenance'], required: true }
      ]
    }
  }
  return configs[serviceType] || {}
}

function getStatusColor(status) {
  const colors = {
    'Available': '#27ae60',
    'In Use': '#f39c12',
    'Maintenance': '#e74c3c',
    'Low Stock': '#e67e22'
  }
  return colors[status] || '#95a5a6'
}

const styles = {
  container: {
    padding: '30px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px'
  },
  headerIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addBtn: {
    padding: '12px 24px',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'all 0.3s ease'
  },
  formOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  formContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '30px',
    maxWidth: '600px',
    width: '90%',
    maxHeight: '80vh',
    overflowY: 'auto'
  },
  formHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  input: {
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem'
  },
  formActions: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  },
  cancelBtn: {
    flex: 1,
    padding: '10px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    cursor: 'pointer',
    backgroundColor: '#f5f5f5'
  },
  submitBtn: {
    flex: 1,
    padding: '10px',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  filterBar: {
    display: 'flex',
    gap: '20px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  searchBox: {
    flex: 1,
    minWidth: '200px'
  },
  searchInput: {
    width: '100%',
    padding: '10px 15px',
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1rem'
  },
  filters: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  filterBtn: {
    padding: '8px 16px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease'
  },
  itemsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px'
  },
  emptyState: {
    gridColumn: '1 / -1',
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '8px'
  },
  itemCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  itemHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px'
  },
  statusBadge: {
    color: '#fff',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '0.85rem',
    fontWeight: '600'
  },
  itemDetails: {
    marginBottom: '15px'
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '5px 0',
    fontSize: '0.9rem',
    borderBottom: '1px solid #f0f0f0'
  },
  detailLabel: {
    fontWeight: '600',
    color: '#666'
  },
  detailValue: {
    color: '#333'
  },
  itemActions: {
    display: 'flex',
    gap: '10px'
  },
  actionBtn: {
    flex: 1,
    padding: '8px 12px',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem'
  }
}

export default ServiceManagement
