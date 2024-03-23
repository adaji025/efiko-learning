import { Pagination, Select, Table } from "@mantine/core";
import moment from "moment";
import React, { Fragment, useEffect, useState } from "react";
import { PaymentState } from "../../../../../types/payment";
import { isToday } from "../../../../../utils";
// import { PaymentState } from "../../../../types/payment";
// import { isToday } from "../../../../utils";

type IProps = {
  payments: PaymentState | null;
  skip: number;
  limit: number;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
};

const PaymentsTable = ({ limit, payments, setSkip, skip, setLimit }: IProps) => {
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (payments) setTotalPages(Math.ceil(payments?.total / limit));
  }, [payments, limit]);

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
                    {isToday(moment(payment.expiresAt).format("YYYY-MM-DD")) &&
                    isToday(moment(payment.expiresAt).format("HH : MM"))
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
      <div className="mt-10 flex justify-between">
        <Pagination
          total={totalPages}
          siblings={1}
          value={skip}
          onChange={setSkip}
          className="text-primary"
        />
        <div className="flex items-center gap-2">
          <div>Per page</div>
          <Select
            className="w-[100px]"
            data={[
              { label: "5", value: "5" },
              { label: "15", value: "15" },
              { label: "25", value: "25" },
              { label: "50", value: "50" },
              { label: "75", value: "75" },
              { label: "100", value: "100" },
            ]}
            value={limit.toString()}
            // @ts-ignore
            onChange={setLimit}
          />
        </div>
      </div>
    </Fragment>
  );
};

export default PaymentsTable;
