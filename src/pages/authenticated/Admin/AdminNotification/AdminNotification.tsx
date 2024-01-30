import { LiaTimesSolid } from "react-icons/lia";
import { useState, Fragment, useEffect } from "react";
import { LoadingOverlay } from "@mantine/core";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import useNotification from "../../../../hooks/useNotification";
import { NotificationState } from "../../../../types/notification";
import { getAdminNotification } from "../../../../services/admin/notification";

const AdminNotification = () => {
  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState<NotificationState | null>(
    null
  );

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");

  const { handleError } = useNotification();
  console.log(notifications)

  useEffect(() => {
    handleGetNotification();
  }, []);

  const handleGetNotification = () => {
    setLoading(true);

    getAdminNotification()
      .then((res: any) => {
        setNotifications(res.data);
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <Fragment>
      <LoadingOverlay visible={loading} />
      <div className="mt-[50px] lg:mt-5">
        <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
          Notification
        </div>
        <div className="mt-10 grid gap-5 max-w-[800px]">
          {notifications?.data.map((notification, i) => (
            <div className="border-b flex justify-between py-4 px-4 lg:px-10" key={i}>
              {notification.message} {"   "}
              <span className="text-sm text-black/70">
                {timeAgo.format(new Date(notification.createdAt))}
              </span>
              <LiaTimesSolid />
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default AdminNotification;
