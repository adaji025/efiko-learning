import { Fragment, useState } from "react";
import { Button, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { useSelector } from "react-redux";
import { ProfileTypes } from "../../../types/auth";
import { RootState } from "../../../redux/store";

const Payments = () => {
  const [cards, setCards] = useState(false);
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  return (
    <div className="mt-[50px] lg:mt-5">
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Payments
      </div>

      {!cards && (
        <div className="mt-10 h-[60vh] flex flex-col items-center justify-center">
          <div>Add payment method and automate your payments.</div>
          <Button
            type="submit"
            size="md"
            mt={30}
            className="bg-primary"
            onClick={() => setCards(true)}
          >
            {userData?.accountType === "student"
              ? "Add Payment Method"
              : "Withdraw Money"}
          </Button>
        </div>
      )}

      {cards && (
        <Fragment>
          <div className="mt-10 max-w-[600px] mx-auto border rounded-xl p-5">
            <div className="font-medium text-lg text-primary">
              Enter Your Card Details
            </div>
            <TextInput
              required
              size="md"
              mt={16}
              label="Card Holder Name"
              placeholder="Enter card name"
            />

            <TextInput
              required
              size="md"
              mt={16}
              label="Card Number"
              placeholder="Enter card number"
            />
            <DatePickerInput
              required
              size="md"
              mt={16}
              label="Pick date"
              placeholder="Pick date"
            />
            <TextInput
              required
              size="md"
              mt={16}
              label="CSV"
              placeholder="Enter CSV number"
            />
          </div>
          <div className="flex justify-center">
            <Button type="submit" size="md" mt={30} className="bg-primary">
              Save Card Details
            </Button>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default Payments;
