import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function IconBase({ size = 20, children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      height={size}
      viewBox="0 0 24 24"
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {children}
    </svg>
  );
}

export const SearchIcon = (props: IconProps) => (
  <IconBase {...props}><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.7"/><path d="m16 16 4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7"/></IconBase>
);
export const BagIcon = (props: IconProps) => (
  <IconBase {...props}><path d="M5.5 8.5h13l-1 11h-11l-1-11Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7"/><path d="M9 9V7a3 3 0 0 1 6 0v2" stroke="currentColor" strokeWidth="1.7"/></IconBase>
);
export const UserIcon = (props: IconProps) => (
  <IconBase {...props}><circle cx="12" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.7"/><path d="M5.5 19c.7-3.2 3-5 6.5-5s5.8 1.8 6.5 5" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7"/></IconBase>
);
export const HeartIcon = (props: IconProps) => (
  <IconBase {...props}><path d="M20 8.7c0 4.8-8 10-8 10s-8-5.2-8-10A4.4 4.4 0 0 1 12 6a4.4 4.4 0 0 1 8 2.7Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7"/></IconBase>
);
export const ArrowIcon = (props: IconProps) => (
  <IconBase {...props}><path d="M5 12h14M14 7l5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7"/></IconBase>
);
export const StarIcon = (props: IconProps) => (
  <IconBase {...props}><path d="m12 3 2.6 5.4 5.9.8-4.3 4.2 1 5.9-5.2-2.8-5.2 2.8 1-5.9-4.3-4.2 5.9-.8L12 3Z" fill="currentColor" stroke="currentColor" strokeLinejoin="round"/></IconBase>
);
export const TruckIcon = (props: IconProps) => (
  <IconBase {...props}><path d="M3.5 6.5h11v10h-11zM14.5 10h3l3 3v3.5h-6z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7"/><circle cx="7" cy="18" r="1.5" fill="white" stroke="currentColor" strokeWidth="1.5"/><circle cx="17.5" cy="18" r="1.5" fill="white" stroke="currentColor" strokeWidth="1.5"/></IconBase>
);
export const ShieldIcon = (props: IconProps) => (
  <IconBase {...props}><path d="M12 3.5 19 6v5.2c0 4.2-2.8 7.4-7 9.3-4.2-1.9-7-5.1-7-9.3V6l7-2.5Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="1.7"/><path d="m9 12 2 2 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7"/></IconBase>
);
export const MinusIcon = (props: IconProps) => <IconBase {...props}><path d="M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7"/></IconBase>;
export const PlusIcon = (props: IconProps) => <IconBase {...props}><path d="M12 5v14M5 12h14" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7"/></IconBase>;
export const TrashIcon = (props: IconProps) => (
  <IconBase {...props}><path d="M5 7h14M9 4h6l1 3H8l1-3ZM7 7l1 13h8l1-13" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7"/></IconBase>
);
export const CheckIcon = (props: IconProps) => <IconBase {...props}><path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8"/></IconBase>;
export const MenuIcon = (props: IconProps) => <IconBase {...props}><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7"/></IconBase>;
export const CloseIcon = (props: IconProps) => <IconBase {...props}><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7"/></IconBase>;
