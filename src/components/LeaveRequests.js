import React, { useState, useEffect } from 'react';
import api from '../constanst';

const LeaveRequest = () => {
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reason, setReason] = useState('');
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [employeeData, setEmployeeData] = useState(null);

  useEffect(() => {
    retrieveEmployeeData();
    fetchLeaveRequests();
  }, []);

  const retrieveEmployeeData = () => {
    const storedEmployeeData = JSON.parse(localStorage.getItem('employeeData')).data.employee;
    if (storedEmployeeData) {
      setEmployeeData(storedEmployeeData);
    }
  };
  const fetchLeaveRequests = async () => {
    try {
      const response = await api.get(`/leave/${employeeData._id}`);
      setLeaveRequests(response.data);
    } catch (error) {
      console.error('Error fetching leave requests:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!employeeData) {
      setMessage('Employee data not found. Please log in again.');
      return;
    }

    const newLeaveRequest = {
      employee_id: employeeData._id, // Include employee ID from localStorage
      leave_type: leaveType,
      start_date: startDate,
      end_date: endDate,
      reason,
    };

    {
      const response = await api.post('/leave', newLeaveRequest);
      setLeaveRequests([...leaveRequests, response.data]);
      setMessage('Leave request submitted successfully.');}
    // } catch (error) {
    //   console.error('Error submitting leave request:', error);
    //   setMessage('Error submitting leave request. Please try again.');
    // }

    // Clear the form fields after submission
    setLeaveType('');
    setStartDate('');
    setEndDate('');
    setReason('');
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Leave Requests</h2>
      {/* Leave Request Form */}
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-2">
          <label className="block font-semibold">Leave Type:</label>
          <input
            type="text"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <div className="mb-2">
          <label className="block font-semibold">Reason:</label>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="w-full rounded-md border border-gray-300 p-2"
          />
        </div>
        <button type="submit" className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700">
          Submit Leave Request
        </button>
      </form>

      {/* Display Leave Requests */}
      <div>
        <h3 className="text-lg font-semibold mb-2">Submitted Leave Requests</h3>
        {leaveRequests.length === 0 ? (
          <p>No leave requests submitted.</p>
        ) : (
          <ul className="list-disc pl-6">
            {leaveRequests.map((request, index) => (
              <li key={index}>
                <p>Leave Type: {request.leave_type}</p>
                <p>Start Date: {request.start_date}</p>
                <p>End Date: {request.end_date}</p>
                <p>Reason: {request.reason}</p>
                <p>Status: {request.status}</p>
                <hr className="my-2" />
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Display Message */}
      {message && <p className="text-red-500 mt-2">{message}</p>}
    </div>
  );
};

export default LeaveRequest;
