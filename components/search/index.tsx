"use client";
import { api } from "@/convex/_generated/api";
import { useSearch } from "@/hooks/useSearch";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { File } from "lucide-react";

const SearchCommand = () => {
  const router = useRouter();
  const documentList = useQuery(api.documents.getSearch);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  const onToggle = useSearch((store) => store.onToggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  const onRedirect = (id: string) => {
    router.push(`/documents/${id}`);
    onClose();
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key == "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onToggle();
      }
    };

    document.addEventListener("keydown", down);

    return () => document.removeEventListener("keydown", down);
  }, [onToggle]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput placeholder="Search . . ." />
      <CommandList>
        <CommandEmpty>No results founded.</CommandEmpty>
        <CommandGroup heading="Documents">
          {documentList?.map((doc) => (
            <CommandItem
              key={doc._id}
              value={`${doc._id}-${doc.title}`}
              title={doc.title}
              onSelect={onRedirect}
            >
              {doc.icon ? (
                <p className="mr-2">{doc.icon}</p>
              ) : (
                <File className="h-4 w-4 mr-2" />
              )}

              <span>{doc.title}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};

export default SearchCommand;
