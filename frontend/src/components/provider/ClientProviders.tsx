"use client";

import { Provider } from "react-redux";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "@/components/layout/Navbar";
import { store } from "../../../store/store";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <Navbar />
        <div className="w-6xl m-auto">{children}</div>
      </ThemeProvider>
    </Provider>
  );
}
