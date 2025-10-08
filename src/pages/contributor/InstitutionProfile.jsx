import React from "react";
import ProfileTemplate from "../../components/profile/profileTemplate";
import ProfileBanner from "../../assets/images/institution_profile.svg";
import Logo from "../../assets/images/institution_logo.svg";

export const dummyInstitutionData = {
  name: "SNS Institution",
  location: "Coimbatore, India",
  address: "123 Education Street, Bangalore",
  contactNumber: "+91 9876543210",
  contactEmail: "admin@snsgroups.com",
  accreditationStatus: "Accreditation Status: A+",
};

const institutionFields = [
  {
    label: "Institution Name",
    type: "text",
    value: dummyInstitutionData.name,
  },
  {
    label: "Location",
    type: "text",
    value: dummyInstitutionData.location,
  },
  {
    label: "Address",
    type: "text",
    value: dummyInstitutionData.address,
  },
  {
    label: "Contact Number",
    type: "text",
    value: dummyInstitutionData.contactNumber,
  },
  {
    label: "Contact Email",
    type: "email",
    value: dummyInstitutionData.contactEmail,
    colSpan: 2,
  },
];

const InstitutionProfilePage = () => {
  return (
    <ProfileTemplate
      bannerImage={ProfileBanner}
      logoImage={Logo}
      titleFields={{
        name: dummyInstitutionData.name,
        sub: dummyInstitutionData.location,
      }}
      showStatus={true}
      status={dummyInstitutionData.accreditationStatus}
      editable={false}
      showButton={false}
      fields={institutionFields}
    />
  );
};

export default InstitutionProfilePage;
