"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import cn from "@/utilities/cn";
import SpinAnim from "../animation/SpinAnim";
import { useFormStatus } from "react-dom";
import { Squircle } from "corner-smoothing";

const PlusIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 5V19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const EditIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 5L19 12L12 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Button = ({
  children,
  variant = "primary",
  disabled = false,
  icon,
  iconPosition = "left",
  rightIcon,
  fullWidth = false,
  className = "",
  href,
  target,
  rel,
  onClick,
  type = "button",
  isProcessing = false,
  plus = false,
  ...props
}) => {
  const { pending } = useFormStatus();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const disabledClasses = "opacity-90 cursor-not-allowed";

  // Keep all your existing classes
  const baseClasses = `${isProcessing ? "relative pointer-events-none" : ""} ${
    disabled ? disabledClasses : ""
  } duration-300 cursor-pointer w-fit min-w-fit gap-2 flex items-center justify-center font-medium px-4 2xl:px-5 font-16 py-2.5 2xl:py-3 text-center transition-colors focus:outline-none ${
    !isHydrated ? "rounded-xl" : ""
  }`;

  const variantClasses = {
    primary:
      "bg-primary-dark text-white hover:bg-white hover:text-primary-dark focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
    stroke:
      "bg-white text-gray-700 hover:bg-primary-dark hover:text-white focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2",
    ghost: "bg-transparent text-gray-400 hover:text-gray-600 hover:bg-gray-50",
    "stroke-icon":
      "bg-white text-gray-700 hover:bg-gray-50 focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2",
    edit: "bg-white text-primary-dark hover:bg-gray-50 focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
  };

  const buttonClasses = cn(
    baseClasses,
    variantClasses[variant],
    fullWidth ? "w-full" : "",
    className
  );

  // Determine if this variant needs a border
  const needsBorder =
    ["stroke", "stroke-icon", "edit"].includes(variant) && !disabled;

  let displayIcon = icon;

  if (plus) {
    if (
      variant === "stroke" ||
      variant === "stroke-icon" ||
      (variant === "primary" && iconPosition === "left")
    ) {
      displayIcon = <PlusIcon className={cn("h-4 w-4")} />;
    } else if (variant === "edit") {
      displayIcon = <EditIcon className="h-4 w-4" />;
    }
  }

  const content = (
    <>
      {displayIcon && iconPosition === "left" && displayIcon}
      {children}
      {displayIcon && iconPosition === "right" && displayIcon}
      {rightIcon ||
        (variant === "stroke" && iconPosition === "right" && (
          <ArrowRightIcon className="ml-2 h-4 w-4" />
        ))}
    </>
  );

  const finalRel = target === "_blank" ? "noopener noreferrer" : rel;

  // For variants with border
  if (needsBorder) {
    const renderBorderedButton = (Element, additionalProps = {}) => (
      <div className="relative inline-block">
        {/* Border Squircle (slightly larger) */}
        <Squircle
          cornerRadius={12}
          cornerSmoothing={0.8}
          className={`${
            !isHydrated ? "rounded-xl" : ""
          } absolute inset-0 bg-gray-300`} // Border color from your original styling
        />

        {/* Content Squircle (slightly smaller) */}
        <Squircle
          as={Element}
          cornerRadius={11.5}
          cornerSmoothing={0.8}
          className={cn(buttonClasses, "relative m-px")} // m-px gives 1px margin
          {...additionalProps}
          {...props}
        >
          <span
            className={`flex items-center gap-2 ${
              pending || isProcessing
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
          >
            {content}
          </span>
          {(pending || isProcessing) && (
            <SpinAnim className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </Squircle>
      </div>
    );

    if (href && !disabled) {
      if (href.startsWith("/") || href.startsWith("#")) {
        return renderBorderedButton(Link, { href, target, rel: finalRel });
      }
      return renderBorderedButton("a", { href, target, rel: finalRel });
    }
    return renderBorderedButton("button", { type, onClick, disabled });
  }

  // For variants without border (your original implementation)
  if (href && !disabled) {
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <div className="relative inline-block">
          <Squircle
            cornerRadius={12}
            cornerSmoothing={0.8}
            className={`${
              !isHydrated ? "rounded-xl" : ""
            } absolute inset-0 bg-gray-300`} // Border color from your original styling
          />
          <Squircle
            cornerRadius={11.5}
            cornerSmoothing={0.8}
            as={Link}
            href={href}
            className={cn(buttonClasses, "relative m-px")} // m-px gives 1px margin
            target={target}
            rel={finalRel}
            {...props}
          >
            <span
              className={`flex items-center gap-2 ${
                pending || isProcessing
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              {content}
            </span>
            {(pending || isProcessing) && (
              <SpinAnim className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
            )}
          </Squircle>
        </div>
      );
    }

    return (
      <div className="relative inline-block">
        <Squircle
          cornerRadius={11.5}
          cornerSmoothing={0.8}
          className={`${
            !isHydrated ? "rounded-xl" : ""
          } absolute inset-0 bg-gray-300`} // Border color from your original styling
        />
        <Squircle
          cornerRadius={12}
          cornerSmoothing={0.8}
          as={"a"}
          href={href}
          className={cn(buttonClasses, "relative m-px")} // m-px gives 1px margin
          target={target}
          rel={finalRel}
          {...props}
        >
          <span
            className={`flex items-center gap-2 ${
              pending || isProcessing
                ? "opacity-0 pointer-events-none"
                : "opacity-100"
            }`}
          >
            {content}
          </span>
          {(pending || isProcessing) && (
            <SpinAnim className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
        </Squircle>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <Squircle
        cornerRadius={12}
        cornerSmoothing={0.8}
        className={`${
          !isHydrated ? "rounded-xl" : ""
        } absolute inset-0 bg-gray-300`} // Border color from your original styling
      />
      <Squircle
        cornerRadius={11.5}
        cornerSmoothing={0.8}
        className={cn(buttonClasses, "relative m-px")} // m-px gives 1px margin
        disabled={disabled}
        type={type}
        onClick={onClick}
        as="button"
        {...props}
      >
        <span
          className={`flex items-center gap-2 ${
            pending || isProcessing
              ? "opacity-0 pointer-events-none"
              : "opacity-100"
          }`}
        >
          {content}
        </span>
        {(pending || isProcessing) && (
          <SpinAnim className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        )}
      </Squircle>
    </div>
  );
};

export const IconButton = ({
  icon,
  variant = "primary",
  disabled = false,
  className = "",
  href,
  target,
  rel,
  onClick,
  type = "button",
  ...props
}) => {
  const { pending } = useFormStatus();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const disabledClasses = "opacity-50 cursor-not-allowed";

  // Base classes for all icon buttons
  const baseClasses = `${
    disabled ? disabledClasses : ""
  } cursor-pointer flex items-center gap-2 justify-center p-2 2xl:p-2.5 transition-colors focus:outline-none ${
    !isHydrated ? "rounded-xl" : ""
  }`;

  // Classes for different button variants
  const variantClasses = {
    primary:
      "bg-primary-dark text-white hover:bg-white hover:text-primary-dark focus:ring-2 focus:ring-gray-400 focus:ring-offset-2",
    danger:
      "bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-500 focus:ring-offset-2",
    stroke:
      "bg-white text-gray-700 hover:bg-primary-dark hover:text-white focus:ring-2 focus:ring-gray-500/50 focus:ring-offset-2",
    ghost: "bg-transparent text-gray-400 hover:text-gray-600",
  };

  // Classes for disabled state

  // Combined classes based on props
  const buttonClasses = cn(baseClasses, variantClasses[variant], className);

  // Determine if this variant needs a border
  const needsBorder = variant === "stroke" && !disabled;

  // Set correct rel attribute for external links that open in new tab
  const finalRel = target === "_blank" ? "noopener noreferrer" : rel;

  // For variants with border
  if (needsBorder) {
    const renderBorderedIconButton = (Element, additionalProps = {}) => (
      <div className="relative inline-block">
        {/* Border Squircle (slightly larger) */}
        <Squircle
          cornerRadius={8}
          cornerSmoothing={0.8}
          className={`${
            !isHydrated ? "rounded-xl" : ""
          } absolute inset-0 bg-gray-300 rounded-lg`} // Border color from your original styling
        />

        {/* Content Squircle (slightly smaller) */}
        <Squircle
          as={Element}
          cornerRadius={7.5}
          cornerSmoothing={0.8}
          className={cn(buttonClasses, "relative m-px")} // m-px gives 1px margin
          {...additionalProps}
          {...props}
        >
          {icon}
        </Squircle>
      </div>
    );

    if (href && !disabled) {
      if (href.startsWith("/") || href.startsWith("#")) {
        return renderBorderedIconButton(Link, { href, target, rel: finalRel });
      }
      return renderBorderedIconButton("a", { href, target, rel: finalRel });
    }
    return renderBorderedIconButton("button", { type, onClick, disabled });
  }

  // For variants without border, use standard Squircle
  if (href && !disabled) {
    if (href.startsWith("/") || href.startsWith("#")) {
      return (
        <div className="relative inline-block">
          <Squircle
            cornerRadius={8}
            cornerSmoothing={0.8}
            className={`${
              !isHydrated ? "rounded-xl" : ""
            } absolute inset-0 bg-gray-300`} // Border color from your original styling
          />
          <Squircle
            as={Link}
            href={href}
            cornerRadius={7.5}
            cornerSmoothing={0.8}
            className={cn(buttonClasses, "relative m-px")} // m-px gives 1px margin
            target={target}
            rel={finalRel}
            {...props}
          >
            {icon}
          </Squircle>
        </div>
      );
    }

    return (
      <div className="relative inline-block">
        <Squircle
          cornerRadius={8}
          cornerSmoothing={0.8}
          className={`${
            !isHydrated ? "rounded-xl" : ""
          } absolute inset-0 bg-gray-300`} // Border color from your original styling
        />
        <Squircle
          as="a"
          href={href}
          cornerRadius={7.5}
          cornerSmoothing={0.8}
          className={cn(buttonClasses, "relative m-px")} // m-px gives 1px margin
          target={target}
          rel={finalRel}
          {...props}
        >
          {icon}
        </Squircle>
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <Squircle
        cornerRadius={8}
        cornerSmoothing={0.8}
        className={`${
          !isHydrated ? "rounded-xl" : ""
        } absolute inset-0 bg-gray-300`} // Border color from your original styling
      />
      <Squircle
        as="button"
        cornerRadius={7.5}
        cornerSmoothing={0.8}
        className={cn(buttonClasses, "relative m-px")} // m-px gives 1px margin
        disabled={disabled}
        type={type}
        onClick={onClick}
        {...props}
      >
        {icon}
      </Squircle>
    </div>
  );
};

export const ButtonGroup = ({
  children,
  orientation = "horizontal",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const groupClasses = cn(
    "flex",
    orientation === "horizontal" ? "flex-row" : "flex-col",
    fullWidth ? "w-full" : "",
    className
  );

  return (
    <div className={groupClasses} {...props}>
      {React.Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) return child;

        // Apply specific styling for buttons in a group
        return React.cloneElement(child, {
          className: cn(
            child.props.className,
            orientation === "horizontal"
              ? index === 0
                ? "rounded-r-none border-r-0"
                : index === React.Children.count(children) - 1
                ? "rounded-l-none"
                : "rounded-none border-r-0"
              : index === 0
              ? "rounded-b-none border-b-0"
              : index === React.Children.count(children) - 1
              ? "rounded-t-none"
              : "rounded-none border-b-0",
            fullWidth && "flex-1"
          ),
        });
      })}
    </div>
  );
};

export default Button;
