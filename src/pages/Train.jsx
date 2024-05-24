import React, { useState } from 'react';

const AccordionItem = ({ title, children, isOpen, onClick }) => (
  <div>
    <div onClick={onClick} style={{ cursor: 'pointer', fontWeight: 'bold' }}>
      {title}
    </div>
    {isOpen && <div style={{ marginLeft: '20px' }}>{children}</div>}
  </div>
);

const MultiLevelAccordion = () => {
  const [openAccordions, setOpenAccordions] = useState({
    level1: null,
    level2: null,
    level3: null,
  });

  const toggleAccordion = (level, index) => {
    setOpenAccordions((prevState) => ({
      ...prevState,
      [level]: prevState[level] === index ? null : index,
    }));
  };

  return (
    <div>
      <AccordionItem
        title="Level 1 - Item 1"
        isOpen={openAccordions.level1 === 1}
        onClick={() => toggleAccordion('level1', 1)}
      >
        <AccordionItem
          title="Level 2 - Item 1.1"
          isOpen={openAccordions.level2 === 1}
          onClick={() => toggleAccordion('level2', 1)}
        >
          <AccordionItem
            title="Level 3 - Item 1.1.1"
            isOpen={openAccordions.level3 === 1}
            onClick={() => toggleAccordion('level3', 1)}
          >
            Content 1.1.1
          </AccordionItem>
          <AccordionItem
            title="Level 3 - Item 1.1.2"
            isOpen={openAccordions.level3 === 2}
            onClick={() => toggleAccordion('level3', 2)}
          >
            Content 1.1.2
          </AccordionItem>
        </AccordionItem>
        <AccordionItem
          title="Level 2 - Item 1.2"
          isOpen={openAccordions.level2 === 2}
          onClick={() => toggleAccordion('level2', 2)}
        >
          Content 1.2
        </AccordionItem>
      </AccordionItem>
      <AccordionItem
        title="Level 1 - Item 2"
        isOpen={openAccordions.level1 === 2}
        onClick={() => toggleAccordion('level1', 2)}
      >
        Content 2
      </AccordionItem>
    </div>
  );
};

export default MultiLevelAccordion;
