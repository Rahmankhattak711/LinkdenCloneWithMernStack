import React, {
    ButtonHTMLAttributes,
    AnchorHTMLAttributes,
    ElementType,
  } from "react";
  import { BaseButton } from "./BaseButton";
  import Link, { LinkProps } from "next/link";
import { BaseButtonProps } from "./types";
  
  type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
  type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
  
  type CommonProps<T extends ElementType> = BaseButtonProps & {
    as?: T;
    className?: string;
  };
  
  type Props<T extends ElementType> = CommonProps<T> &
    (T extends "button"
      ? ButtonProps
      : T extends "a"
      ? AnchorProps
      : T extends typeof Link
      ? LinkProps
      : {});
  
  export const Button = <T extends ElementType = "button">({
    as,
    children,
    className,
    ...rest
  }: Props<T> & { as?: T }) => {
    const Component = as || "button";
  
    return (
      <Component className={`${className}`} {...(rest as any)}>
        <BaseButton {...rest}>
          {children}
        </BaseButton>
      </Component>
    );
  };