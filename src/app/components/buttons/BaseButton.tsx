import React from "react";
import classNames from "classnames";
import { BaseButtonProps } from "./types";

export const BaseButton: React.FC<BaseButtonProps> = ({
  variant = "outline",
  size = "md",
  width = "auto",
  textColor = "",
  iconClassName = "",
  bgColor = "", 
  ...props
}) => {
  const baseClasses = classNames({
    "font-medium flex items-center justify-center gap-2": true,
  });

  const sizeClassesWithoutChildren = {
    lg: "px-2 py-2 text-lg",
    md: "px-2 py-2 text-base",
    sm: "px-2 py-1 text-sm",
    xs: "px-2 py-1 text-xs",
  };

  const sizeClassesWithChildren = {
    lg: "px-6 py-2 text-lg",
    md: "px-4 py-2 text-sm",
    sm: "px-3 py-1 text-sm",
    xs: "px-1 py-1 text-xs",
  };

  const variantClasses = {
    outline: `border-2 border-[#388FE9] text-[#388FE9] rounded-full ${textColor} ${width}`,
    secondary: `bg-gray-600 text-white rounded-full ${textColor} ${width}`,
  };

  const sizeClasses = props.children
    ? sizeClassesWithChildren
    : sizeClassesWithoutChildren;

  const classes = classNames(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    bgColor 
  );

  return (
    <span className={classes}>
      {props.icon && <props.icon className={iconClassName} />}
      {props.children && <span>{props.children}</span>}
    </span>
  );
};