"use client";

import React from "react";
import Image from "next/image";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const DocumentsPage = () => {
  const { user } = useUser();
  const create = useMutation(api.documents.create);

  const onCreate = () => {
    const promise = create({
      title: "Untitle",
    });

    toast.promise(promise, {
      loading: "Creating a new note. . .",
      success: "New note created!",
      error: "Failed to create a new note.",
    });
  };
  if (!user) {
    return <></>;
  }

  return (
    <div className="h-full flex flex-col items-center justify-center space-y-4">
      <Image
        src="/empty.png"
        width="300"
        height="300"
        alt="Empty"
        className="dark:hidden"
      />
      <Image
        src="/empty-dark.png"
        width="300"
        height="300"
        alt="Empty"
        className="dark:block hidden"
      />
      <h2 className="text-lg font-medium">
        Welcome to {user.lastName}&apos;s Notion
      </h2>
      <Button onClick={onCreate}>
        <PlusCircle className="w-4 h-4 mr-2" />
        Create new note
      </Button>
    </div>
  );
};

export default DocumentsPage;
