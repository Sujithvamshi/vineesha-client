import React from 'react';
import { Link } from 'react-router-dom';
import Calendar from 'react-calendar';

const Dashboard = () => {
  // Dummy data for the calendar (you'll replace this with actual leave data from the backend)
  const leaveData = [
    { date: new Date(2023, 6, 15), status: 'Approved' },
    { date: new Date(2023, 6, 18), status: 'Pending' },
    { date: new Date(2023, 6, 22), status: 'Approved' },
    // Add more leave data based on your application's records
  ];

  return (
    <div className="flex">
      {/* Main Content */}
      <div className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-4">Dashboard</h2>

        {/* Calendar */}
        <div className="shadow rounded-lg mb-6 p-4 bg-white">
          <h3 className="text-lg font-semibold mb-4">Leave Status Calendar</h3>
          <Calendar
            className="rounded-lg border-2 border-gray-200 p-2 text-black text-center"
            tileClassName={({ date }) => {
              const leaveItem = leaveData.find((item) => item.date.toDateString() === date.toDateString());
              return leaveItem ? `bg-${leaveItem.status.toLowerCase()} text-white` : null;
            }}
            calendarType="US"
            showNeighboringMonth={false}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
