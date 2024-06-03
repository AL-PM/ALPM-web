import React from 'react';
import './ContributionGraph.css';

function ContributionGraph({ historyList }) {
    // Filter out dates after the current date
    const currentDate = new Date();
    const filteredHistoryList = historyList.filter(item => new Date(item.date) <= currentDate);

    // Prepare data for the contribution graph
    const contributions = Array(7).fill().map(() => Array(Math.ceil(filteredHistoryList.length / 7)).fill(0));

    filteredHistoryList.forEach((item, index) => {
        const week = Math.floor(index / 7);
        const day = index % 7;
        contributions[day][week] = item.size;
    });

    return (
        <div className="contribution-graph">
            {contributions.map((week, dayIndex) => (
                <div key={dayIndex} className="week">
                    {week.map((day, weekIndex) => {
                        const date = new Date(currentDate.getFullYear(), 0, 1);
                        date.setDate(date.getDate() + (weekIndex * 7) + dayIndex);
                        const dateString = date.toISOString().split('T')[0];
                        return (
                            <div 
                                key={weekIndex} 
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
