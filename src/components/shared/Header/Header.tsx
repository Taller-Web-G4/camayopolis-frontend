import NavBar from "@/components/ui/navBar";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";

export const Header = () => {
    return (
        <NavBar
            logo={<Logo className="h-16 w-auto" />}
            links={[
                { href: '/peliculas', label: 'Películas' },
                { href: '/cinemas', label: 'Cines' },
                { href: '/promociones', label: 'Promociones' },
                { href: '/socio', label: 'Socio' },
                { href: '/dulceria', label: 'Dulcería' },
                { href: '/corporativo', label: 'Corporativo' },
                { href: '/blog', label: 'Blog' },
            ]}
            rightElement={
                <Link href="/auth/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                    Únete
                </Link>
            }
            className="border-b border-gray-200"
            solidOnRoutes={['/peliculas', '/peliculas/[id]', '/auth/login','/auth/register', '/admin/combos', '/admin/peliculas']}
        />
    );
}
