import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './statistics.css';

const Statistics = () => {
  useEffect(() => {
    let volunteersChart, hoursChart, participationChart, topVolunteersChart;

    const initVolunteersByCategoryChart = () => {
      const ctx1 = document.getElementById('volunteersByCategory').getContext('2d');
      if (volunteersChart) {
        volunteersChart.destroy();  // Ensure previous instance is destroyed
      }
      volunteersChart = new Chart(ctx1, {
        type: 'pie',
        data: {
          labels: ['Ticketing', 'Accreditation', 'Bar/Service', 'Shop', 'Technical Support', 'Airport Welcome', 'Runner'],
          datasets: [{
            label: 'Volunteers',
            data: [20, 30, 15, 10, 5, 12, 8],
            backgroundColor: ['#ff6347', '#4682b4', '#32cd32', '#ffa500', '#2e8b57', '#da70d6', '#8b0000'],
          }]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: '#ffffff'  // Set legend text color to white
              }
            }
          }
        }
      });
    };

    const initHoursByCategoryChart = () => {
      const ctx2 = document.getElementById('hoursByCategory').getContext('2d');
      if (hoursChart) {
        hoursChart.destroy();  // Ensure previous instance is destroyed
      }
      hoursChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
          labels: ['Ticketing', 'Accreditation', 'Bar/Service', 'Shop', 'Technical Support', 'Airport Welcome', 'Runner'],
          datasets: [{
            label: 'Hours',
            data: [50, 80, 30, 40, 10, 20, 60],
            backgroundColor: ['#ff6347', '#4682b4', '#32cd32', '#ffa500', '#2e8b57', '#da70d6', '#8b0000'],
          }]
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: '#ffffff'  // Set legend text color to white
              }
            }
          }
        }
      });
    };

    const initParticipationByCategoryChart = () => {
      const ctx3 = document.getElementById('participationByCategory').getContext('2d');
      if (participationChart) {
        participationChart.destroy();  // Ensure previous instance is destroyed
      }
      participationChart = new Chart(ctx3, {
        type: 'bar',
        data: {
          labels: ['Ticketing', 'Accreditation', 'Bar/Service', 'Shop', 'Technical Support', 'Airport Welcome', 'Runner'],
          datasets: [{
            label: 'Volunteer Participation %',
            data: [45, 30, 35, 25, 20, 15, 10],
            backgroundColor: ['#ff6347', '#4682b4', '#32cd32', '#ffa500', '#2e8b57', '#da70d6', '#8b0000'],
          }]
        },
        options: {
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                color: '#ffffff'
              }
            },
            y: {
              ticks: {
                color: '#ffffff'
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: '#ffffff'  // Set legend text color to white
              }
            }
          }
        }
      });
    };

    // Data for top 15 volunteers (example data)
    const initTopVolunteersChart = () => {
      const ctx4 = document.getElementById('topVolunteersChart').getContext('2d');
      if (topVolunteersChart) {
        topVolunteersChart.destroy();  // Ensure previous instance is destroyed
      }
      topVolunteersChart = new Chart(ctx4, {
        type: 'bar',
        data: {
          labels: ['Volunteer 1', 'Volunteer 2', 'Volunteer 3', 'Volunteer 4', 'Volunteer 5', 'Volunteer 6', 'Volunteer 7', 'Volunteer 8', 'Volunteer 9', 'Volunteer 10'],
          datasets: [{
            label: 'Hours Worked',
            data: [40, 38, 37, 35, 34, 33, 31, 30, 29, 28],
            backgroundColor: '#c4b47c',  // Gold color for consistency
            borderColor: '#b1a46f',
            borderWidth: 1,
          }]
        },
        options: {
          scales: {
            x: {
              ticks: {
                color: '#ffffff'  // Set x-axis labels to white
              }
            },
            y: {
              ticks: {
                color: '#ffffff'  // Set y-axis labels to white
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: '#ffffff'  // Set legend text color to white
              }
            }
          }
        }
      });
    };

    // Initialize the charts
    initVolunteersByCategoryChart();
    initHoursByCategoryChart();
    initParticipationByCategoryChart();
    initTopVolunteersChart();

    // Clean up on component unmount
    return () => {
      if (volunteersChart) volunteersChart.destroy();
      if (hoursChart) hoursChart.destroy();
      if (participationChart) participationChart.destroy();
      if (topVolunteersChart) topVolunteersChart.destroy();
    };
  }, []);

  return (
    <div className="statistics-container">
      {/* First Row with Statistics Boxes */}
      <div className="statistics-boxes">
        <div className="stat-box">Volunteers: 120</div>
        <div className="stat-box">Shifts Completed: 350</div>
        <div className="stat-box">Shifts Left: 40</div>
        <div className="stat-box">Average Volunteering Hours: 30 hrs</div>
        <div className="stat-box">Average Shift Rating: 4.5 ★</div>
      </div>

      {/* Second Row with Charts */}
      <div className="statistics-charts">
        <div className="chart-box">
          <h3>Volunteers by Category</h3>
          <canvas id="volunteersByCategory"></canvas>
        </div>
        <div className="chart-box">
          <h3>Hours by Category</h3>
          <canvas id="hoursByCategory"></canvas>
        </div>
        <div className="chart-box">
          <h3>Volunteer Participation % by Category</h3>
          <canvas id="participationByCategory"></canvas>
        </div>
      </div>

      {/* Third Row with Chart */}
      <div className="third-row">
        <div className="chart-card">
          <h3>Hours Worked by Top 15 Volunteers</h3>
          <canvas id="topVolunteersChart"></canvas>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
