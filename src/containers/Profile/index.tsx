"use client";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "@/services/InterviewQuery";
import { UPDATE_USER } from "@/services/InterviewMutation";

import ProfileComponent from "@/pages/Profile";

const ProfileContainer = () => {
  const { user, isFirebaseAuthenticated, isGuest } = useAuth();

  const [name, setName] = useState<string>("user");
  const [picture, setPicture] = useState<string>("");
  const [_userRole, setUserRole] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const guestId = import.meta.env.VITE_GUEST_ID;

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userId: isFirebaseAuthenticated
        ? user?.uid
        : isGuest
          ? guestId
          : user?.sub,
    },
  });

  const [updateUser, { loading: updateLoading, error: updateError }] =
    useMutation(UPDATE_USER);

  useEffect(() => {
    if (data?.users_by_pk) {
      setName(data.users_by_pk.name);
      setPicture(data.users_by_pk.picture);
      setUserRole(data.users_by_pk.role);
    }
  }, [data]);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "userPicture");

    try {
      setUploading(true);
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dnwbvaf4u/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setUploading(false);

      if (data.secure_url) {
        setPicture(data.secure_url);
        setImageFile(null);
        return data.secure_url;
      } else {
        toast.error("Failed to upload image. Please try again.");
        return null;
      }
    } catch (error) {
      console.error("Cloudinary Upload Error:", error);
      setUploading(false);
      toast.error("Failed to upload image. Please try again.");
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isGuest) {
      toast.error("You are not eligible to update the profile.");
      return;
    }

    let imageUrl = picture;

    if (imageFile) {
      const uploadedUrl = await uploadToCloudinary(imageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
    }

    try {
      await updateUser({
        variables: {
          userId: isFirebaseAuthenticated ? user?.uid : user?.sub,
          name: name,
          picture: imageUrl,
        },
      });

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating user:", err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <ProfileComponent
      user={user}
      name={name}
      setName={setName}
      picture={picture}
      setImageFile={setImageFile}
      uploading={uploading}
      updateLoading={updateLoading}
      updateError={updateError}
      handleSubmit={handleSubmit}
      loading={loading}
      error={error}
    />
  );
};

export default ProfileContainer;
