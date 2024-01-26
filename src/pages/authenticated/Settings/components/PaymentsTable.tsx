import { Pagination, Table } from "@mantine/core";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { PaymentState } from "../../../../types/payment";

type IProps = {
  payments: PaymentState | null;
  skip: number;
  limit: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
};

const PaymentsTable = ({ limit, payments, setSkip, skip }: IProps) => {
  const [totalPages, setTotalPages] = useState(1);

  console.log(payments);

  useEffect(() => {
    if (payments) setTotalPages(Math.ceil(payments?.length / limit));
  }, [payments, limit]);

  function isToday(date: any) {
    var givenDate = new Date(date);

    // Get the current date
    var currentDate = new Date();

    // Check if the given date is equal to today's date
    if (givenDate < currentDate) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <Fragment>
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Type</Table.Th>
              <Table.Th>Amount</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Expiry Date</Table.Th>
              <Table.Th>Expiry time</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {payments &&
              payments.data.map((payment) => (
                <Table.Tr
                  key={payment._id}
                  className={`${
                    isToday(moment(payment.expiresAt).format("YYYY-MM-DD")) &&
                    isToday(moment(payment.expiresAt).format("HH: MM")) &&
                    "text-red-500"
                  }`}
                >
                  <Table.Td>{payment.subscriptionId.type}</Table.Td>
                  <Table.Td>${payment.amount}</Table.Td>
                  <Table.Td>
                    {moment(payment.createdAt).format("YYYY-MM-DD")}
                  </Table.Td>
                  <Table.Td>
                    {moment(payment.expiresAt).format("YYYY-MM-DD")}
                  </Table.Td>
                  <Table.Td>
                    {moment(payment.expiresAt).format("HH : MM")}
                  </Table.Td>
                  <Table.Td>
                    {isToday(moment(payment.expiresAt).format("YYYY-MM-DD"))
                      ? "Expired"
                      : "Active"}
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>

        {payments && (payments.data.length === 0 || !payments) && (
          <div className="w-full h-[50vh] flex flex-col justify-center items-center">
            <div>No record available.</div>
          </div>
        )}
      </div>
      <div className="mt-10">
        <Pagination
          total={totalPages}
          siblings={1}
          value={skip}
          onChange={setSkip}
          className="text-primary"
        />
      </div>
    </Fragment>
  );
};

export default PaymentsTable;
