import clsx from "clsx";

interface ButtonProps {
    label?: string;
    className?: string;
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
}

const Button = ({
    label,
    onClick,
    type = "button",
    variant = "primary",
    size = "md",
    disabled = false,
    loading = false,
    fullWidth = false,
    leftIcon,
    rightIcon,
    className,
}: ButtonProps) => {

    const baseStyles =
        "inline-flex items-center justify-center gap-2 rounded-xl transition-all duration-500 focus:outline-none";

    const variants = {
        primary:
            "bg-black text-white hover:bg-neutral-800 active:scale-[0.98]",
        secondary:
            "bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-[0.98]",
        outline:
            "border border-gray-300 text-gray-900 hover:bg-gray-50",
        ghost:
            "text-gray-700 hover:bg-gray-100",
    };

    const sizes = {
        sm: "text-xs px-3 py-1.5",
        md: "text-sm px-4 py-2",
        lg: "text-base px-5 py-2.5",
    };

    const disabledStyles =
        "opacity-50 cursor-not-allowed pointer-events-none";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={clsx(
                baseStyles,
                variants[variant],
                sizes[size],
                fullWidth && "w-full",
                (disabled || loading) && disabledStyles,
                className
            )}
        >
            {/* Left Icon */}
            {!loading && leftIcon && <span className="flex items-center">{leftIcon}</span>}

            {/* Loader OR Label */}
            {loading ? (
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
                label && <span>{label}</span>
            )}

            {/* Right Icon */}
            {!loading && rightIcon && <span className="flex items-center">{rightIcon}</span>}
        </button>
    )
}

export default Button