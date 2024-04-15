import {
    Button,
    TextInput,
    Select,
    PasswordInput,
    Textarea,
    LoadingOverlay,
  } from "@mantine/core";
  import { MdEdit } from "react-icons/md";
  import { VerifiedIcon } from "../Profile/Profile";
  import { countryList } from "../../../utils/country";
  import { ProfileTypes } from "../../../types/auth";
  import { useSelector } from "react-redux";
  import { RootState } from "../../../redux/store";
  import { useEffect, useState } from "react";
  import useNotification from "../../../hooks/useNotification";
  import { UserProfileTypes } from "../../../types/user";
  import { getUserProfile } from "../../../services/user";
  import ProfilePictureUploader from "./components/ProfilePictureUploader";
  
  const EditTutorProfile = () => {
    const [files, setFiles] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [userProfile, setUserProfile] = useState<UserProfileTypes | null>(null);
  
    const { handleError } = useNotification();
    const userData: ProfileTypes = useSelector(
      (state: RootState) => state.user.userData
    );
  
    const profileImage = userProfile?.data.profileImage;
  
    console.log(userProfile);
    console.log(files);
    useEffect(() => {
      handleGetUserProfile();
    }, []);
  
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
                {" "}
                {userData.accountType === "student"
                  ? `${userProfile?.data.firstName}  ${userProfile?.data.lastName}`
                  : userData?.fullName}
              </div>
              <div className="text-sm mt-2 capitalize">
                {userProfile?.data.accountType}
              </div>
              <div className="text-sm mt-2">{userProfile?.data.email}</div>
              {userProfile?.data.isVerified && (
                <Button
                  className="bg-secondary text-primary font-bold mt-5"
                  leftSection={<VerifiedIcon />}
                >
                  Verified Account
                </Button>
              )}
            </div>
  
            <div className="flex-1">
              {userData?.accountType === "tutor" && (
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
                    value="I am passionate about teaching and learning, and I enjoy working with students of all ages and abilities. I am also committed to providing my students with the best possible tutoring experience. I am always looking for new ways to improve my teaching methods and to provide my students with the resources they need to succeed. If you are interested in learning more about my tutoring services, please contact me today. I would be happy to discuss your individual needs and to answer any questions you may have"
                  />
                </div>
              )}
  
              <div className="p-5 border-b">
                <div className="font-semibold mt-5 text-lg flex items-center gap-2">
                  <div>Update Personal Details</div>
                  <MdEdit />
                </div>
                <TextInput
                  size="md"
                  mt={16}
                  label="User name"
                  placeholder="Enter your valid email address"
                />
                <TextInput
                  size="md"
                  mt={16}
                  label="Full name"
                  placeholder="Enter your full names"
                />
                <TextInput
                  size="md"
                  mt={16}
                  label="Age"
                  placeholder="Enter your age"
                />
                <Select
                  required
                  mt={16}
                  size="md"
                  label="Country"
                  placeholder="select your country"
                  data={countryList.map((country) => country)}
                  searchable
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
                  mt={16}
                  label="Education"
                  placeholder="Choose Education"
                  data={[
                    { label: "one", value: "1" },
                    { label: "tw0", value: "2" },
                    { label: "three", value: "3" },
                  ]}
                />
                <Select
                  required
                  size="md"
                  mt={16}
                  label="Your majors"
                  placeholder="Choose Education"
                  data={[
                    { label: "one", value: "1" },
                    { label: "tw0", value: "2" },
                    { label: "three", value: "3" },
                  ]}
                />
  
                <Select
                  required
                  size="md"
                  mt={16}
                  label="Subjects you are interested in *"
                  placeholder="Choose subjects"
                  data={[
                    { label: "one", value: "1" },
                    { label: "tw0", value: "2" },
                    { label: "three", value: "3" },
                  ]}
                />
  
                <div className="mt-4 flex flex-wrap gap-5 ">
                  {[...Array(7)].map((_, i) => (
                    <div key={i} className="bg-secondary p-2 rounded-md">
                      Mathematics
                    </div>
                  ))}
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
              </div>
            </div>
          </div>
  
          <div className="flex justify-center">
            <Button
              type="submit"
              size="md"
              mt={30}
              className="bg-primary w-1/2 mx-auto"
            >
              Update Changes
            </Button>
          </div>
        </div>
      </div>
    );
  };
  
  export default EditTutorProfile;
  