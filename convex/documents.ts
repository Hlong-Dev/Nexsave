import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

export const getDocSidebar = query({
  args: {
    parentDocument: v.optional(v.id("documents")),
  },
  handler: async (ctx, args) => {
    const userIdentify = await ctx.auth.getUserIdentity();
    if (!userIdentify) {
      throw new Error("Must authenticated first!");
    }

    const userId = userIdentify.subject;

    const documents = await ctx.db
      .query("documents")
      .withIndex("by_user_parent", (q) =>
        q.eq("userId", userId).eq("parentDocument", args.parentDocument)
      )
      .filter((q) => q.eq(q.field("isArchived"), false))
      .order("desc")
      .collect();

    return documents;
  },
});

export const archieve = mutation({
  args: { id: v.id("documents") },
  handler: async (ctx, args) => {
    const userIdentify = await ctx.auth.getUserIdentity();
    if (!userIdentify) {
      throw new Error("Must authenticated first!");
    }

    const userId = userIdentify.subject;

    const existingDocument = await ctx.db.get(args.id);

    if (!existingDocument) {
      throw new Error("Document not found.");
    }

    if (existingDocument.userId !== userId) {
      throw new Error("Unauthorize!");
    }

    const recursiveArchieve = async (documentId: Id<"documents">) => {
      const childrenList = await ctx.db
        .query("documents")
        .withIndex("by_user_parent", (q) =>
          q.eq("userId", userId).eq("parentDocument", documentId)
        )
        .collect();

      for (const child of childrenList) {
        await ctx.db.patch(child._id, { isArchived: true });
        await recursiveArchieve(child._id);
      }
    };

    const document = await ctx.db.patch(args.id, { isArchived: true });

    recursiveArchieve(args.id);

    return document;
  },
});

export const create = mutation({
  args: { title: v.string(), parentDocument: v.optional(v.id("documents")) },
  handler: async (ctx, args) => {
    const userIdentify = await ctx.auth.getUserIdentity();
    if (!userIdentify) {
      throw new Error("Must authenticated first!");
    }
    const userId = userIdentify.subject;

    const document = await ctx.db.insert("documents", {
      title: args.title,
      parentDocument: args.parentDocument,
      userId,
      isArchived: false,
      isPublished: false,
    });

    return document;
  },
});
