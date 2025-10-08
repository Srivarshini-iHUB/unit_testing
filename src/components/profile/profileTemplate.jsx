import React from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { PenLine  } from "lucide-react";
import { Label } from "@/components/ui/label";

const ProfileTemplate = ({
  bannerImage,
  logoImage,
  titleFields = {},
  status,
  showStatus = false,
  editable = false,
  showButton = false,
  buttonLabel = "Edit",
  fields = [],
}) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <h1 className="text-lg font-medium text-gray-900">Profile</h1>
      </div>

      {/* Banner Image */}
      {bannerImage ? (
        <div className="relative h-[120px]">
          <img src={bannerImage} alt="Banner" className="w-full h-full object-cover" />
        </div>
      ) : (
        <div className="relative h-[120px] w-full bg-color10"></div>
      )}

      {/* Logo + Info Section */}
      <div className="flex items-center justify-between px-6">
        {/* Logo */}
        <div className="w-40 h-40 mr-4 -mt-12">
          <Avatar className="w-full h-full border-4 border-white shadow-lg">
            <AvatarImage src={logoImage} />
            <AvatarFallback className="bg-primary text-white">
              <span className="text-4xl font-bold">{titleFields?.name?.slice(0, 1)}</span>
            </AvatarFallback>
          </Avatar>
        </div>

        {/* Name & Subtext */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-color1">{titleFields?.name}</h2>
          <p className="text-color1">{titleFields?.sub}</p>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {editable && showButton && (
            <Button
              variant="editButton"
              size="sm"
              className="flex items-center gap-2 bg-backgroundFill rounded-xl"
            >
              <PenLine className="w-4 h-4" />
              {buttonLabel}
            </Button>
          )}
          {showStatus && status && (
            <div className="bg-viewBtn text-color1 px-3 py-2 rounded-xl text-sm font-medium">
              {status}
            </div>
          )}
        </div>
      </div>

      {/* Form Section */}
      <div className="bg-color11 px-6 py-6 mt-8 mx-6 rounded-xl">
        <div className="grid grid-cols-1  gap-6">
          {fields.map((field, index) => (
            <div
              key={index}
            >
              <Label className="block mb-3">{field.label}</Label>
              <Input
                type={field.type}
                placeholder={field.placeholder}
                value={field.value}
                readOnly
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileTemplate;
