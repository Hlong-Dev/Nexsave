"use client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useCoverImage } from "@/hooks/useCoverImage";
import { useEdgeStore } from "@/lib/edgestore";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { ImageIcon, X } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

interface CoverProps {
  url?: string;
  preview?: boolean;
}
const Cover = ({ url, preview }: CoverProps) => {
  const { edgestore } = useEdgeStore();
  const params = useParams();
  const coverImage = useCoverImage();
  const removeCover = useMutation(api.documents.removeCoverImage);

  const onRemoveCover = async () => {
    removeCover({
      id: params.documentId as Id<"documents">,
    });

    if (url) {
      await edgestore.publicFiles.delete({
        url: url,
      });
    }
  };

  return (
    <div
      className={cn(
        "relative w-full group",
        !url && "h-10vh",
        url && "h-[35vh] bg-muted"
      )}
    >
      {!!url && <Image src={url} alt="Cover" fill className="object-cover" />}
      {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute bottom-5 right-5 flex items-center gap-2">
          <Button
            onClick={() => coverImage.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <ImageIcon className="w-4 h-4 mr-2" />
            Change cover
          </Button>
          <Button
            onClick={onRemoveCover}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            <X className="w-4 h-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cover;

Cover.Skeleton = function CoverSkeleton() {
  return <Skeleton className="w-full h-[10vh]" />;
};
