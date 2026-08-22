import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function EmployeeDashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({ phone: '', address: '' });
  const [checkedIn, setCheckedIn] = useState(false);
  const [leaveData, setLeaveData] = useState({ leave_type: 'Casual Leave', start_date: '', reason: '' });
  const [payroll, setPayroll] = useState({ basic_salary: 0, deductions: 0, net_salary: 0 });

  // Fetch initial data from backend API once connected
  useEffect(() => {
    // axios.get('/api/profile/me').then(res => setProfile(res.data));
    // axios.get('/api/payroll/me').then(res => setPayroll(res.data));
  }, []);

  const handleCheckInToggle = () => {
    // API Call: axios.post(`/api/attendance/${checkedIn ? 'checkout' : 'checkin'}`)
    setCheckedIn(!checkedIn);
  };

  const handleLeaveSubmit = (e) => {
    e.preventDefault();
    // API Call: axios.post('/api/leave/apply', leaveData)
    alert('Leave request submitted to backend');
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Employee Dashboard</h2>
        <button className="btn btn-danger" onClick={() => navigate('/')}>Logout</button>
      </div>

      <div className="row g-4">
        {/* Attendance */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h4>Attendance</h4>
            <p>Status: <strong>{checkedIn ? 'Checked In' : 'Checked Out'}</strong></p>
            <button className={`btn ${checkedIn ? 'btn-warning' : 'btn-success'}`} onClick={handleCheckInToggle}>
              {checkedIn ? 'Check Out' : 'Check In'}
            </button>
          </div>
        </div>

        {/* Profile */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h4>My Profile</h4>
            <div className="mb-2">
              <label>Phone:</label>
              <input type="text" className="form-control" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} placeholder="Enter phone number" />
            </div>
            <div className="mb-2">
              <label>Address:</label>
              <input type="text" className="form-control" value={profile.address} onChange={(e) => setProfile({...profile, address: e.target.value})} placeholder="Enter address" />
            </div>
          </div>
        </div>

        {/* Leave Request */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h4>Apply for Leave</h4>
            <form onSubmit={handleLeaveSubmit}>
              <select className="form-select mb-2" value={leaveData.leave_type} onChange={(e) => setLeaveData({...leaveData, leave_type: e.target.value})}>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Sick Leave">Sick Leave</option>
              </select>
              <input type="date" className="form-control mb-2" required onChange={(e) => setLeaveData({...leaveData, start_date: e.target.value})} />
              <button type="submit" className="btn btn-primary w-100">Submit Request</button>
            </form>
          </div>
        </div>

        {/* Payroll */}
        <div className="col-md-6">
          <div className="card p-3 shadow-sm">
            <h4>Payroll Info</h4>
            <p>Basic Salary: ₹{payroll.basic_salary}</p>
            <p>Deductions: ₹{payroll.deductions}</p>
            <h5>Net Salary: ₹{payroll.net_salary}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}