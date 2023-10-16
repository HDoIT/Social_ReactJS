import React from 'react'
import './TrendCard.css';
import { TrendData } from '../../Data/TrentData.js';

const TrendCard = () => {
  return (
    <div className="TrendCard">
        <h2>Trends for you</h2>

        {TrendData.map((trend)=>{
            return (
                <div className='Trend'>
                    <h4>#{trend.name}</h4>
                    <p>{trend.shares}m shares</p>
                </div>
            )
        })}

    </div>
  )
}

export default TrendCard
