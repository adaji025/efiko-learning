import { Button, LoadingOverlay, Modal, Select } from "@mantine/core";
import { useSelector } from "react-redux";
import { ProfileTypes } from "../../../../types/auth";
import { RootState } from "../../../../redux/store";
import { SubscriptionTypes } from "../../../../types/admins/subscription";
import { Fragment, useEffect, useState } from "react";
import { initiateTransaction } from "../../../../services/transaction";
import { useForm } from "@mantine/form";

type IProps = {
  subscriptions: SubscriptionTypes[];
  opened: boolean;
  close: () => void;
};
const SubscriptionCard = ({ subscriptions, close, opened }: IProps) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [payload, setPayload] = useState<SubscriptionTypes | null>(null);

  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  useEffect(() => {
    subscriptions.filter((item: SubscriptionTypes) => {
      if (item._id === value) {
        setPayload(item);
      }
    });
  }, [value]);

  const form = useForm({
    initialValues: {
      userId: "",
      subscriptionId: "",
      amount: 100,
      currency: "",
    },
  });

  const submit = () => {
    setLoading(true);

    const data = {
      userId: userData._id,
      subscriptionId: payload?._id,
      priceId: payload?.priceId,
    };
    initiateTransaction(data)
      .then((res: any) => {
        window.location.replace(res.data.data.url);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <Modal centered opened={opened} onClose={close}>
        <form onSubmit={form.onSubmit(submit)}>
          <Select
            size="md"
            required
            placeholder="Select subscription Type"
            label="Subscription Type"
            data={subscriptions.map((subscription) => ({
              label: `${subscription.type} - ${
                subscription.currency === "USD" ? "$" : "₦"
              }${subscription.amount}`,
              value: subscription._id,
            }))}
            onChange={setValue}
          />

          <div className="mt-5 flex justify-end">
            <Button
              disabled={!payload}
              size="md"
              className="bg-primary"
              type="submit"
            >
              {payload
                ? `Pay ${payload.currency === "USD" ? "$" : "₦"}${
                    payload.amount
                  }`
                : "Make Payment"}
            </Button>
          </div>
        </form>
      </Modal>
    </Fragment>
  );
};

export default SubscriptionCard;
