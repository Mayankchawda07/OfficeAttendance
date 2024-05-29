const cron = require('node-cron');
const express = require('express');
const Attendance = require('../modals/attendanceModal')
const { getAttendanceByEmpIdDashboard } = require('../controller/attendanceContrller')


// Function to reset attendance counts
const resetMonthlyAttendanceCounts = async () => {
    try {
        // Example: Resetting attendance records for the new month
        // Here, we might archive the data or perform some other reset logic
        // If you're storing monthly summaries, you'd reset those here
        await Attendance.deleteMany({}); // Adjust this as needed to fit your data management strategy

        console.log('Attendance counts reset for the new month.');
    } catch (error) {
        console.error('Error resetting attendance counts:', error.message);
    }
};

// Schedule the task to run at the start of each month
cron.schedule('0 0 1 * *', resetMonthlyAttendanceCounts, {
    timezone: 'Asia/Kolkata' // Replace with your timezone, e.g., 'America/New_York'
});


const app = express();

// Schedule the attendance reset task
cron.schedule('0 0 1 * *', resetMonthlyAttendanceCounts, {
    timezone: 'Asia/Kolkata' 
});

// Your other middlewares and route handlers
app.use('/api/attendance/:id', getAttendanceByEmpIdDashboard);


app.listen(3210, () => {
    console.log(`Server is running on port 3210`);
});
