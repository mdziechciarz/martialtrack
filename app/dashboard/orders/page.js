'use client';

import Button from '@/components/Button/Button';
import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {ReceiptAdd20Filled} from '@fluentui/react-icons';
import styles from './OrdersPage.module.css';
import OrdersTable from './components/OrdersTable/OrdersTable';

const OrdersPage = () => {
  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="Zamówienia" />
        <Button
          text="Dodaj zamówienie"
          icon={ReceiptAdd20Filled}
          className={styles.newOrderButton}
        />
        <div className={styles.tableContainer}>
          <h3 className={styles.tableTitle}>Zamówienia (13)</h3>
          <OrdersTable />
        </div>
      </ContentContainer>
    </MainLayout>
  );
};
// const OrdersPage = () => {
//   return (
//     <MainLayout>
//       <ContentContainer>
//         <PageTitle title="Zamówienia" />
//         <Button
//           text="Dodaj zamówienie"
//           icon={ReceiptAdd20Filled}
//           className={styles.newOrderButton}
//         />
//         <div className={styles.tableContainer}>
//           <h3 className={styles.tableTitle}>Zamówienia (13)</h3>
//           <Table aria-label="Example static collection table" shadow="none">
//             <TableHeader>
//               <TableColumn>ZAMAWIAJĄCY</TableColumn>
//               <TableColumn>CO?</TableColumn>
//               <TableColumn>DATA ZAMÓWIENIA</TableColumn>
//               <TableColumn>NALEŻNOŚĆ</TableColumn>
//               <TableColumn>STATUS</TableColumn>
//             </TableHeader>
//             <TableBody>
//               <TableRow key="1">
//                 <TableCell>Tony Reichert</TableCell>
//                 <TableCell>Ochraniacze XXL Niebieskie </TableCell>
//                 <TableCell>10-04-2024</TableCell>
//                 <TableCell>150 PLN</TableCell>
//                 <TableCell>Nieopłacone</TableCell>
//               </TableRow>
//               <TableRow key="2">
//                 <TableCell>Zoey Lang</TableCell>
//                 <TableCell>Kask czerwony</TableCell>
//                 <TableCell>10-03-2024</TableCell>
//                 <TableCell>126,99 PLN</TableCell>
//                 <TableCell>Opłacone</TableCell>
//               </TableRow>
//               <TableRow key="3">
//                 <TableCell>Jane Fisher</TableCell>
//                 <TableCell>Spodnie czerwone 180cm</TableCell>
//                 <TableCell>05-03-2024</TableCell>
//                 <TableCell>240 PLN</TableCell>
//                 <TableCell>Opłacone</TableCell>
//               </TableRow>
//               <TableRow key="4">
//                 <TableCell>William Howard</TableCell>
//                 <TableCell>Rękawice boskerskie niebieskie skóra 10oz</TableCell>
//                 <TableCell>15-02-2024</TableCell>
//                 <TableCell>99,99 PLN</TableCell>
//                 <TableCell>Zrealizowane</TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </div>
//       </ContentContainer>
//     </MainLayout>
//   );
// };

export default OrdersPage;
