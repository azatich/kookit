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

const SelectLanguage = () => {
    const [locale, setLocale] = useState<string>("");
    const [isLoadingLang, setIsLoadinglang] = useState<boolean>(true);
    const router = useRouter();
    const t = useTranslations('LoginPage');

    useEffect(() => {
        setIsLoadinglang(true)
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
        setIsLoadinglang(false);
    }, [router]);

    const changeLocale = (newLocale: string) => {
        setLocale(newLocale);
        document.cookie = `MYNEXTAPP_LOCALE=${newLocale};`;
        router.refresh();
    };


    return (<DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
                {
                    isLoadingLang ? <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" /> : (<div className="flex items-center gap-2">
                        <ReactCountryFlag
                            countryCode={locale === "en" ? "US" : locale === "ru" ? "RU" : "KZ"}
                            svg
                            style={{ width: "16px", height: "12px" }}
                        />
                        {locale.toUpperCase()}
                    </div>
                    )
                }
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('SelectLanguage')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => changeLocale("en")} className="flex items-center gap-2">
                <ReactCountryFlag countryCode="US" svg style={{ width: "16px", height: "12px" }} />
                English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLocale("ru")} className="flex items-center gap-2">
                <ReactCountryFlag countryCode="RU" svg style={{ width: "16px", height: "12px" }} />
                Русский
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => changeLocale("kz")} className="flex items-center gap-2">
                <ReactCountryFlag countryCode="KZ" svg style={{ width: "16px", height: "12px" }} />
                Қазақша
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>)
}

export default SelectLanguage;