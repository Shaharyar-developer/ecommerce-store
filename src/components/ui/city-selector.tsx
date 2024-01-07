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

import { countries } from "@/lib/countries.min";

export interface CitySelectorProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  setCity: (city: string) => void;
  country: string;
}

const CitySelector = React.forwardRef<HTMLSelectElement, CitySelectorProps>(
  ({ className, country, setCity, ...props }, ref) => {
    const [searchTerm, setSearchTerm] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState("");

    const cityList = countries[country] || [];
    if (!cityList) {
      throw new Error("No cities provided!");
    }

    const filteredCities = cityList.filter((city) =>
      city.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div className="relative w-full">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              disabled={country === ""}
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value ? <p className="capitalize">{value}</p> : "Select City..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="top" className="w-full p-0">
            <Command className="max-h-[200px]">
              <CommandInput
                onChangeCapture={(e) => setSearchTerm(e.currentTarget.value)}
                placeholder="Search For More Cities..."
              />
              <CommandEmpty>No city with that name found.</CommandEmpty>
              <CommandGroup className=" overflow-y-scroll ">
                {filteredCities.map((city) => (
                  <CommandItem
                    key={city}
                    value={city}
                    onSelect={(currentValue) => {
                      setValue(currentValue);
                      setCity(
                        currentValue.charAt(0).toUpperCase() +
                          currentValue.slice(1)
                      );
                      console.log(
                        currentValue.charAt(0).toUpperCase() +
                          currentValue.slice(1)
                      );

                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === city ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {city}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    );
  }
);

CitySelector.displayName = "CitySelector";

export { CitySelector };
