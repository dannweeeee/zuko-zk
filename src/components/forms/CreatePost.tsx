"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ApiService from "@/ApiService";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z, ZodError } from "zod";
import { getCookie } from "@/helper";

const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

type PostForm = z.infer<typeof postSchema>;

interface UserData {
  username: string;
  vaultId: string;
}

function CreatePost() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [groupId, setGroupId] = useState<string | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const { control, handleSubmit } = useForm<PostForm>();

  useEffect(() => {
    const loggedInUser = getCookie();

    if (loggedInUser) {
      setUserData({
        username: loggedInUser.username,
        vaultId: loggedInUser.vault_id,
      });

      ApiService.fetchCommunityByVaultId(loggedInUser.vault_id)
        .then((response) => {
          setGroupId(response.results?.[0]?.group_id || null);
          console.log("GroupID:", response.results?.[0]?.group_id);
        })
        .catch((error) => {
          console.error("Error fetching communities by vault ID:", error);
        });
    }
  }, []);

  const handleCreatePost = async (data: PostForm) => {
    try {
      setIsCreatingPost(true);

      // Validate the form data against the schema
      postSchema.parse(data);

      // If validation passes, proceed with creating the post
      console.log("Creating post with data:", data);
      const post = await ApiService.createPost(
        data.title,
        data.content,
        userData?.vaultId || "",
        groupId || ""
      );
      console.log("Post created:", post);
      router.push("/dashboard/home");
    } catch (error) {
      if (error instanceof ZodError) {
        // Handle Zod validation errors
        console.error("Validation error:", error.errors);
      } else {
        // Handle other errors
        console.error("Error creating post:", error);
      }
    } finally {
      setIsCreatingPost(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreatePost)}
      className="mt-10 flex flex-col justify-start gap-5"
    >
      <label className="font-semibold">Title</label>
      <Input
        label="Title"
        {...(control as any).register("title", {
          required: "Title is required",
        })}
      />
      <label className="font-semibold">Content</label>
      <Textarea
        label="Content"
        rows={10}
        {...(control as any).register("content", {
          required: "Content is required",
        })}
      />
      <Button type="submit" disabled={isCreatingPost}>
        {isCreatingPost ? "Creating Post..." : "Create Post"}
      </Button>
    </form>
  );
}

export default CreatePost;
