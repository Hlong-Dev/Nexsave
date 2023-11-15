"use client";

import { Toolbar } from "@/app/(main)/_components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import React from "react";

interface DocumentDetailProps {
  params: {
    documentId: Id<"documents">;
  };
}
const DocumentDetail = ({ params }: DocumentDetailProps) => {
  const document = useQuery(api.documents.getDocById, {
    documentId: params.documentId,
  });

  if (document === undefined) {
    return <p>Loading</p>;
  }

  if (document === null) {
    return <p>Not found</p>;
  }

  return (
    <div className="pb-40 pt-10">
      <div className="md:max-w-3xl mx-auto lg:max-w-4xl">
        <Toolbar initialData={document} />
      </div>
    </div>
  );
};

export default DocumentDetail;
