"use client";

import { useState, useEffect, useRef, forwardRef, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Check, ChevronDown } from "lucide-react";

// Helper component to highlight matching text
interface HighlightedTextProps {
  text: string;
  searchTerm: string;
}

const HighlightedText = ({ text, searchTerm }: HighlightedTextProps) => {
  if (!searchTerm.trim()) {
    return <span>{text}</span>;
  }

  // Выделяем только если текст начинается с поискового запроса
  const searchLower = searchTerm.toLowerCase();
  const textLower = text.toLowerCase();
  
  if (textLower.startsWith(searchLower)) {
    const matchLength = searchTerm.length;
    const highlightedPart = text.substring(0, matchLength);
    const remainingPart = text.substring(matchLength);
    
    return (
      <span>
        <span className="bg-yellow-200 dark:bg-yellow-800 font-medium">
          {highlightedPart}
        </span>
        <span>{remainingPart}</span>
      </span>
    );
  }

  // Если не начинается с поискового запроса, возвращаем без выделения
  return <span>{text}</span>;
};

interface AutocompleteInputProps {
  value: string;
  onChange: (value: string) => void;
  suggestions: string[];
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
}

export const AutocompleteInput = forwardRef<HTMLInputElement, AutocompleteInputProps>(
  ({ value, onChange, suggestions, placeholder, className, disabled, isLoading }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Memoize filtered suggestions to prevent unnecessary re-calculations
    // Поскольку сортировка уже происходит на уровне родительского компонента,
    // здесь просто используем переданные suggestions
    const filteredSuggestions = useMemo(() => suggestions, [suggestions]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
          setIsOpen(false);
          setHighlightedIndex(-1);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Handle keyboard navigation
    const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
      if (!isOpen) {
        if ((event.key === "ArrowDown" || event.key === "Enter") && value.trim().length > 0) {
          setIsOpen(true);
          return;
        }
        return;
      }

      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev < filteredSuggestions.length - 1 ? prev + 1 : 0
          );
          break;
        case "ArrowUp":
          event.preventDefault();
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredSuggestions.length - 1
          );
          break;
        case "Enter":
          event.preventDefault();
          if (highlightedIndex >= 0 && highlightedIndex < filteredSuggestions.length) {
            onChange(filteredSuggestions[highlightedIndex]);
            setIsOpen(false);
            setHighlightedIndex(-1);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    }, [isOpen, filteredSuggestions, highlightedIndex, onChange, value]);

    // Scroll highlighted item into view
    useEffect(() => {
      if (highlightedIndex >= 0 && listRef.current) {
        const highlightedElement = listRef.current.children[highlightedIndex] as HTMLElement;
        if (highlightedElement) {
          highlightedElement.scrollIntoView({
            block: "nearest",
            behavior: "smooth"
          });
        }
      }
    }, [highlightedIndex]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);
      
      // Открываем dropdown только если есть введенный текст
      if (newValue.trim().length > 0) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
      setHighlightedIndex(-1);
    }, [onChange]);

    const handleSuggestionClick = useCallback((suggestion: string) => {
      onChange(suggestion);
      setIsOpen(false);
      setHighlightedIndex(-1);
      // Restore focus to input after selection
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }, [onChange]);

    const handleInputFocus = useCallback(() => {
      // Показываем dropdown только если есть введенный текст и есть предложения
      if (value.trim().length > 0 && filteredSuggestions.length > 0) {
        setIsOpen(true);
      }
    }, [value, filteredSuggestions.length]);

    const showDropdown = isOpen && filteredSuggestions.length > 0 && !disabled && value.trim().length > 0;

    return (
      <div ref={containerRef} className="relative w-full">
        <div className="relative">
          <Input
            ref={(el) => {
              inputRef.current = el;
              if (typeof ref === 'function') {
                ref(el);
              } else if (ref) {
                ref.current = el;
              }
            }}
            type="text"
            value={value}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className={cn("pr-8", className)}
            disabled={disabled || isLoading}
            autoComplete="off"
          />
          <ChevronDown 
            className={cn(
              "absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 transition-transform",
              isOpen && "rotate-180"
            )}
          />
          {isLoading && (
            <div className="absolute right-8 top-1/2 -translate-y-1/2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          )}
        </div>

        {showDropdown && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg max-h-60 overflow-auto">
            <ul ref={listRef} className="py-1">
              {filteredSuggestions.map((suggestion, index) => {
                const isHighlighted = index === highlightedIndex;
                const isSelected = value === suggestion;
                
                return (
                  <li
                    key={suggestion}
                    className={cn(
                      "px-3 py-2 cursor-pointer text-sm transition-colors",
                      "hover:bg-gray-100 dark:hover:bg-gray-700",
                      isHighlighted && "bg-gray-100 dark:bg-gray-700",
                      isSelected && "font-medium"
                    )}
                    onClick={() => handleSuggestionClick(suggestion)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    onMouseDown={(e) => {
                      // Prevent input blur when clicking on suggestion
                      e.preventDefault();
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <HighlightedText text={suggestion} searchTerm={value} />
                      {isSelected && (
                        <Check className="h-4 w-4 text-primary" />
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

AutocompleteInput.displayName = "AutocompleteInput";
