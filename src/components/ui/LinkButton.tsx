import clsx from "clsx";
import Link from "next/link";

interface LinkButtonProps {
    label: string;
    href: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    className?: string;
}


const LinkButton = ({
    label,
    href,
    variant = "primary",
    size = "md",
    leftIcon,
    rightIcon,
    className,
}: LinkButtonProps) => {
    const base =
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-500";

    const variants = {
        primary: "bg-black text-white hover:bg-neutral-800",
        secondary: "bg-white text-black",
        outline: "border border-gray-300 text-gray-900 hover:bg-gray-50",
        ghost: "text-gray-700 hover:bg-gray-100",
    };

    const sizes = {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base px-6 py-2.5",
    };

    return (
        <Link
            href={href}
            className={clsx(base, variants[variant], sizes[size], className)}
        >
            {leftIcon && <span>{leftIcon}</span>}
            <span>{label}</span>
            {rightIcon && <span>{rightIcon}</span>}
        </Link>
    );
}

export default LinkButton