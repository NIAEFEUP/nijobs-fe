import useMediaQuery from "@material-ui/core/useMediaQuery";

export const useDesktop = () => useMediaQuery((theme) => theme.breakpoints.up("md"));
export const useTablet = () => useMediaQuery((theme) => theme.breakpoints.only("sm"));
export const useMobile = () => useMediaQuery((theme) => theme.breakpoints.only("xs"));
export const useNotMobile = () => useMediaQuery((theme) => theme.breakpoints.up("sm"));

export const DesktopLayout = ({ children }) => useDesktop() ? children : null;
export const TabletLayout = ({ children }) => useTablet() ? children : null;
export const MobileLayout = ({ children }) => useMobile() ? children : null;
export const NonMobileLayout = ({ children }) => useNotMobile() ? children : null;
