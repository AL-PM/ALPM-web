import React from 'react';
import './ContributionGraph.css';

function ContributionGraph({ historyList }) {
    // Convert the historyList to a format suitable for the graph
    const contributions = Array(12).fill().map(() => Array(31).fill(0)); // 12 months, 31 days

    historyList.forEach(item => {
        const date = new Date(item.date);
        const month = date.getMonth();
        const day = date.getDate() - 1; // Days are 1-based
        contributions[month][day] = item.size;
    });

    return (
        <div className="contribution-graph">
            {contributions.map((month, monthIndex) => (
                <div key={monthIndex} className="month">
                    {month.map((day, dayIndex) => (
                        <div key={dayIndex} className={`day day-${day}`}></div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default ContributionGraph;
