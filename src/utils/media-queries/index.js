import { useMediaQuery } from "react-responsive";

export const useDesktop = () => useMediaQuery({ minWidth: 992 });
export const useTablet = () => useMediaQuery({ minWidth: 768, maxWidth: 991 });
export const useMobile = () => useMediaQuery({ maxWidth: 767 });
export const useNotMobile = () => useMediaQuery({ minWidth: 768 });

export const DesktopLayout = ({ children }) => useDesktop() ? children : null;
export const TabletLayout = ({ children }) => useTablet() ? children : null;
export const MobileLayout = ({ children }) => useMobile() ? children : null;
export const NonMobileLayout = ({ children }) => useNotMobile() ? children : null;
