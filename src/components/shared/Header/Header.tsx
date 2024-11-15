'use client';

import React from "react";
import NavBar from "@/components/ui/navBar";
import Link from "next/link";
import { Logo } from "@/components/shared/Logo";
import { useUser } from "@/context/UserContext";

export const Header = () => {
    const { user } = useUser();

    // Creamos el array de links de forma condicional
    const links = [
        { href: '/peliculas', label: 'Películas' },
        { href: '/cinemas', label: 'Cines' },
        { href: '/promociones', label: 'Promociones' },
        { href: '/socio', label: 'Socio' },
        { href: '/dulceria', label: 'Dulcería' },
        { href: '/corporativo', label: 'Corporativo' },
        { href: '/blog', label: 'Blog' },
        // Solo agregamos el enlace de Admin si el usuario tiene el rol de "ROLE_ADMIN"
        ...(user.role === "ROLE_ADMIN"
            ? [{
                href: "#",
                label: "Admin",
                isDropdown: true,
                subLinks: [
                    { href: '/admin/combos', label: 'Combos' },
                    { href: '/admin/peliculas', label: 'Películas' },
                ]
            }]
            : []),
    ];

    return (
        <NavBar
            logo={<Logo />}
            links={links}
            rightElement={user.email ? (
                <span className="text-base font-semibold text-gray-900">{user.email}</span>
            ) : (
                <Link href="/auth/login" className="text-base font-semibold text-[#0D1F40]">Login</Link>
            )}
            className="border-b border-gray-200"
            solidOnRoutes={['/peliculas', '/peliculas/[id]', '/auth/login', '/auth/register', '/admin', '/admin/[...slug]']}
        />
    );
};
