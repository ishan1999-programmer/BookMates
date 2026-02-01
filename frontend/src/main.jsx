import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./app/App";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider} from "@/components/ui/sidebar";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <SidebarProvider>
        <App />
    </SidebarProvider>

    <Toaster />
  </BrowserRouter>
);
