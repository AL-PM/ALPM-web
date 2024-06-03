import React from 'react';
import './ContributionGraph.css';

function ContributionGraph({ historyList }) {
    // Filter out dates after the current date
    const currentDate = new Date();
    const filteredHistoryList = historyList.filter(item => new Date(item.date) <= currentDate);

    // Prepare data for the contribution graph
    const contributions = [];
    let currentWeek = [];
    filteredHistoryList.forEach((item, index) => {
        currentWeek.push(item.size);
        if ((index + 1) % 7 === 0 || index === filteredHistoryList.length - 1) {
            contributions.push(currentWeek);
            currentWeek = [];
        }
    });

    return (
        <div className="contribution-graph">
            {contributions.map((week, weekIndex) => (
                <div key={weekIndex} className="week">
                    {week.map((day, dayIndex) => {
                        const date = new Date(currentDate.getFullYear(), 0, 1);
                        date.setDate(date.getDate() + (weekIndex * 7) + dayIndex);
                        const dateString = date.toISOString().split('T')[0];
                        return (
                            <div 
                                key={dayIndex} 
                                className={`day day-${day}`} 
                                title={`${dateString} | 학습 포인트: ${day}`}
                            >
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default ContributionGraph;
