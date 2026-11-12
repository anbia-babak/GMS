
import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

function CustomSelect({
    id,
    value,
    onChange,
    options,
    placeholder = "Select an option",
    disabled = false,
    className = "",
}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleOutsideClick(event) {
            if (!dropdownRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleOutsideClick);

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const selectedOption = options.find(
        (option) => String(option.value) === String(value)
    );

    return (
        <div ref={dropdownRef} className="relative w-full">
            <button
                id={id}
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((previous) => !previous)}
                className={`${className} flex items-center justify-between text-left disabled:cursor-not-allowed disabled:opacity-50`}
            >
                <span className={!selectedOption ? "opacity-60" : ""}>
                    {selectedOption?.label || placeholder}
                </span>

                <ChevronDown
                    size={18}
                    className={`shrink-0 transition-transform ${
                        isOpen ? "rotate-180" : ""
                    }`}
                />
            </button>

            {isOpen && !disabled && (
                <div
                    role="listbox"
                    className="absolute left-0 top-full z-[100] mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-[#8EB69B]/40 bg-[#0B2B26] py-1 shadow-xl dark:border-gray-300 dark:bg-white"
                >
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            role="option"
                            aria-selected={String(option.value) === String(value)}
                            onClick={() => {
                                onChange(option.value);
                                setIsOpen(false);
                            }}
                            className={`w-full px-3 py-2 text-left text-sm transition
                                ${
                                    String(option.value) === String(value)
                                        ? "bg-[#235347] text-[#DAF1DE] dark:bg-gray-200 dark:text-gray-900"
                                        : "text-[#DAF1DE] hover:bg-[#163832] dark:text-gray-900 dark:hover:bg-gray-100"
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default CustomSelect;
