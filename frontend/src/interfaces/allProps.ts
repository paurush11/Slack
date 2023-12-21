export interface LayoutProps extends WrapperProps {
  toggleTheme: () => any;
}
export interface WrapperProps {
  variant?: variantWrapper;
  children: any;
}

export type variantWrapper = "small" | "regular" | "Large";
