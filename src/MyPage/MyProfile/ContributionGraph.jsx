import React from 'react';
import './ContributionGraph.css';

function ContributionGraph({ historyList }) {
    // Prepare data for the contribution graph
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentDayOfYear = Math.floor((currentDate - new Date(currentYear, 0, 0)) / 86400000);
    const contributions = Array(Math.ceil(historyList.length / 14)).fill().map(() => Array(14).fill(0));

    historyList.forEach((item, index) => {
        const week = Math.floor(index / 14);
        const day = index % 14;
        contributions[week][day] = item.size;
    });

    return (
        <div className="contribution-graph">
            {contributions.map((week, weekIndex) => (
                <div key={weekIndex} className="week">
                    {week.map((day, dayIndex) => {
                        const dataIndex = weekIndex * 14 + dayIndex;
                        if (dataIndex >= historyList.length) return null;

                        const item = historyList[dataIndex];
                        const date = new Date(item.date);
                        const dateString = date.toISOString().split('T')[0];
                        const isToday = date.getFullYear() === currentYear && Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000) === currentDayOfYear;
                        const dayClass = isToday ? `day-${Math.max(1, day)}` : `day-${day}`;
                        return (
                            <div 
                                key={dayIndex} 
                                className={`day ${dayClass}`} 
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
