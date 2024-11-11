export interface BaseButtonProps {
    variant?: "outline" ;
    size?: "lg" | "md" | "sm" | "xs";
    icon?: React.FC<React.SVGProps<SVGSVGElement>>;
    width?: string;
    children?: React.ReactNode;
    textColor?: string;
    iconClassName?: string;
    bgColor?: string;
}