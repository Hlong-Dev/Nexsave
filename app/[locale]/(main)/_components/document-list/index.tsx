"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import Item from "../item";
import { cn } from "@/lib/utils";
import { FileIcon } from "lucide-react";
import { useTranslations } from "next-intl";

interface DocumentListProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  // data?: Doc<"documents">;
}
const DocumentList = ({ parentDocumentId, level = 0 }: DocumentListProps) => {
  const t = useTranslations();
  const params = useParams();
  const router = useRouter();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const documentList = useQuery(api.documents.getDocSidebar, {
    parentDocument: parentDocumentId,
  });

  const handleRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  const onExpanded = (documentId: string) => {
    setExpanded((prev) => ({ ...prev, [documentId]: !prev[documentId] }));
  };

  if (!documentList) {
    return (
      <>
        <Item.Skeleton level={level} />
        {level === 0 && (
          <>
            <Item.Skeleton level={level} />
            <Item.Skeleton level={level} />
          </>
        )}
      </>
    );
  }

  return (
    <>
      <p
        className={cn(
          "hidden text-sm font-medium text-muted-foreground/80 py-2",
          expanded && "last:block",
          level === 0 && "hidden"
        )}
        style={{
          paddingLeft: level ? `${level * 12 + 25}px` : undefined,
        }}
      >
        {t("noPagesInside")}
      </p>
      {documentList?.map((document) => (
        <div key={document._id}>
          <Item
            label={document.title}
            id={document._id}
            icon={FileIcon}
            documentIcon={document.icon}
            onClick={() => handleRedirect(document._id)}
            active={document._id === params.documentId}
            level={level}
            onExpanded={() => onExpanded(document._id)}
            expanded={expanded[document._id]}
          />
          {expanded[document._id] && (
            <DocumentList parentDocumentId={document._id} level={level + 1} />
          )}
        </div>
      ))}
    </>
  );
};

export default DocumentList;
