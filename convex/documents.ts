import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";

export const get = query({
  handler: async (ctx, args) => {
    const userIdentify = await ctx.auth.getUserIdentity();
    if (!userIdentify) {
      throw new Error("Must authenticated first!");
    }
    const documents = await ctx.db.query("documents").collect();

    return documents;
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
