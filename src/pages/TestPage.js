// membuat banyak extendable card
import React, { useState } from 'react';

const ExpandableCard = () => {

  const [expandedIndex, setExpandedIndex] = useState(null);

  const data = [
    {
        title: "lubuk alung",
        content: "sikabu"
    },
    {
        title: "batang anai",
        content: "ext batang anai"
    },
    {
        title: "batang anai 2",
        content: "buayan"
    }
];
    

  const handleCardClick = (index) => {
    console.log("index dipencet : ", index);
    console.log("expanded saat dipencet : ", expandedIndex);
    setExpandedIndex(index === expandedIndex ? null : index);
    console.log("expanded sesudah dipencet : ", index === expandedIndex ? null : index);
  };

  return (
    <div className="expandable-card-container mt-10">
      {data.map((item, index) => (
        <div key={index} className="expandable-card">
          <div className="card-header" onClick={() => handleCardClick(index)}>
            <h3>{item.title}</h3>
          </div>
          {expandedIndex === index && (
            <div className="card-body">
              <p>{item.content}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExpandableCard;