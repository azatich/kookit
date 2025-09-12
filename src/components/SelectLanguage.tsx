'use client'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ReactCountryFlag from "react-country-flag"
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface SelectLanguageProps {
    className?: string;
}

const SelectLanguage: React.FC<SelectLanguageProps> = ({ className }) => {
    const [locale, setLocale] = useState<string>("");
    const [isLoadingLang, setIsLoadingLang] = useState<boolean>(true);
    const router = useRouter();
    const t = useTranslations('LoginPage');

    useEffect(() => {
        setIsLoadingLang(true);
        const cookieLocale = document.cookie
            .split("; ")
            .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
            ?.split("=")[1];
        if (cookieLocale) {
            setLocale(cookieLocale);
        } else {
            const browserLocale = navigator.language.slice(0, 2);
            setLocale(browserLocale);
            document.cookie = `MYNEXTAPP_LOCALE=${browserLocale};`;
            router.refresh();
        }
        setIsLoadingLang(false);
    }, [router]);

    const changeLocale = (newLocale: string) => {
        setLocale(newLocale);
        document.cookie = `MYNEXTAPP_LOCALE=${newLocale};`;
        router.refresh();
    };


    const flagStyle: React.CSSProperties = {
        width: "18px",
        height: "14px"
    };

    const menuFlagStyle: React.CSSProperties = {
        width: "20px",
        height: "15px"
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-2 border-2 border-gray-300 hover:border-[#FF7A00] hover:bg-[#FF7A00]/10 transition-all duration-300 rounded-xl px-3 py-2 font-medium ${className || ''}`}
                >
                    {isLoadingLang ? (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" />
                    ) : (
                        <div className="flex items-center gap-2">
                            <ReactCountryFlag
                                countryCode={locale === "en" ? "US" : locale === "ru" ? "RU" : "KZ"}
                                svg
                                style={flagStyle}
                            />
                            <span className="text-gray-700 font-semibold">{locale.toUpperCase()}</span>
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-48 rounded-xl border-0 shadow-xl bg-white/95 backdrop-blur-sm p-2"
            >
                <DropdownMenuLabel className="text-gray-600 font-semibold px-3 py-2">
                    {t('SelectLanguage')}
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem
                    onClick={() => changeLocale("en")}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#FF7A00]/10 hover:text-[#FF7A00] transition-all duration-200 cursor-pointer"
                >
                    <ReactCountryFlag countryCode="US" svg style={menuFlagStyle} />
                    <span className="font-medium">English</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => changeLocale("ru")}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#FF7A00]/10 hover:text-[#FF7A00] transition-all duration-200 cursor-pointer"
                >
                    <ReactCountryFlag countryCode="RU" svg style={menuFlagStyle} />
                    <span className="font-medium">Русский</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onClick={() => changeLocale("kz")}
                    className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-[#FF7A00]/10 hover:text-[#FF7A00] transition-all duration-200 cursor-pointer"
                >
                    <ReactCountryFlag countryCode="KZ" svg style={menuFlagStyle} />
                    <span className="font-medium">Қазақша</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default SelectLanguage;