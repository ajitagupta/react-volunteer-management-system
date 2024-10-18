import React, { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = () => {
  const [shifts, setShifts] = useState([]);
  const [appliedShifts, setAppliedShifts] = useState([]);
  
  // Assigned shifts with added shifts for testing
  const [assignedShifts, setAssignedShifts] = useState([
    { id: 1, date: '2024-10-15', time: '09:00-12:00', location: 'Frauenbadi', task: 'Service' },
    { id: 2, date: '2024-10-16', time: '13:00-17:00', location: 'Frauenbadi', task: 'Bar Logistics' },
    { id: 3, date: '2024-10-17', time: '10:00-14:00', location: 'Shop', task: 'Tambola-Tickets' },
    { id: 4, date: '2024-10-18', time: '14:00-18:00', location: 'Kongresshaus', task: 'Cloakroam' }
  ]);

  // Mocked completed shifts for testing
  const [completedShifts, setCompletedShifts] = useState([
    { id: 1, date: '2024-10-10', time: '09:00-12:00', location: 'Kongresshaus', task: 'Cinemasupport', rating: 0, comment: '' },
    { id: 2, date: '2024-10-12', time: '14:00-17:00', location: 'Arena 4 Sihlcity', task: 'Ushering Guests', rating: 0, comment: '' }
  ]);


// Predefined categories for volunteers
const predefinedCategories = [
  { name: 'Ticketing', color: '#ff6347' },
  { name: 'Accreditation', color: '#4682b4' },
  { name: 'Theatre Support & Audience Award', color: '#ffb6c1' },
  { name: 'Bar/Service', color: '#32cd32' },
  { name: 'Shop', color: '#ffa500' },
  { name: 'Information Stand', color: '#9370db' },
  { name: 'Office Support', color: '#1e90ff' },
  { name: 'Assembling/Dissembling', color: '#ff4500' },
  { name: 'Technical Support', color: '#2e8b57' },
  { name: 'Airport Welcome', color: '#da70d6' },
  { name: 'Runner', color: '#8b0000' }
];

const [selectedCategories, setSelectedCategories] = useState([]);

// Add category
const handleAddCategory = (category) => {
  if (!selectedCategories.includes(category)) {
    setSelectedCategories([...selectedCategories, category]);
  }
};

// Remove category
const handleRemoveCategory = (category) => {
  setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
};



  const [profilePicture, setProfilePicture] = useState(null);  // For profile picture upload

  useEffect(() => {
    const fetchShifts = async () => {
      try {
        const token = localStorage.getItem('token');  // Retrieve token from localStorage

        if (!token) {
          throw new Error('No token found, please log in');
        }

        // Fetch available shifts
        //const response = await fetch('http://localhost:5000/api/shifts', {
        const response = await fetch('https://react-volunteer-management-system-backend.vercel.app/api/shifts', {
          headers: {
            Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch shifts');
        }

        const data = await response.json();
        setShifts(data);  // Set the fetched data to shifts state
      } catch (error) {
        console.error('Error fetching shifts:', error);  // Log errors
      }
    };

    fetchShifts();  // Fetch shifts on component mount
  }, []);

  const applyForShift = async (shiftId) => {
    try {
      const token = localStorage.getItem('token');  // Retrieve token from localStorage

      if (!token) {
        throw new Error('No token found, please log in');
      }

      //const response = await fetch(`http://localhost:5000/api/shifts/apply`, {
      const response = await fetch(`https://react-volunteer-management-system-backend.vercel.app/api/shifts/apply`, {
          method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,  // Include the token in the Authorization header
        },
        body: JSON.stringify({ shiftId })  // Send shiftId in the request body
      });

      const data = await response.json();
      if (response.ok) {
        setAppliedShifts([...appliedShifts, shiftId]);
        alert('Shift application successful!');
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error applying for shift:', error);
      alert('Failed to apply for shift.');
    }
  };

  const cancelShift = (shiftId) => {
    setAssignedShifts(assignedShifts.filter(shift => shift.id !== shiftId));  // Remove shift from assigned list
    alert('Shift canceled successfully');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear token on logout
    window.location.href = '/login';  // Redirect to login page
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePicture(e.target.result);  // Set the uploaded image as base64 URL
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStarClick = (shiftId, newRating) => {
    setCompletedShifts(prevShifts =>
      prevShifts.map(shift =>
        shift.id === shiftId ? { ...shift, rating: newRating } : shift
      )
    );
  };

  const handleCommentChange = (shiftId, newComment) => {
    setCompletedShifts(prevShifts =>
      prevShifts.map(shift =>
        shift.id === shiftId ? { ...shift, comment: newComment } : shift
      )
    );
  };

  const handleSubmitFeedback = (shiftId) => {
    const shift = completedShifts.find(shift => shift.id === shiftId);
    if (shift) {
      console.log('Submitted Feedback for Shift:', shiftId);
      console.log('Rating:', shift.rating);
      console.log('Comment:', shift.comment);
      // API call logic to submit feedback for the completed shift
    }
  };

  return (
    <div className="dashboard-page">
      <h1 className="dashboard-title">Volunteer Dashboard</h1>
      <div className="dashboard-container">

        {/* Profile Section */}
        <div className="profile-section">
          <div className="profile-header">
            <h2>My Profile</h2>
            <button className="logout-btn" onClick={handleLogout}>Logout</button> {/* Logout Button */}
          </div>

          {/* Profile Picture Upload */}
          <div className="profile-picture-section">
            <h3>Profile Picture</h3>
            <input type="file" accept="image/*" onChange={handleProfilePictureUpload} />
            {profilePicture && (
              <div className="profile-picture-preview">
                <img src={profilePicture} alt="Profile" />
              </div>
            )}
          </div>
            

          <p><strong>Name:</strong> Ajita Gupta</p>
          <p><strong>Total Hours Volunteered:</strong> 12 hours</p>
          <p><strong>Upcoming Shifts:</strong></p>
          <ul>
            <li>
              <strong>Date:</strong> 2024-10-21<br />
              <strong>Location:</strong> Frauenbadi<br />
              <strong>Location Manager:</strong> John Doe<br />
              <strong>Contact Number:</strong> +41 79 123 45 67
            </li>
          </ul>


          {/* Categories Section */}
          <div className="categories-section">
            <h3>Categories</h3>
            <ul className="categories-list">
              {selectedCategories.map((category, index) => (
                <li key={index} className="category-item" style={{ backgroundColor: category.color }}>
                  {category.name}
                  <button className="delete-category-btn" onClick={() => handleRemoveCategory(category)}>Delete</button>
                </li>
              ))}
            </ul>


             {/* Add New Category */}
             <div className="add-category">
              <select onChange={(e) => handleAddCategory(predefinedCategories.find(cat => cat.name === e.target.value))}>
                <option value="">Select a category</option>
                {predefinedCategories.map((category, index) => (
                  <option key={index} value={category.name}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

        </div>

        {/* Assigned Shifts Section */}
        <div className="assigned-shifts">
          <h2>Assigned Shifts</h2>
          <ul>
            {Array.isArray(assignedShifts) && assignedShifts.length > 0 ? (
              assignedShifts.map((shift) => (
                <li key={shift.id} className="shift-item-volunteer">
                  <div className="shift-details">
                    <strong>Date:</strong> {shift.date}, <strong>Time:</strong> {shift.time}, <strong>Location:</strong> {shift.location}, <strong>Task:</strong> {shift.task}
                  </div>
                  <button
                    onClick={() => cancelShift(shift.id)}
                    className="cancel-btn"
                  >
                    Cancel
                  </button>
                </li>
              ))
            ) : (
              <p>No assigned shifts available</p>
            )}
          </ul>
        </div>

        {/* Available Shifts Section */}
        <div className="shift-list">
          <h2>Available Shifts</h2>
          <ul>
            {Array.isArray(shifts) && shifts.length > 0 ? (
              shifts.map((shift) => (
                <li key={shift.id} className="shift-item-volunteer">
                  <div className="shift-details">
                    <strong>Date:</strong> {shift.date}, <strong>Time:</strong> {shift.time}, <strong>Location:</strong> {shift.location}, <strong>Task:</strong> {shift.task}
                  </div>
                  <button
                    disabled={appliedShifts.includes(shift.id)}
                    onClick={() => applyForShift(shift.id)}
                    className="apply-btn"
                  >
                    {appliedShifts.includes(shift.id) ? 'Applied' : 'Apply'}
                  </button>
                </li>
              ))
            ) : (
              <p>No shifts available</p>
            )}
          </ul>
        </div>

        {/* Completed Shifts Section */}
        <div className="completed-shifts">
          <h2>Completed Shifts</h2>
          <ul>
            {completedShifts.length > 0 ? (
              completedShifts.map((shift) => (
                <li key={shift.id} className="completed-shift-item">
                  <div className="shift-details">
                    <strong>Date:</strong> {shift.date}, <strong>Time:</strong> {shift.time}, <strong>Location:</strong> {shift.location}, <strong>Task:</strong> {shift.task}
                  </div>

                  {/* Star Rating Section */}
                  <div className="rating-section">
                    <label>Rate this shift: </label>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`star ${shift.rating >= star ? 'selected' : ''}`}
                        onClick={() => handleStarClick(shift.id, star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>

                  {/* Comment Section */}
                  <div className="comment-section">
                    <label>Leave a comment:</label>
                    <br></br>
                    <textarea
                      value={shift.comment}
                      onChange={(e) => handleCommentChange(shift.id, e.target.value)}
                      rows="3"
                      placeholder="Your feedback here..."
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={() => handleSubmitFeedback(shift.id)}
                    className="submit-feedback-btn"
                  >
                    Submit Feedback
                  </button>
                </li>
              ))
            ) : (
              <p>No completed shifts available for feedback.</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
