import React from "react";
import ProfileTemplate from "../../components/profile/profileTemplate";

export const dummyProfileData = {
  fullName: "Coordinator",
  email: "admin@snsinstitution.com",
  institution: "SNS Institution",
  contactNumber: "+91 9867453201",
};

const profileFields = [
  {
    label: "Full Name",
    type: "text",
    value: dummyProfileData.fullName,
  },
  {
    label: "Mail ID",
    type: "text",
    value: dummyProfileData.email,
  },
  {
    label: "Institution",
    type: "text",
    value: dummyProfileData.institution,
  },
  {
    label: "Contact Number",
    type: "text",
    value: dummyProfileData.contactNumber,
  },
];

const CoordinatorProfile = () => {
  return (
    <ProfileTemplate
      titleFields={{
        name: dummyProfileData?.fullName,
        sub: dummyProfileData?.email,
      }}
      editable={true}
      showButton={true}
      buttonLabel="Edit Profile"
      fields={profileFields}
    />
  );
};

export default CoordinatorProfile;
