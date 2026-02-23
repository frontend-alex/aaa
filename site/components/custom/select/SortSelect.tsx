import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectSeparator,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTranslate } from "@/hooks/useTranslate";

interface SortDropdownProps {
    className?: string;
    options?: string[];
    value?: string;
    onChange?: (value: string) => void;
}

function SortSelect({
    className,
    options = [],
    value,
    onChange
}: SortDropdownProps) {
    const { t } = useTranslate();

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger
                className="no-ring w-fit border-none shadow-none p-0 h-auto gap-1 focus:ring-0 bg-transparent group"
            >
                <span className="uppercase text-sm font-semibold flex items-center gap-1">
                    (<SelectValue className="p-0 m-0" placeholder={t("works.sort") || "Sort"} />)
                </span>
            </SelectTrigger>

            <SelectContent className={cn("w-56 rounded-none shadow-none border-none", className)}>
                <SelectGroup>
                    <SelectLabel>({t("works.category") || "Category"})</SelectLabel>
                    <SelectSeparator />
                    {options.map((option) => (
                        <SelectItem key={option} value={option}>
                            {t(`project.category.${option}` as any) || option}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>

    );
}

export { SortSelect };