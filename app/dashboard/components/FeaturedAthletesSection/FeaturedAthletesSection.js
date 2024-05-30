'use client';

import {Select, SelectItem} from '@nextui-org/react';
import {ResponsiveBar} from '@nivo/bar';
import styles from './FeaturedAthletesSection.module.css';

const mock_data = [
  {
    athlete: 'Jan Kowalski',
    attendances: 10,
  },
  {
    athlete: 'Adam Nowak',
    attendances: 8,
  },
  {
    athlete: 'Krzysztof Nowak',
    attendances: 7,
  },
  {
    athlete: 'Piotr Kowalski',
    attendances: 6,
  },
  {
    athlete: 'Krzysztof Zielony',
    attendances: 5,
  },
];

const FeaturedAthletesSection = () => {
  return (
    <div className={styles.container}>
      <h3 className={styles.sectionTitle}>Zawodnicy wyróżniający się</h3>
      <div className={styles.buttonsContainer}>
        <div className={styles.categorySelectionContainer}>
          <Select label="Kategoria" defaultSelectedKeys={['attendance']} size="sm">
            <SelectItem key="attendance">Obecności na treningach</SelectItem>
            <SelectItem key="medals">Ranking medalowy</SelectItem>
          </Select>
        </div>
        <div className={styles.filtersContainer}>
          <Select label="Miesiąc" defaultSelectedKeys={['may']} size="sm">
            <SelectItem key="january">Styczeń</SelectItem>
            <SelectItem key="february">Luty</SelectItem>
            <SelectItem key="march">Marzec</SelectItem>
            <SelectItem key="april">Kwiecień</SelectItem>
            <SelectItem key="may">Maj</SelectItem>
            <SelectItem key="june">Czerwiec</SelectItem>
            <SelectItem key="july">Lipiec</SelectItem>
            <SelectItem key="august">Sierpień</SelectItem>
            <SelectItem key="september">Wrzesień</SelectItem>
            <SelectItem key="october">Październik</SelectItem>
            <SelectItem key="november">Listopad</SelectItem>
            <SelectItem key="december">Grudzień</SelectItem>
          </Select>
          <Select label="Grupy" defaultSelectedKeys={['all']} selectionMode="multiple" size="sm">
            <SelectItem key="all">Wszystkie</SelectItem>
            <SelectItem key="group1">Grupa 1</SelectItem>
            <SelectItem key="group2">Grupa 2</SelectItem>
            <SelectItem key="group3">Grupa 3</SelectItem>
          </Select>
        </div>
      </div>
      <div className={styles.chartsContainer}>
        <ResponsiveBar
          data={mock_data.sort((a, b) => a.attendances - b.attendances)}
          keys={['attendances']}
          indexBy="athlete"
          margin={{top: 20, right: 50, bottom: 50, left: 100}}
          padding={0.3}
          // enableLabel
          valueScale={{type: 'linear'}}
          indexScale={{type: 'band', round: true}}
          colors={{scheme: 'purple_blue'}}
          layout="horizontal"
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Liczba obecności',
            legendPosition: 'middle',
            legendOffset: 32,
            truncateTickAt: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -20,
            // legend: '',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          role="application"
          ariaLabel="Nivo bar chart demo"
          barAriaLabel={e => e.id + ': ' + e.formattedValue + ' in country: ' + e.indexValue}
          colorBy="value"
        />
      </div>
    </div>
  );
};

export default FeaturedAthletesSection;
