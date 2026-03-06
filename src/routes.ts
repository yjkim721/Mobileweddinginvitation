import { createBrowserRouter } from "react-router";
import PageFlipInvitation from "./components/invitation/PageFlipInvitation";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: PageFlipInvitation,
    ErrorBoundary: PageFlipInvitation,
  },
  {
    path: "/invitation",
    Component: PageFlipInvitation,
    ErrorBoundary: PageFlipInvitation,
  },
  {
    path: "*",
    Component: PageFlipInvitation,
  },
]);
