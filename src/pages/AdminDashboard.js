import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './admin-dashboard.css';  // Ensure your custom styling is in this file
import Statistics from './Statistics'; // Import the new Statistics component

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Volunteers');  // Track active tab
  const [volunteers, setVolunteers] = useState([]);          // State to store volunteers
  const [searchQuery, setSearchQuery] = useState('');        // Search query state
  const [assignedShifts, setAssignedShifts] = useState([]);  // State to store assigned shifts
  const [selectedDate, setSelectedDate] = useState('');      // State for the selected date
  const [dates, setDates] = useState([]);                    // Available dates for the dropdown
  const [selectedLocation, setSelectedLocation] = useState(''); // State for the selected location
  const [locations, setLocations] = useState([]); // Available locations based on selected date


  useEffect(() => {
    const role = localStorage.getItem('role');
    
    // Redirect to login if not an organizer
    if (role !== 'organizer') {
      navigate('/login');
    }
    
    // Fetch volunteers and shifts (mock data for now)
    fetchVolunteers();
    fetchAssignedShifts();
  }, [navigate]);

  // Mock data for volunteers
  const fetchVolunteers = () => {
    const mockVolunteers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com',
        contact: '+41 79 123 4567',
        categories: ['Hostess', 'Shop'],
        hours: 20,
        profilePicture: 'https://via.placeholder.com/50',
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane@example.com',
        contact: '+41 79 987 6543',
        categories: ['Bar/Service', 'Accreditation'],
        hours: 35,
        profilePicture: 'https://via.placeholder.com/50',
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike@example.com',
        contact: '+41 79 555 4321',
        categories: ['Cloakroom', 'Technical Support'],
        hours: 15,
        profilePicture: 'https://via.placeholder.com/50',
      },
    ];
    setVolunteers(mockVolunteers);
  };


  // Mock data for assigned shifts
  const fetchAssignedShifts = () => {
    const mockAssignedShifts = [
      {
        id: 1,
        volunteerId: 1,
        date: '2024-10-21',
        time: '10:00-14:00',
        location: 'Frauenbadi',
        task: 'Ushering',
      },
      {
        id: 2,
        volunteerId: 2,
        date: '2024-10-22',
        time: '12:00-16:00',
        location: 'Kongresshaus',
        task: 'Ticketing',
      },
      {
        id: 3,
        volunteerId: 3,
        date: '2024-10-21',
        time: '12:00-10:00',
        location: 'Kongresshaus',
        task: 'Cloakroom',
      },
    ];
    const availableDates = [...new Set(mockAssignedShifts.map(shift => shift.date))];  // Extract unique dates
    setAssignedShifts(mockAssignedShifts);
    setDates(availableDates);  // Set the available dates for the dropdown
  };


  // Handle volunteer deletion
  const handleDelete = (volunteerId) => {
    const updatedVolunteers = volunteers.filter(v => v.id !== volunteerId);
    setVolunteers(updatedVolunteers);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter volunteers based on search query
  const filteredVolunteers = volunteers.filter(volunteer =>
    volunteer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  // Handle shift cancellation
  const handleCancelShift = (shiftId) => {
    const updatedShifts = assignedShifts.filter(shift => shift.id !== shiftId);
    setAssignedShifts(updatedShifts);
  };

  // Handle date change
  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setSelectedDate(selectedDate);
  
    // Get unique locations for the selected date
    const availableLocations = [
      ...new Set(assignedShifts.filter(shift => shift.date === selectedDate).map(shift => shift.location)),
    ];
    setLocations(availableLocations); // Populate locations dropdown
    setSelectedLocation(''); // Reset location selection when a new date is selected
  };

  // Handle location change
  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value); // Update the selected location
  };
  
  // Filter assigned shifts based on selected date and location
  const filteredShifts = assignedShifts.filter(shift => {
    return shift.date === selectedDate && (selectedLocation === '' || shift.location === selectedLocation);
  });
  
    
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  // Content to display based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'Volunteers':
        return renderVolunteers();
      case 'Assigned Shifts':
        return renderAssignedShifts();  // New tab for Assigned Shifts
      case 'Available Shifts':
        return <div><h1>Available Shifts</h1><p>Manage your available shifts here.</p></div>;
      case 'Feedback':
        return <div><h1>Feedback</h1><p>View and manage feedback from volunteers.</p></div>;
      case 'Statistics':
        return <Statistics />; // Render the Statistics component  
      default:
        return null;
    }
  };

  // Render volunteers list with search bar and delete button
  const renderVolunteers = () => (
    <div className="volunteers-section">
      <h1>Volunteers Management</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-bar"
      />

      {/* Volunteer List */}
      <div className="volunteer-list">
        {filteredVolunteers.map(volunteer => (
          <div key={volunteer.id} className="volunteer-item">
            <img src={volunteer.profilePicture} alt={volunteer.name} className="volunteer-img" />
            <div className="volunteer-details">
              <p><strong>Name:</strong> {volunteer.name}</p>
              <p><strong>Email:</strong> {volunteer.email}</p>
              <p><strong>Contact:</strong> {volunteer.contact}</p>
              <p><strong>Categories:</strong> {volunteer.categories.join(', ')}</p>
              <p><strong>Hours Volunteered:</strong> {volunteer.hours} hours</p> {/* New field for hours */}             
            </div>
            <button onClick={() => handleDelete(volunteer.id)} className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );

  // Render assigned shifts list with cancel button and date drop-down
  const renderAssignedShifts = () => (
    <div className="assigned-shifts-section">
      <h1>Assigned Shifts</h1>

      {/* Date Dropdown */}
      <label htmlFor="date-select"><strong>Select Date: </strong></label>
      <select id="date-select" value={selectedDate} onChange={handleDateChange} className="date-dropdown">
        <option value="">Select a date</option>
        {dates.map(date => (
          <option key={date} value={date}>{date}</option>
        ))}
      </select>

      {/* Location Dropdown */}
      {selectedDate && (
        <>
          <label htmlFor="location-select"><strong>Select Location: </strong></label>
          <select id="location-select" value={selectedLocation} onChange={handleLocationChange} className="location-dropdown">
            <option value="">All locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </>
      )}




      <div className="assigned-shifts-list">
        {filteredShifts.length > 0 ? (
          filteredShifts.map(shift => {
            const volunteer = volunteers.find(v => v.id === shift.volunteerId);
            return (
              <div key={shift.id} className="shift-item-admin">
                <p><strong>Volunteer:</strong> {volunteer ? volunteer.name : 'Unknown'}</p>
                <p><strong>Time:</strong> {shift.time}</p>
                <p><strong>Location:</strong> {shift.location}</p>
                <p><strong>Task:</strong> {shift.task}</p>
                <button onClick={() => handleCancelShift(shift.id)} className="cancel-btn">Cancel Shift</button>
              </div>
            );
          })
        ) : (
          <p>No shifts assigned for this date.</p>
        )}
      </div>
    </div>
  );


  return (
    <div className="admin-dashboard">
      {/* Sidebar Navigation */}
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li className={activeTab === 'Volunteers' ? 'active' : ''} onClick={() => setActiveTab('Volunteers')}>Volunteers Management</li>
          <li className={activeTab === 'Assigned Shifts' ? 'active' : ''} onClick={() => setActiveTab('Assigned Shifts')}>Assigned Shifts</li>
          <li className={activeTab === 'Available Shifts' ? 'active' : ''} onClick={() => setActiveTab('Available Shifts')}>Available Shifts</li>
          <li className={activeTab === 'Feedback' ? 'active' : ''} onClick={() => setActiveTab('Feedback')}>Feedback</li>
          <li className={activeTab === 'Statistics' ? 'active' : ''} onClick={() => setActiveTab('Statistics')}>Statistics</li>
        </ul>
        <button onClick={handleLogout} className="logout-btn">Logout</button>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        {renderContent()}  {/* Display content based on active tab */}
      </div>
    </div>
  );
};

export default AdminDashboard;
