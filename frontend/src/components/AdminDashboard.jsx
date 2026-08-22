import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [pendingLeaves, setPendingLeaves] = useState([]);

  // Fetch live tables from backend database once connected
  useEffect(() => {
    // axios.get('/api/attendance/admin/all').then(res => setAttendanceRecords(res.data));
    // axios.get('/api/leave/admin/all').then(res => setPendingLeaves(res.data));
  }, []);

  const handleLeaveStatus = (id, status) => {
    // API Call: axios.put(`/api/leave/${id}/status`, { status })
    setPendingLeaves(pendingLeaves.filter(leave => leave.id !== id));
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Admin / HR Dashboard</h2>
        <button className="btn btn-danger" onClick={() => navigate('/')}>Logout</button>
      </div>

      <div className="card p-3 mb-4 shadow-sm">
        <h4>Attendance Records</h4>
        <table className="table mt-2">
          <thead>
            <tr><th>Employee ID</th><th>Name</th><th>Date</th><th>Status</th></tr>
          </thead>
          <tbody>
            {attendanceRecords.length > 0 ? (
              attendanceRecords.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.employee_id}</td>
                  <td>{item.full_name}</td>
                  <td>{item.date}</td>
                  <td><span className="badge bg-success">{item.status}</span></td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="4" className="text-center text-muted">No attendance records found in database</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="card p-3 shadow-sm">
        <h4>Leave Approvals</h4>
        <table className="table mt-2">
          <thead>
            <tr><th>Employee ID</th><th>Type</th><th>Action</th></tr>
          </thead>
          <tbody>
            {pendingLeaves.length > 0 ? (
              pendingLeaves.map((leave) => (
                <tr key={leave.id}>
                  <td>{leave.employee_id}</td>
                  <td>{leave.leave_type}</td>
                  <td>
                    <button className="btn btn-sm btn-success me-2" onClick={() => handleLeaveStatus(leave.id, 'Approved')}>Approve</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleLeaveStatus(leave.id, 'Rejected')}>Reject</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan="3" className="text-center text-muted">No pending leave requests</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}