import {
  Button,
  TextInput,
  Select,
  PasswordInput,
  LoadingOverlay,
  MultiSelect,
} from "@mantine/core";
import { MdEdit } from "react-icons/md";
import { countryList } from "../../../utils/country";
import { ProfileTypes } from "../../../types/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useCallback, useEffect, useState } from "react";
import useNotification from "../../../hooks/useNotification";
import { UserProfileTypes } from "../../../types/user";
import { getUserProfile, profileSetUp } from "../../../services/user";
import ProfilePictureUploader from "./components/ProfilePictureUploader";
import { useForm } from "@mantine/form";
import { toast } from "react-toastify";
import { DateInput } from "@mantine/dates";
import { majors, subjects } from "../../../components/data";

const EditProfile = () => {
  const [files, setFiles] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileTypes | null>(null);

  const { handleError } = useNotification();
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  const id = userData._id;
  const profileImage = userProfile?.data.profileImage;

  console.log(userProfile?.data);
  useEffect(() => {
    handleGetUserProfile();
  }, []);

  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      country: "",
      education: "",
      careerInterest: "",
      subjectOfInterest: [],
    },
    validate: {
      lastName: (value) => (value === "" ? "Input full name" : null),
      firstName: (value) => (value === "" ? "Input full name" : null),
      country: (value) => (value === "" ? "Input Country" : null),
      dateOfBirth: (value) => (value === "" ? "Input age" : null),
      education: (value) => (value === "" ? "Input Education" : null),
      careerInterest: (value) =>
        value === "" ? "Input career of Interest" : null,
      subjectOfInterest: (value) =>
        value.length < 6 ? "Input subject Of Interest" : null,
    },
  });

  useEffect(() => {
    form.setValues({
      firstName: userProfile ? userProfile.data?.firstName : "",
      lastName: userProfile ? userProfile.data?.lastName : "",
      // @ts-ignore
      dateOfBirth: userProfile ? new Date(userProfile.data?.age) : new Date(),
      country: userProfile ? userProfile.data?.country : "",
      education: userProfile
        ? userProfile.data?.studentEducationDetails.education
        : "",
      careerInterest: userProfile
        ? userProfile.data?.studentEducationDetails.careerInterest
        : "",
      // @ts-ignore
      subjectOfInterest: userProfile
        ? userProfile.data?.studentEducationDetails.subjectOfInterest
        : [],
    });
  }, [userProfile]);

  const validateTwo = useCallback((): boolean => {
    if (form.values.subjectOfInterest.length < 6) return true;
    return false;
  }, [form.values]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Append regular key-value pairs
    if (files) formData.append("image", files);
    formData.append("firstName", form.values.firstName);
    formData.append("lastName", form.values.lastName);
    formData.append("age", form.values.dateOfBirth);
    formData.append("country", form.values.country);
    formData.append("subjectOfInterest", form.values.country);

    // Append nested object key-value pairs
    formData.append("studentEducationDetails.education", form.values.education);
    formData.append(
      "studentEducationDetails.careerInterest",
      form.values.careerInterest
    );

    // Append array elements
    form.values.subjectOfInterest.forEach((subject, index) => {
      formData.append(
        `studentEducationDetails.subjectOfInterest[${index}]`,
        subject
      );
    });

    profileSetUp(id, formData)
      .then(() => {
        toast.success("Profile was updated successful");
      })
      .catch((err) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleGetUserProfile = () => {
    setLoading(true);

    getUserProfile(userData._id)
      .then((res: any) => {
        setUserProfile(res.data);
      })
      .catch((err: any) => {
        handleError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="mt-[50px] lg:mt-5">
      <LoadingOverlay visible={loading} />
      <div className="py-4 font-bold text-xl border-b px-4 lg:px-10">
        Edit Profile
      </div>
      <div className="mt-10 px-4 lg:px-8">
        <div className="border rounded-2xl flex flex-col md:flex-row">
          <div className="w-full md:w-1/3 flex flex-col items-center border-b md:border-b-0 md:border-r p-5">
            <ProfilePictureUploader
              profileImage={profileImage}
              setFiles={setFiles}
            />
            <div className="font-semibold mt-5">
              {userProfile?.data.firstName} ${userProfile?.data.lastName}
            </div>
            <div className="text-sm mt-2 capitalize">
              {userProfile?.data.accountType}
            </div>
            <div className="text-sm mt-2">{userProfile?.data.email}</div>
          </div>

          <div className="flex-1">
            <div className="p-5 border-b">
              <div className="font-semibold mt-5 text-lg flex items-center gap-2">
                <div>Update Personal Details</div>
                <MdEdit />
              </div>

              <TextInput
                size="md"
                mt={16}
                placeholder="Enter your first name"
                label="First Name"
                {...form.getInputProps("firstName")}
              />
              <TextInput
                required
                mt={16}
                size="md"
                placeholder="Enter your last Name"
                label="Last Name"
                {...form.getInputProps("lastName")}
              />
              <DateInput
                required
                mt={16}
                size="md"
                label="Date of Birth"
                {...form.getInputProps("dateOfBirth")}
              />

              <Select
                required
                mt={16}
                size="md"
                label="Country"
                placeholder="select your country"
                data={countryList.map((country) => country)}
                searchable
                {...form.getInputProps("country")}
              />
            </div>

            <div className="p-5 border-b">
              <div className="font-semibold mt-5 text-lg flex items-center gap-2">
                <div>Educational Details</div>
                <MdEdit />
              </div>
              <Select
                required
                size="md"
                label="Education"
                data={[
                  { label: "Grade 1", value: "grade 1" },
                  { label: "Grade 2", value: "grade 2" },
                  { label: "Grade 3", value: "grade 3" },
                  { label: "Grade 4", value: "grade 4" },
                  { label: "Grade 5", value: "grade 5" },
                  { label: "Grade 6", value: "grade 6" },
                  { label: "Grade 7", value: "grade 7" },
                  { label: "Grade 8", value: "grade 8" },
                  { label: "Grade 9", value: "grade 9" },
                ]}
                {...form.getInputProps("education")}
              />

              <Select
                required
                mt={16}
                size="md"
                label="Career Interests"
                searchable
                data={majors.map((major) => major)}
                {...form.getInputProps("careerInterest")}
              />

              <MultiSelect
                required
                // @ts-ignore
                autocomplete="false"
                mt={16}
                size="md"
                label="Subjects you are interested in"
                data={subjects.map((subject) => subject)}
                searchable
                {...form.getInputProps("subjectOfInterest")}
              />
              {validateTwo() && (
                <div className="text-xs text-red-500">
                  Select at least 6 subjects
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-5 ">
                {userProfile?.data?.studentEducationDetails.subjectOfInterest.map(
                  (item, i) => (
                    <div
                      key={i}
                      className="bg-secondary py-2 px-4 rounded-md min-w-[100px] text-center"
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
              <div className="flex justify-center">
                <Button
                  type="submit"
                  size="md"
                  mt={30}
                  className="bg-primary md:w-1/2 ml-auto"
                  onClick={handleSubmit}
                >
                  Update Changes
                </Button>
              </div>
            </div>

            <div className="p-5">
              <div className="font-semibold mt-5 text-lg flex items-center gap-2">
                <div>Update Password</div>
                <MdEdit />
              </div>

              <PasswordInput
                placeholder="Enter your password"
                required
                mt={16}
                size="md"
                label="Current Password"
                className="w-full"
                // {...form.getInputProps("newPassword")}
              />
              <PasswordInput
                placeholder="Enter your password"
                required
                mt={16}
                size="md"
                label="New Password"
                className="w-full"
                // {...form.getInputProps("newPassword")}
              />
              <PasswordInput
                placeholder="Enter your password"
                required
                mt={16}
                size="md"
                label="Confirm Password"
                className="w-full"
                // {...form.getInputProps("confirmPassword")}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  size="md"
                  mt={30}
                  className="bg-primary w-1/2 ml-auto"
                >
                  Update Password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
