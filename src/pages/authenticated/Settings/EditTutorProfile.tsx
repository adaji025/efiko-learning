import {
  Button,
  TextInput,
  Select,
  PasswordInput,
  Textarea,
  LoadingOverlay,
  NumberInput,
  FileInput,
} from "@mantine/core";
import { MdEdit } from "react-icons/md";
// import { VerifiedIcon } from "../Profile/Profile";
import { countryList } from "../../../utils/country";
import { ProfileTypes } from "../../../types/auth";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { useCallback, useEffect, useState } from "react";
import useNotification from "../../../hooks/useNotification";
import { UserProfileTypes } from "../../../types/user";
import {
  getUserProfile,
  profileSetUp,
  updatePassword,
} from "../../../services/user";
import ProfilePictureUploader from "./components/ProfilePictureUploader";
import { toast } from "react-toastify";
import { useForm } from "@mantine/form";
import { qaulification, subjects } from "../../../components/data";

const EditTutorProfile = () => {
  const [files, setFiles] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfileTypes | null>(null);
  const [edDocvalue, setEdDocValue] = useState<File | null>(null);
  const [natIdvalue, setNatIdValue] = useState<File | null>(null);

  const { handleError } = useNotification();
  const userData: ProfileTypes = useSelector(
    (state: RootState) => state.user.userData
  );

  const id = userData._id;
  const profileImage = userProfile?.data.profileImage;

  console.log(userProfile);
  console.log(files);
  useEffect(() => {
    handleGetUserProfile();
  }, []);

  const form = useForm({
    initialValues: {
      fullName: "",
      age: "",
      country: "",
      description: "",
      education: "",
      teachingExperience: "",
      subject: "",
    },
    validate: {
      fullName: (value) => (value === "" ? "Input full name" : null),
      country: (value) => (value === "" ? "Input Country" : null),
      age: (value) => (value === "" ? "Input age" : null),
      education: (value) => (value === "" ? "Input Education" : null),
      teachingExperience: (value) => (value === "" ? "Input Majors" : null),
    },
  });

  useEffect(() => {
    form.setValues({
      fullName: userProfile ? userProfile.data?.fullName : "",
      // @ts-ignore
      age: userProfile ? userProfile.data?.age : "",
      country: userProfile ? userProfile.data?.country : "",
      description: userProfile ? userProfile.data?.description : "",
      education: userProfile
        ? userProfile.data?.tutorEducationDetails.education
        : "",
      teachingExperience: userProfile
        ? userProfile.data?.tutorEducationDetails.teachingExperience
        : "",
      subject: userProfile
        ? userProfile.data.tutorEducationDetails.education
        : "",
    });
  }, [userProfile]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();

    // Append regular key-value pairs
    if (files) formData.append("image", files);
    if (edDocvalue) formData.append("educationDoc", edDocvalue);
    if (natIdvalue) formData.append("nationalId", natIdvalue);
    formData.append("fullName", form.values.fullName);
    formData.append("age", form.values.age);
    formData.append("country", form.values.country);
    // formData.append("teachingExperience", form.values.teachingExperience);
    formData.append("description", form.values.description);
    // formData.append("subject", form.values.subject);
    // formData.append("education", form.values.education);

    // Append nested object key-value pairs
    formData.append("tutorEducationDetails.education", form.values.education);
    formData.append(
      "tutorEducationDetails.teachingExperience",
      form.values.teachingExperience
    );
    formData.append("tutorEducationDetails.subject", form.values.subject);

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

  const passwordForm = useForm({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validate: {
      confirmPassword: (value, values) =>
        value !== values.newPassword ? "Passwords did not match" : null,
    },
  });

  const validatePw = useCallback((): boolean => {
    if (passwordForm.values.newPassword !== passwordForm.values.confirmPassword)
      return true;
    return false;
  }, [passwordForm.values.confirmPassword]);

  const handleChangePassword = (values: any) => {
    setLoading(true);

    updatePassword(values)
      .then(() => {
        toast.success("Password was updated successful");
      })
      .catch((err) => {
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
            <div className="font-semibold mt-5">{userProfile?.data.fullName}</div>
            <div className="text-sm mt-2 capitalize">
              {userProfile?.data.accountType}
            </div>
            <div className="text-sm mt-2">{userProfile?.data.email}</div>

            {/* <Button
              className="bg-secondary text-primary font-bold mt-5"
              leftSection={<VerifiedIcon />}
            >
              {userProfile?.data.approvalStatus === "Pending"
                ? "Pending Account"
                : "Verified Account"}
            </Button> */}
          </div>

          <div className="flex-1">
            <div className="p-5 border-b">
              <div className="font-semibold mt-5 text-lg flex items-center gap-2">
                <div>Update Personal Details</div>
                <MdEdit />
              </div>
              <Textarea
                mt={16}
                label="Profile Description"
                autosize
                minRows={8}
                size="sm"
                className=""
                {...form.getInputProps("description")}
              />
            </div>

            <div className="p-5 border-b">
              <div className="font-semibold mt-5 text-lg flex items-center gap-2">
                <div>Update Personal Details</div>
                <MdEdit />
              </div>
              <TextInput
                required
                mt={16}
                size="md"
                label="Full Name"
                {...form.getInputProps("fullName")}
              />
              <NumberInput
                hideControls
                required
                mt={16}
                size="md"
                label="Age"
                {...form.getInputProps("age")}
              />

              <Select
                required
                mt={16}
                size="md"
                label="Country"
                data={countryList.map((country) => country)}
                searchable
                {...form.getInputProps("country")}
              />
            </div>

            <div className="p-5 border-b">
              <div className="font-semibold mt-5 mb-3 text-lg flex items-center gap-2">
                <div>Educational Details</div>
                <MdEdit />
              </div>
              <Select
                required
                size="md"
                label="Education"
                data={qaulification.map((qaulification) => qaulification)}
                {...form.getInputProps("education")}
              />
              <NumberInput
                hideControls
                required
                mt={16}
                size="md"
                label="Teaching Experience"
                {...form.getInputProps("teachingExperience")}
              />

              <Select
                required
                mt={16}
                size="md"
                label="What subject you want to teach?"
                data={subjects.map((subject) => subject)}
                searchable
                {...form.getInputProps("subject")}
              />
              <FileInput
                // multiple
                required
                size="md"
                mt={16}
                value={edDocvalue}
                onChange={setEdDocValue}
                label="Upload your highest educational document"
              />
              <FileInput
                required
                size="md"
                mt={16}
                value={natIdvalue}
                onChange={setNatIdValue}
                label="Upload your national identity card"
              />

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
              <form onSubmit={passwordForm.onSubmit(handleChangePassword)}>
                <PasswordInput
                  placeholder="Enter your password"
                  required
                  mt={16}
                  size="md"
                  label="Current Password"
                  className="w-full"
                  {...passwordForm.getInputProps("newPassword")}
                />
                <PasswordInput
                  placeholder="Enter your password"
                  required
                  mt={16}
                  size="md"
                  label="New Password"
                  className="w-full"
                  {...passwordForm.getInputProps("newPassword")}
                />
                <PasswordInput
                  placeholder="Enter your password"
                  required
                  mt={16}
                  size="md"
                  label="Confirm Password"
                  className="w-full"
                  {...passwordForm.getInputProps("confirmPassword")}
                  error={validatePw() ? "Passwords did not match" : null}
                />
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    size="md"
                    mt={30}
                    className="bg-primary md:w-1/2 ml-auto"
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTutorProfile;
