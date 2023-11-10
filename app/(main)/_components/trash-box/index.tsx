"use client";

import ConfirmModal from "@/components/modal/confirm-modal";
import Spinner from "@/components/spinner";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { Search, Trash, Undo } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const TrashBox = () => {
  const params = useParams();
  const router = useRouter();

  const trashList = useQuery(api.documents.getTrashList);
  const restore = useMutation(api.documents.restore);
  const remove = useMutation(api.documents.remove);

  const [search, setSearch] = useState<string>("");

  const filterDocument = trashList?.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase())
  );

  const onRedirect = (id: string) => {
    router.push(`/documents/${id}`);
  };

  const onRestore = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    documentId: Id<"documents">
  ) => {
    e.stopPropagation();
    const promise = restore({
      id: documentId,
    });

    toast.promise(promise, {
      loading: "Restoring note. . .",
      success: "Note restored!",
      error: "Failed to restore note.",
    });
  };

  const onDelete = (documentId: Id<"documents">) => {
    const promise = remove({
      id: documentId,
    });

    toast.promise(promise, {
      loading: "Deleting note. . .",
      success: "Note deleted!",
      error: "Failed to delete note.",
    });

    if (params.documentId === documentId) {
      router.push("/documents");
    }
  };

  if (!trashList) {
    return (
      <div className="h-full p-4 grid place-items-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="text-sm">
      <div className="flex items-center gap-x-2 p-2">
        <Search className="h-4 w-4" />
        <Input
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          className="h-7 px-2 focus-visible:ring-transparent bg-secondary"
          placeholder="Filter by page title . . ."
        />
      </div>

      <div className="mt-2 px-1 pb-1">
        <p className="hidden last:block text-xs text-center text-muted-foreground pb-2">
          No documents found
        </p>
        {filterDocument?.map((doc) => (
          <div
            key={doc._id}
            role="button"
            onClick={() => onRedirect(doc._id)}
            className="text-sm rounded-sm w-full hover:ng-primary/5 flex items-center text-primary justify-between"
          >
            <span className="truncate pl-2">{doc.title}</span>
            <div className="flex items-center">
              <div
                onClick={(e) => onRestore(e, doc._id)}
                role="button"
                className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
              >
                <Undo className="h-4 w-4 text-muted-foreground" />
              </div>
              <ConfirmModal onConfirm={() => onDelete(doc._id)}>
                <div
                  role="button"
                  className="rounded-sm p-2 hover:bg-neutral-200 dark:hover:bg-neutral-600"
                >
                  <Trash className="h-4 w-4 text-muted-foreground" />
                </div>
              </ConfirmModal>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrashBox;
