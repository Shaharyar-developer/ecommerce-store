import * as React from "react";

import { cn } from "@/lib/utils";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "./button";

export interface CountrySelectorProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  countries?: { [country: string]: string[] };
  defaultCountry?: string;
}

const CountrySelector = React.forwardRef<
  HTMLSelectElement,
  CountrySelectorProps
>(({ className, countries = {}, defaultCountry, ...props }, ref) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const countryList = Object.keys(countries);

  if (!countryList.length) {
    throw new Error("No countries provided!");
  }

  const filteredCountries = countryList.filter((country) =>
    country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const topMatches = filteredCountries.slice(0, 10);

  return (
    <div className="relative w-full">
      <p className="pb-1  text-sm">Country</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value ? (
              <p className="capitalize">{value}</p>
            ) : (
              "Select Country..."
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent side="top" className="w-full p-0">
          <Command>
            <CommandInput
              onChangeCapture={(e) => setSearchTerm(e.currentTarget.value)}
              placeholder="Search Countries..."
            />
            <CommandEmpty>No country with that name found.</CommandEmpty>
            <CommandGroup>
              {topMatches.map((framework) => (
                <CommandItem
                  key={framework}
                  value={framework}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === framework ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {framework}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
});

CountrySelector.displayName = "CountrySelector";

export { CountrySelector };
