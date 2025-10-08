import React, { useState, createContext, useContext } from "react";

const TabsContext = createContext();

/* Tabs Root */
export const Tabs = ({
  defaultValue,
  value,
  onValueChange,
  children,
  className = "",
  orientation = "horizontal",
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = value !== undefined;
  const currentValue = isControlled ? value : internalValue;

  const handleValueChange = (newValue) => {
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (onValueChange) {
      onValueChange(newValue);
    }
  };

  return (
    <TabsContext.Provider
      value={{
        value: currentValue,
        onValueChange: handleValueChange,
        orientation,
      }}
    >
      <div className={`w-full ${className}`} data-orientation={orientation}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/* Tabs List */
export const TabsList = ({ children, className = "" }) => {
  const { orientation } = useContext(TabsContext);

  return (
    <div
      className={`
        flex items-center justify-start bg-transparent gap-0
        ${orientation === "vertical" ? "flex-col h-auto w-auto" : ""}
        ${className}
      `}
      role="tablist"
      aria-orientation={orientation}
    >
      {children}
    </div>
  );
};

/* Tabs Trigger */
export const TabsTrigger = ({ value, children, className = "", disabled = false }) => {
  const { value: selectedValue, onValueChange } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  return (
    <div
      className={`
        border-2 rounded-t-2xl 
        ${
          isSelected
            ? "border-inputColor border-b-0 bg-white z-10"
            : "border-transparent border-b-inputColor"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
        first:rounded-tl-lg last:rounded-tr-lg
      `}
    >
      <button
        className={`
          inline-flex items-center justify-center whitespace-nowrap px-4 py-3
          text-sm font-medium transition-all duration-200 relative
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 
          focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
          ${
            isSelected
              ? "bg-primary text-white m-3 rounded-xl"
              : "bg-backgroundFill text-color1 m-3 rounded-xl"
          }
          ${className}
        `}
        role="tab"
        aria-selected={isSelected}
        aria-controls={`panel-${value}`}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={() => !disabled && onValueChange(value)}
      >
        {children}
      </button>
    </div>
  );
};

/* Tabs Content */
export const TabsContent = ({ value, children, className = "" }) => {
  const { value: selectedValue } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  if (!isSelected) return null;

  return (
    <div
      className={`bg-white rounded-b-lg
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 
        ${className}
      `}
      role="tabpanel"
      id={`panel-${value}`}
      tabIndex={0}
    >
      {children}
    </div>
  );
};
