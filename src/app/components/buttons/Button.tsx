import React from "react";
import { BaseButton } from "./BaseButton";
import { BaseButtonProps } from "./types";

type CommonProps<T extends React.ElementType> = BaseButtonProps & {
  as?: T;
  className?: string;
};

type Props<T extends React.ElementType> = CommonProps<T> &
  React.ComponentPropsWithoutRef<T>;

export const Button = <T extends React.ElementType = "button">({
  as,
  children,
  className,
  ...rest
}: Props<T>) => {
  const Component = as || "button";

  return (
    <Component
      className={className}
      {...(rest as React.ComponentPropsWithoutRef<T>)}
    >
      <BaseButton {...rest}>{children}</BaseButton>
    </Component>
  );
};
