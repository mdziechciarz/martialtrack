'use client';

import ContentContainer from '@/components/ContentContainer/ContentContainer';
import MainLayout from '@/components/MainLayout/MainLayout';
import PageTitle from '@/components/PageTitle/PageTitle';
import {ChevronDown16Filled} from '@fluentui/react-icons';
import {
  Button,
  ButtonGroup,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Select,
  SelectItem,
} from '@nextui-org/react';
import {useState} from 'react';
import {generateMonthlyPayments} from '../actions/generateMonthlyPayments';
import {getAllPaymentsHistory, getPaymentsHistoryByGroup} from '../actions/getPaymentsHistory';
import {recordManualPaymentById, recordManualPaymentByMonth} from '../actions/recordManualPayment';

const TempPage = () => {
  const [paymentId, setPaymentId] = useState('');
  const [amount, setAmount] = useState(0);
  const [athleteId, setAthleteId] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [isRecordPaymentByMonthLoading, setIsRecordPaymentByMonthLoading] = useState(false);
  const [isRecordPaymentByIdLoading, setIsRecordPaymentByIdLoading] = useState(false);
  const [isGenerateMonthlyPaymentsLoading, setIsGenerateMonthlyPaymentsLoading] = useState(false);
  const [isGetAllPaymentsHistoryLoading, setIsGetAllPaymentsHistoryLoading] = useState(false);
  const [isGetPaymentsHistoryByGroupLoading, setIsGetPaymentsHistoryByGroupLoading] =
    useState(false);

  const handleGenPaymentsClick = async () => {
    setIsGenerateMonthlyPaymentsLoading(true);

    const response = await generateMonthlyPayments({toRemoveMonth: month.currentKey});

    setIsGenerateMonthlyPaymentsLoading(false);
    console.log(response);
  };

  const handleRecordPaymentById = async () => {
    setIsRecordPaymentByIdLoading(true);
    const response = await recordManualPaymentById({
      paymentId,
      paymentMethod: 'cash',
    });
    if (response.error) {
      window.alert(response.error);
    }
    if (response.success) {
      window.alert('Payment recorded successfully');
    }
    setIsRecordPaymentByIdLoading(false);
  };

  const handleRecordPaymentByMonth = async () => {
    setIsRecordPaymentByMonthLoading(true);

    const response = await recordManualPaymentByMonth({
      month: month.currentKey,
      year: year.currentKey,
      athleteId,
      paymentMethod: 'cash',
    });
    setIsRecordPaymentByMonthLoading(false);
    if (response.error) {
      window.alert(response.error);
    }
    if (response.success) {
      window.alert('Payment recorded successfully');
    }
  };

  const handleGetAllPaymentsHistory = async () => {
    try {
      setIsGetAllPaymentsHistoryLoading(true);

      const response = await getAllPaymentsHistory();

      console.log(response);
    } catch (err) {
      window.alert(err);
    } finally {
      setIsGetAllPaymentsHistoryLoading(false);
    }
  };

  const handleGetPaymentsHistoryByGroup = async () => {
    try {
      setIsGetPaymentsHistoryByGroupLoading(true);

      const response = await getPaymentsHistoryByGroup();

      console.log(response);
    } catch (err) {
      window.alert(err);
    } finally {
      setIsGetPaymentsHistoryByGroupLoading(false);
    }
  };

  return (
    <MainLayout>
      <ContentContainer>
        <PageTitle title="TEMP" />
        <div style={{display: 'flex', gap: 10}}>
          <Select
            label="month"
            placeholder="Select month"
            variant="faded"
            selectedKeys={month}
            onSelectionChange={setMonth}
          >
            <SelectItem key="1">January</SelectItem>
            <SelectItem key="2">February</SelectItem>
            <SelectItem key="3">March</SelectItem>
            <SelectItem key="4">April</SelectItem>
            <SelectItem key="5">May</SelectItem>
            <SelectItem key="6">June</SelectItem>
            <SelectItem key="7">July</SelectItem>
            <SelectItem key="8">August</SelectItem>
            <SelectItem key="9">September</SelectItem>
            <SelectItem key="10">October</SelectItem>
            <SelectItem key="11">November</SelectItem>
            <SelectItem key="12">December</SelectItem>
          </Select>
          <Button
            color="primary"
            onPress={handleGenPaymentsClick}
            isLoading={isGenerateMonthlyPaymentsLoading}
            size="lg"
            style={{minWidth: 160}}
          >
            Generate Monthly Payments
          </Button>
        </div>
        <Divider style={{marginTop: 25, marginBottom: 25}} />
        <div style={{display: 'flex', gap: 10}}>
          <Input
            label="paymentId"
            placeholder="Enter payment ID"
            value={paymentId}
            onValueChange={setPaymentId}
            style={{backgroundColor: 'white'}}
            variant="faded"
          />
          <Input
            label="amount"
            placeholder="Enter amount"
            value={amount}
            onValueChange={setAmount}
            variant="faded"
            type="number"
          />
          <Button
            color="primary"
            style={{minWidth: 'fit-content'}}
            size="lg"
            isLoading={isRecordPaymentByIdLoading}
            onPress={handleRecordPaymentById}
          >
            Record Payment by ID
          </Button>
        </div>
        <Divider style={{marginTop: 25, marginBottom: 25}} />
        <div style={{display: 'flex', gap: 10}}>
          <Input
            label="athleteId"
            placeholder="Enter athlete ID"
            variant="faded"
            value={athleteId}
            onValueChange={setAthleteId}
          />
          <Select
            label="month"
            placeholder="Select month"
            variant="faded"
            selectedKeys={month}
            onSelectionChange={setMonth}
          >
            <SelectItem key="1">January</SelectItem>
            <SelectItem key="2">February</SelectItem>
            <SelectItem key="3">March</SelectItem>
            <SelectItem key="4">April</SelectItem>
            <SelectItem key="5">May</SelectItem>
            <SelectItem key="6">June</SelectItem>
            <SelectItem key="7">July</SelectItem>
            <SelectItem key="8">August</SelectItem>
            <SelectItem key="9">September</SelectItem>
            <SelectItem key="10">October</SelectItem>
            <SelectItem key="11">November</SelectItem>
            <SelectItem key="12">December</SelectItem>
          </Select>
          <Select
            label="year"
            placeholder="Select year"
            variant="faded"
            selectedKeys={year}
            onSelectionChange={setYear}
            selectionMode="single"
          >
            <SelectItem key="2023">2023</SelectItem>
            <SelectItem key="2024">2024</SelectItem>
            <SelectItem key="2025">2025</SelectItem>
          </Select>
          <Button
            color="primary"
            style={{minWidth: 'fit-content'}}
            size="lg"
            isLoading={isRecordPaymentByMonthLoading}
            onPress={handleRecordPaymentByMonth}
          >
            Record Payment by Month
          </Button>
        </div>
        <Divider style={{marginTop: 25, marginBottom: 25}} />
        <div style={{display: 'flex', gap: 10}}>
          <Button
            color="primary"
            style={{minWidth: 'fit-content'}}
            size="lg"
            onPress={handleGetAllPaymentsHistory}
            isLoading={isGetAllPaymentsHistoryLoading}
          >
            Get All Payments History
          </Button>
        </div>
        <Divider style={{marginTop: 25, marginBottom: 25}} />
        <div style={{display: 'flex', gap: 10}}>
          <Button
            color="primary"
            style={{minWidth: 'fit-content'}}
            size="lg"
            onPress={handleGetPaymentsHistoryByGroup}
            isLoading={isGetPaymentsHistoryByGroupLoading}
          >
            Get Payments History by Group
          </Button>
        </div>
        <Divider style={{marginTop: 25, marginBottom: 25}} />
        <ButtonGroup>
          <Dropdown>
            <DropdownTrigger>
              <Button isIconOnly variant="ghost" size="lg" style={{hight: 100}}>
                🇵🇱 <ChevronDown16Filled />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Actions">
              <DropdownItem key="PL">🇵🇱 Polska</DropdownItem>
              <DropdownItem key="DE">🇩🇪 Niemcy </DropdownItem>
              <DropdownItem key="US">🇺🇸 USA</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <Input label="Numer telefonu" placeholder="Numer telefonu" size="sm" variant="bordered" />
        </ButtonGroup>
      </ContentContainer>
    </MainLayout>
  );
};

export default TempPage;
