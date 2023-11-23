import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import { useCoverImage } from "@/hooks/useCoverImage";
import { SingleImageDropzone } from "../image-drop";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

const CoverImageModal = () => {
  const t = useTranslations();
  const params = useParams();
  const [file, setFile] = useState<File>();
  const update = useMutation(api.documents.update);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const coverImage = useCoverImage();
  const { edgestore } = useEdgeStore();

  const onClose = () => {
    coverImage.onClose();
    setIsSubmitting(false);
    setFile(undefined);
  };

  const onChange = async () => {
    if (!file) return;

    setIsSubmitting(true);

    const res = await edgestore.publicFiles.upload({
      file,
      ...(coverImage.url && {
        options: {
          replaceTargetUrl: coverImage.url,
        },
      }),
      onProgressChange: (progress) => {
        console.log(progress);
      },
    });

    await update({
      id: params.documentId as Id<"documents">,
      coverImage: res.url,
    });

    onClose();
  };
  return (
    <Dialog open={coverImage.isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <h2 className="text-center text-lg font-semibold">
            {t("coverImage")}
          </h2>
        </DialogHeader>
        <SingleImageDropzone
          disabled={isSubmitting}
          height={200}
          value={file}
          className="w-full outline-none"
          onChange={(file) => {
            setFile(file);
          }}
        />
        {!!file && <Button onClick={onChange}>{t("button.upload")}</Button>}
      </DialogContent>
    </Dialog>
  );
};

export default CoverImageModal;
