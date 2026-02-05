import React from 'react';

interface Props {
  title: string;
  description: string;
}

const PositionCard: React.FC<Props> = ({ title, description }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default PositionCard;