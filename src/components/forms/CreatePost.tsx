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
import useGetLoggedInUser from "@/hooks/useGetLoggedInUser";

const postSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
});

type PostForm = z.infer<typeof postSchema>;

interface Community {
  group_id: string;
  user_community_id: number;
  vault_id: string;
}

function CreatePost() {
  const router = useRouter();
  const [groupId, setGroupId] = useState<string | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const { control, handleSubmit } = useForm<PostForm>();
  const [communities, setCommunities] = useState<Community[]>([]);
  const { loggedInUser } = useGetLoggedInUser();

  useEffect(() => {
    if (loggedInUser) {
      ApiService.fetchCommunityByVaultId(loggedInUser.vault_id)
        .then((response) => {
          setCommunities(response.results || []);
          setGroupId(response.results?.[0]?.group_id || null);
          console.log("Communities:", response.results);
        })
        .catch((error) => {
          console.error("Error fetching communities by vault ID:", error);
        });
    }
  }, [loggedInUser]);

  const handleCreatePost = async (data: PostForm) => {
    try {
      setIsCreatingPost(true);

      // to validate the form data against the schema
      postSchema.parse(data);

      // if validation passes, proceed with creating the post
      console.log("Creating post with data:", data);
      const post = await ApiService.createPost(
        data.title,
        data.content,
        loggedInUser?.vault_id || "",
        groupId || ""
      );
      console.log("Post created:", post);
      router.push("/dashboard/home");
    } catch (error) {
      if (error instanceof ZodError) {
        // handle Zod validation errors
        console.error("Validation error:", error.errors);
      } else {
        // handle other errors
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
      <label className="font-semibold">Community</label>
      <select
        {...(control as any).register("group_id", {
          required: "Community is required",
        })}
        className="border p-2"
        value={groupId || ""}
        onChange={(e) => setGroupId(e.target.value)}
      >
        <option value="">Select a Community</option>
        {communities.map((community) => (
          <option key={community.group_id} value={community.group_id}>
            {community.group_id}
          </option>
        ))}
      </select>

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
      <Button type="submit" disabled={isCreatingPost} className="bg-primary/10 hover:bg-primary/30">
        {isCreatingPost ? "Creating Post..." : "Create Post"}
      </Button>
    </form>
  );
}

export default CreatePost;
