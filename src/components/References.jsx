// src/components/References.jsx
import { faChevronDown, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import * as styles from '../styles/References.styles.js';

const References = ({ items = [], startOpen = false }) => {
  const [isOpen, setIsOpen] = useState(startOpen);
  const [visibleCount, setVisibleCount] = useState(5);

  const handleSeeMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  const toggleOpen = () => setIsOpen(!isOpen);

  // Define quais itens são visíveis com base nos estados
  const itemsToShow = isOpen ? items.slice(0, visibleCount) : items.slice(0, 1);

  return (
    <div>
      <div style={styles.containerStyles}>
        <div style={styles.headerStyles(isOpen)} onClick={toggleOpen}>
          <span>Referências utilizadas:</span>
          <FontAwesomeIcon icon={faChevronDown} style={styles.arrowStyles(isOpen)} />
        </div>

        {/* A lista só é renderizada se estiver aberta */}
        {isOpen && (
          <div style={styles.listStyles}>
            {itemsToShow.map((item, index) => (
              <div key={index} style={styles.itemStyles}>
                <FontAwesomeIcon icon={faFile} />
                <span>{item.name}</span>
                <span style={styles.pageTagStyles}>p.{item.page}</span>
              </div>
            ))}
          </div>
        )}

        {isOpen && items.length > visibleCount && (
          <div style={styles.footerStyles}>
            <button onClick={handleSeeMore} style={styles.seeMoreButtonStyles}>
              Ver mais
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default References;
