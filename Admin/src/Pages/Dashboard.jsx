import React, { useState, useEffect } from 'react'
import { assets } from '../../assets/assets.js'
import { Link } from 'react-router-dom'

const Dashboard = () => {
  const [services, setServices] = useState([
    {
      id: 1,
      name: 'Beds',
      icon: assets.bed,
      total: 120,
      available: 85,
      color: '#e74c3c',
      bgColor: '#fadbd8'
    },
    {
      id: 2,
      name: 'Oxygen',
      icon: assets.oxygen,
      total: 50,
      available: 42,
      color: '#3498db',
      bgColor: '#d6eaf8'
    },
    {
      id: 3,
      name: 'Blood (Units)',
      icon: assets.blood_drop,
      total: 200,
      available: 165,
      color: '#c0392b',
      bgColor: '#fadbd8'
    },
    {
      id: 4,
      name: 'Equipment',
      icon: assets.medical,
      total: 30,
      available: 28,
      color: '#27ae60',
      bgColor: '#d5f4e6'
    },
    {
      id: 5,
      name: 'Ambulance',
      icon: assets.ambulance,
      total: 10,
      available: 8,
      color: '#f39c12',
      bgColor: '#fdebd0'
    }
  ])

  const [hospitalInfo] = useState({
    name: 'City Medical Hospital',
    location: 'New York',
    beds: 120,
    staff: 250
  })

  return (
    <div style={styles.dashboard}>
      <Sidebar />
      <div style={styles.mainContent}>
        <DashboardNavbar hospitalName={hospitalInfo.name} />
        
        <div style={styles.container}>
          <div style={styles.dashboardHeader}>
            <h1>Dashboard</h1>
            <p>Welcome to your hospital admin panel</p>
          </div>

          {/* Stats Cards */}
          <div style={styles.statsGrid}>
            {services.map(service => (
              <Link key={service.id} to={`/services/${service.name.toLowerCase()}`} style={{textDecoration: 'none'}}>
                <div style={{
                  ...styles.serviceCard,
                  borderLeft: `4px solid ${service.color}`
                }}>
                  <div style={{...styles.cardImage, backgroundColor: service.bgColor}}>
                    <img src={service.icon} alt={service.name} />
                  </div>
                  <div style={styles.cardContent}>
                    <p style={styles.serviceName}>{service.name}</p>
                    <div style={styles.statsContainer}>
                      <div>
                        <span style={styles.statValue}>{service.available}</span>
                        <span style={styles.statLabel}>Available</span>
                      </div>
                      <div style={{borderLeft: '1px solid #eee', paddingLeft: '15px'}}>
                        <span style={styles.statValue}>{service.total}</span>
                        <span style={styles.statLabel}>Total</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Quick Stats */}
          <div style={styles.quickStats}>
            <div style={styles.quickStatBox}>
              <h3>Total Beds</h3>
              <p style={styles.bigNumber}>{hospitalInfo.beds}</p>
              <span style={styles.statChange}>↑ 5% from last month</span>
            </div>
            <div style={styles.quickStatBox}>
              <h3>Occupancy Rate</h3>
              <p style={styles.bigNumber}>71%</p>
              <span style={styles.statChange}>Normal</span>
            </div>
            <div style={styles.quickStatBox}>
              <h3>Staff Count</h3>
              <p style={styles.bigNumber}>{hospitalInfo.staff}</p>
              <span style={styles.statChange}>Active today</span>
            </div>
            <div style={styles.quickStatBox}>
              <h3>Pending Orders</h3>
              <p style={styles.bigNumber}>12</p>
              <span style={styles.statChange}>2 urgent</span>
            </div>
          </div>

          {/* Recent Activity */}
          <div style={styles.activitySection}>
            <h2>Recent Activity</h2>
            <div style={styles.activityList}>
              <div style={styles.activityItem}>
                <div style={{...styles.activityDot, backgroundColor: '#27ae60'}}></div>
                <div>
                  <p>New blood stock added</p>
                  <span style={styles.activityTime}>2 hours ago</span>
                </div>
              </div>
              <div style={styles.activityItem}>
                <div style={{...styles.activityDot, backgroundColor: '#f39c12'}}></div>
                <div>
                  <p>Oxygen refill scheduled</p>
                  <span style={styles.activityTime}>4 hours ago</span>
                </div>
              </div>
              <div style={styles.activityItem}>
                <div style={{...styles.activityDot, backgroundColor: '#3498db'}}></div>
                <div>
                  <p>New bed added to ICU</p>
                  <span style={styles.activityTime}>1 day ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Sidebar = () => {
  const [active, setActive] = useState('dashboard')

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'beds', label: 'Beds', icon: '🛏️' },
    { id: 'oxygen', label: 'Oxygen', icon: '💨' },
    { id: 'blood', label: 'Blood Bank', icon: '🩸' },
    { id: 'equipment', label: 'Equipment', icon: '🏥' },
    { id: 'ambulance', label: 'Ambulance', icon: '🚑' },
    { id: 'orders', label: 'Orders', icon: '📋' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
  ]

  return (
    <div style={styles.sidebar}>
      <div style={styles.sidebarHeader}>
        <h3>HMS Admin</h3>
      </div>
      <nav style={styles.sidebarNav}>
        {menuItems.map(item => (
          <Link
            key={item.id}
            to={item.id === 'dashboard' ? '/dashboard' : `/services/${item.id}`}
            style={{textDecoration: 'none'}}
          >
            <div
              style={{
                ...styles.navItem,
                backgroundColor: active === item.id ? '#f0f0f0' : 'transparent',
                borderLeft: active === item.id ? '4px solid #667eea' : 'none',
                paddingLeft: active === item.id ? '12px' : '16px'
              }}
              onClick={() => setActive(item.id)}
            >
              <span style={styles.navIcon}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          </Link>
        ))}
      </nav>
    </div>
  )
}

const DashboardNavbar = ({ hospitalName }) => {
  return (
    <div style={styles.dashboardNavbar}>
      <div style={styles.navLeft}>
        <h2>Hospital Admin Panel</h2>
      </div>
      <div style={styles.navRight}>
        <div style={styles.notificationBell}>
          <span style={styles.bellIcon}>🔔</span>
          <div style={styles.notificationBadge}>3</div>
        </div>
        <div style={styles.userProfile}>
          <div style={styles.avatar}>{hospitalName.charAt(0)}</div>
          <div>
            <p style={styles.userName}>Hospital Admin</p>
            <p style={styles.userEmail}>{hospitalName}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

const styles = {
  dashboard: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f5f5f5'
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#fff',
    boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
    padding: '20px 0',
    position: 'fixed',
    height: '100vh',
    overflowY: 'auto'
  },
  sidebarHeader: {
    padding: '0 20px 30px',
    borderBottom: '1px solid #eee'
  },
  sidebarNav: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
    marginTop: '20px'
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px 16px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    margin: '0 10px'
  },
  navIcon: {
    fontSize: '1.3rem'
  },
  mainContent: {
    flex: 1,
    marginLeft: '250px',
    display: 'flex',
    flexDirection: 'column'
  },
  dashboardNavbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px 30px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  navLeft: {
    flex: 1
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '30px'
  },
  notificationBell: {
    position: 'relative',
    cursor: 'pointer',
    fontSize: '1.3rem'
  },
  notificationBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    backgroundColor: '#e74c3c',
    color: '#fff',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 'bold'
  },
  bellIcon: {
    fontSize: '1.3rem'
  },
  userProfile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  avatar: {
    width: '40px',
    height: '40px',
    backgroundColor: '#667eea',
    color: '#fff',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontSize: '1.2rem'
  },
  userName: {
    margin: 0,
    fontSize: '0.9rem',
    fontWeight: '600'
  },
  userEmail: {
    margin: 0,
    fontSize: '0.8rem',
    color: '#999'
  },
  container: {
    padding: '30px',
    overflowY: 'auto',
    flex: 1
  },
  dashboardHeader: {
    marginBottom: '30px'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    display: 'flex',
    gap: '15px',
    transition: 'all 0.3s ease',
    cursor: 'pointer'
  },
  cardImage: {
    width: '60px',
    height: '60px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0
  },
  cardContent: {
    flex: 1
  },
  serviceName: {
    margin: 0,
    fontWeight: '600',
    marginBottom: '8px'
  },
  statsContainer: {
    display: 'flex',
    gap: '20px'
  },
  statValue: {
    display: 'block',
    fontSize: '1.2rem',
    fontWeight: 'bold'
  },
  statLabel: {
    display: 'block',
    fontSize: '0.75rem',
    color: '#999'
  },
  quickStats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    marginBottom: '30px'
  },
  quickStatBox: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  bigNumber: {
    fontSize: '2rem',
    fontWeight: 'bold',
    margin: '10px 0',
    color: '#667eea'
  },
  statChange: {
    display: 'block',
    fontSize: '0.85rem',
    color: '#27ae60'
  },
  activitySection: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  activityList: {
    marginTop: '15px'
  },
  activityItem: {
    display: 'flex',
    gap: '15px',
    padding: '15px 0',
    borderBottom: '1px solid #f0f0f0'
  },
  activityDot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    marginTop: '5px'
  },
  activityTime: {
    display: 'block',
    fontSize: '0.8rem',
    color: '#999',
    marginTop: '5px'
  }
}

export default Dashboard
