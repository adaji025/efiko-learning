import { Skeleton } from "@mantine/core";
import { Fragment } from "react";

const TableSkeleton = () => {
  return (
    <Fragment>
      <Skeleton height={30} mt={30} radius="sm" />
      <Skeleton height={30} mt={12} radius="sm" />
      <Skeleton height={30} mt={12} radius="sm" />
      <Skeleton height={30} mt={12} radius="sm" />
      <Skeleton height={30} mt={12} radius="sm" />
    </Fragment>
  );
};

export default TableSkeleton;
