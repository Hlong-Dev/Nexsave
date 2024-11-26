"use client";

import React, { ReactNode } from "react";
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

interface ConvexProviderProps {
    children: ReactNode;
}

// Log các biến môi trường để đảm bảo chúng đang được nạp đúng
console.log("Convex URL:", process.env.NEXT_PUBLIC_CONVEX_URL);
console.log("Clerk Publishable Key:", process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

// Khởi tạo client của Convex với URL từ biến môi trường
const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function ConvexProvider({ children }: ConvexProviderProps) {
    return (
        <ClerkProvider
            publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
        >
            <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
                {children}
            </ConvexProviderWithClerk>
        </ClerkProvider>
    );
}
