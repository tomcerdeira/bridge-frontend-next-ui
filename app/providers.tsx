"use client";

import { AuthProvider } from "@/src/context/AuthContext";
import ToastProvider from "@/src/providers/toast.provider";
import { NextUIProvider } from "@nextui-org/system";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import * as React from "react";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
}

export function Providers({ children, themeProps }: ProvidersProps) {
	return (
		<NextUIProvider>
			<NextThemesProvider {...themeProps}>
				<ToastProvider>
					<AuthProvider>
						{children}
					</AuthProvider>
				</ToastProvider>
			</NextThemesProvider>
		</NextUIProvider>
	);
}
