"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ApiService from "@/ApiService";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { z, ZodError } from "zod";
import { getCookie } from "@/helper";

const postSchema = z.object({
  content: z.string().min(1, { message: "Content is required" }),
});

type PostForm = z.infer<typeof postSchema>;

interface Props {
  postId: number;
}

interface UserData {
  username: string;
  vaultId: string;
}

interface Community {
  group_id: string;
  user_community_id: number;
  vault_id: string;
}

function CreatePost({ postId }: Props) {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isCreatingComment, setIsCreatingComment] = useState(false);
  const { control, handleSubmit, reset } = useForm<PostForm>();

  useEffect(() => {
    const loggedInUser = getCookie();

    if (loggedInUser) {
      setUserData({
        username: loggedInUser.username,
        vaultId: loggedInUser.vault_id,
      });
    }
  }, []);

  const handleCreateComment = async (data: PostForm) => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      setIsCreatingComment(true);

      postSchema.parse(data);

      console.log("Creating comment with data:", data);
      const comment = await ApiService.createComment(
        data.content,
        postId,
        userData?.vaultId || ""
      );
      console.log("Comment created:", comment);

      reset();

      router.push(
        `/dashboard/post/${postId}?${searchParams.toString()}` as string
      );
    } catch (error) {
      if (error instanceof ZodError) {
        console.error("Validation error:", error.errors);
      } else {
        console.error("Error creating post:", error);
      }
    } finally {
      setIsCreatingComment(false);
    }
    window.location.reload();
  };

  return (
    <form
      onSubmit={handleSubmit(handleCreateComment)}
      className="mt-10 flex flex-col justify-start gap-5"
    >
      <label className="font-semibold">Post a Comment</label>
      <Textarea
        label="Comment"
        rows={3}
        {...(control as any).register("content", {
          required: "Content is required",
        })}
      />
      <Button type="submit" disabled={isCreatingComment}>
        {isCreatingComment ? "Creating Comment..." : "Create Comment"}
      </Button>
    </form>
  );
}

export default CreatePost;
