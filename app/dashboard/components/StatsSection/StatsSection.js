'use client';

import {CaretDown16Filled, CaretUp16Filled} from '@fluentui/react-icons';
import styles from './StatsSection.module.css';

const StatsSection = () => {
  return (
    <div className={styles.container}>
      <StatsCard
        title="Zawodników obecnych w tym tygodniu"
        value="60/82"
        secondaryValue="73%"
        growth
      />
      <StatsCard
        title="Opłaconych składek członkowskich w tym miesiącu"
        value="79/82"
        secondaryValue="11060 / 11480 PLN"
      />
      <StatsCard
        title="Opłaconych składek członkowskich w tym miesiącu"
        value="79/82"
        secondaryValue="11060 / 11480 PLN"
        decline
      />
    </div>
  );
};

export default StatsSection;

const StatsCard = ({title, value, secondaryValue, growth, decline}) => {
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardTitleContainer}>
        <h5 className={styles.cardTitle}>{title}</h5>
      </div>
      <div className={styles.cardValuesContainer}>
        {/* If either growth or decline - render  */}
        {growth || decline ? (
          <div className={styles.cardValuesChangeIndicatorContainer}>
            {growth && <CaretUp16Filled style={{color: '#4ecb71'}} />}
            {decline && <CaretDown16Filled style={{color: '#ff4d4f'}} />}
          </div>
        ) : null}
        <div className={styles.cardValuesTextContainer}>
          <p className={styles.primaryValue}>{value}</p>
          {secondaryValue && <p className={styles.secondaryValue}>{secondaryValue}</p>}
        </div>
      </div>
    </div>
  );
};
