import { Fragment, useEffect, useState } from "react";
import { LoadingOverlay, Pagination, Select, Table } from "@mantine/core";
import { CiEdit } from "react-icons/ci";
import { GrCloudDownload } from "react-icons/gr";
import { RiDeleteBin5Line } from "react-icons/ri";
import AddCurriculum from "./AddCurriculum";
import { useDisclosure } from "@mantine/hooks";
import ConfirmDelete from "../../../../../components/Confirmation";
import {
  CurriculumState,
  CurriculumTypes,
} from "../../../../../types/curriculum";
import moment from "moment";
import {
  deleteCurriculum,
  downloadUrl,
} from "../../../../../services/admin/curriculum";
import { toast } from "react-toastify";
import useNotification from "../../../../../hooks/useNotification";

type IProps = {
  curriculums: CurriculumState | null;
  skip: number;
  limit: number;
  setLimit: React.Dispatch<React.SetStateAction<number>>;
  setSkip: React.Dispatch<React.SetStateAction<number>>;
  handleGetCurriculum: () => void;
};

const CurriculumsTable = ({
  curriculums,
  skip,
  setSkip,
  handleGetCurriculum,
  limit,
  setLimit,
}: IProps) => {
  const [loading, setLoading] = useState(false);
  const [curriculum, setCurriculum] = useState<CurriculumTypes | null>(null);
  const [edit, setEdit] = useState(false);
  const [curriculumId, setCurriculumId] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [opened, { open, close }] = useDisclosure(false);

  const { handleError } = useNotification();

  useEffect(() => {
    if (curriculums) setTotalPages(Math.ceil(curriculums?.total / limit));
  }, [curriculums, limit]);

  const handleDeleteCurriculum = () => {
    setLoading(true);

    deleteCurriculum(curriculumId)
      .then(() => {
        toast.success("Curriculum deleted successfully");
        handleGetCurriculum();
        close();
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
      <AddCurriculum
        opened={edit}
        close={() => setEdit(false)}
        callback={handleGetCurriculum}
        curriculum={curriculum || undefined}
      />
      <ConfirmDelete
        opened={opened}
        close={close}
        handleClick={handleDeleteCurriculum}
        btnText="Delete Curriculum"
      />
      <LoadingOverlay visible={loading} />
      <div className="rounded-[15px] mt-10 border border-gray-200 overflow-auto">
        <Table>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {curriculums &&
              curriculums.data.map((curriculum: CurriculumTypes) => (
                <Table.Tr key={curriculum._id}>
                  <Table.Td>{curriculum.title}</Table.Td>
                  <Table.Td>
                    {moment(curriculum.createdAt).format("YYYY-MM-DD")}
                  </Table.Td>
                  <Table.Td>
                    <div
                      className="flex gap-3"
                      onClick={() => setCurriculum(curriculum)}
                    >
                      <a
                        href={downloadUrl(curriculum.uniqueId)}
                        target="_blank"
                      >
                        <GrCloudDownload size={20} className="cursor-pointer" />
                      </a>
                      <CiEdit
                        size={20}
                        className="cursor-pointer"
                        onClick={() => {
                          setEdit(true);
                          setCurriculum(curriculum);
                        }}
                      />
                      <RiDeleteBin5Line
                        size={20}
                        className="cursor-pointer"
                        onClick={() => {
                          open();
                          setCurriculumId(curriculum._id);
                        }}
                      />
                    </div>
                  </Table.Td>
                </Table.Tr>
              ))}
          </Table.Tbody>
        </Table>

        {curriculums && (curriculums.data.length === 0 || !curriculums) && (
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

export default CurriculumsTable;
