# Volunteer Management System

This is a Volunteer Management System designed for event organizers and volunteers to manage shifts, provide feedback, and streamline communication.

## Features

- **Admin Dashboard**: For organizers to manage volunteers, assign shifts, and view feedback.
- **Volunteer Dashboard**: For volunteers to view assigned shifts, available shifts, completed shifts, and provide feedback.
- **Authorization System**: Role-based access for organizers and volunteers.
- **Shift Management**: Organizers can assign shifts, and volunteers can view and apply for available shifts.
- **Feedback System**: Volunteers can rate completed shifts and submit comments for improvement.

## Sample Credentials

Use the following credentials to log in and test the system:

### Organizer Account
- **Username**: organizer
- **Password**: pwd

### Volunteer Account
- **Username**: volunteer
- **Password**: pwd

## Dashboards

- **Organizer Dashboard**: Allows access to the following sections via the sidebar:
  - Volunteers
  - Assigned Shifts
  - Available Shifts
  - Feedback
  - Statistics

- **Volunteer Dashboard**: Displays:
  - Assigned Shifts
  - Available Shifts
  - Completed Shifts
  - Option to submit feedback and rate shifts

## Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/volunteer-management-system.git

2. Navigate to the project directory:

   ```bash
    cd volunteer-management-system

3. Run the backend application first:

   ```bash
    cd backend
    node index.js
   
4. Run the frontend application:

   ```bash
   cd ..
   npm start

Open the application in your browser at http://localhost:3000/ and log in with the provided sample credentials.

## Future Enhancements
- Integration of real-time notifications for volunteers about shift updates.
- Advanced reporting for organizers to track volunteer engagement and performance.
- Multi-language support for international events.

## Contributing
Feel free to contribute by opening issues or submitting pull requests. We welcome all contributions to improve the system and add new features.
   
