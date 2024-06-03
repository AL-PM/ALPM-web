import React from 'react';
import './ContributionGraph.css';

function ContributionGraph({ historyList }) {
    // Convert the historyList to a format suitable for the graph
    const contributions = Array(7).fill().map(() => Array(53).fill(0)); // 7 days a week, up to 53 weeks

    historyList.forEach(item => {
        const date = new Date(item.date);
        const week = Math.floor(getDayOfYear(date) / 7); // Week number
        const day = date.getDay(); // Day of the week
        contributions[day][week] = item.size;
    });

    return (
        <div className="contribution-graph">
            {contributions.map((week, dayIndex) => (
                <div key={dayIndex} className="month">
                    {week.map((day, weekIndex) => (
                        <div key={weekIndex} className={`day day-${day}`}></div>
                    ))}
                </div>
            ))}
        </div>
    );
}

// Helper function to get the day of the year
function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

export default ContributionGraph;
