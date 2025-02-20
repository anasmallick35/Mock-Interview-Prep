import { useEffect, useState } from "react";
import useAuth from "@/hooks/useAuth";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER } from "@/services/InterviewQuery";
import { UPDATE_USER } from "@/services/InterviewMutation";
import { Spinner } from "@/components/Spinner";
import { toast } from "sonner";

const Profile = () => {
  const {
    user,
    isFirebaseAuthenticated,
  } = useAuth();

  const [name, setName] = useState<string>("user");
  const [picture, setPicture] = useState<string>("");
  const [_userRole, setUserRole] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: { userId: isFirebaseAuthenticated ? user?.uid : user?.sub },
  });

  const [updateUser, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_USER);

  const userProfile = data?.users_by_pk;
  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name);
      setPicture(userProfile.picture);
      setUserRole(userProfile.role);
    }
  }, [data]);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "userPicture");

    try {
      setUploading(true);
      const response = await fetch("https://api.cloudinary.com/v1_1/dnwbvaf4u/upload", {
        method: "POST",
        body: formData,
      });

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

  if (!user) {
    return <div className="text-center text-red-500">Not authenticated</div>;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">Error fetching user data</div>;
  }

 

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Profile</h1>

      <div className="flex flex-col md:flex-row items-center gap-8">
        <div className="flex-shrink-0">
          <img
            src={picture}
            alt={name}
            className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
          />
        </div>

        <div className="flex-grow">
          <h2 className="text-2xl font-semibold">{name}</h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
          <div  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
           
          />
          </div>
          {uploading && <p className="text-blue-500">Uploading...</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updateLoading || uploading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
          >
            {updateLoading || uploading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>

      {updateError && (
        <div className="mt-4 text-red-500 text-center">Error updating profile. Please try again.</div>
      )}
    </div>
  );
};

export default Profile;
