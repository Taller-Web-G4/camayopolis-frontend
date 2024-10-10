'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

export interface NavBarProps {
    logo?: React.ReactNode;
    links?: { href: string; label: string }[];
    rightElement?: React.ReactNode;
    className?: string;
    solidOnRoutes?: string[];
}

const NavBar: React.FC<NavBarProps> = ({ logo, links = [], rightElement, className, solidOnRoutes = [] }: NavBarProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname: string = usePathname();

    const isSolid = solidOnRoutes.some((route) => {
        const regex = new RegExp(`^${route.replace('[id]', '\\d+')}$`);
        return regex.test(pathname);
    });

    useEffect((): (() => void) => {
        const threshold: number = window.innerHeight * 0.65;

        const handleScroll = (): void => {
            setIsScrolled(window.scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll);
        return (): void => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMenu = (): void => {
        setIsMenuOpen((prev: boolean): boolean => !prev);
    };

    const renderLogo = () => (
        <div className="flex items-center justify-center flex-grow lg:flex-none">
            {logo ? (
                <Link href="/" className="block">
                    {React.cloneElement(logo as React.ReactElement, {
                        className: `h-10 w-auto ${isScrolled || isSolid ? 'text-[#0D1F40]' : 'text-white'}`
                    })}
                </Link>
            ) : (
                <Link href="/" className={`text-xl font-bold ${isScrolled || isSolid ? 'text-[#0D1F40]' : 'text-white'}`}>
                    Brand
                </Link>
            )}
        </div>
    );

    const renderLinks = () => (
        <div className="hidden lg:flex items-center gap-x-10 flex-grow justify-center">
            {links.map((link) => (
                <Link
                    key={link.href}
                    href={link.href}
                    className={`py-6 items-center text-lg font-light border-b-4 border-transparent ${
                        isScrolled || isSolid ? 'text-[#0D1F40] hover:text-blue-950' : 'text-[#DEDFE3] hover:text-white'
                    } hover:border-b-rose-600`}
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );

    const renderMobileMenu = () =>
        isMenuOpen && (
            <>
                {/* Fondo del menú móvil */}
                <button
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={toggleMenu}
                    aria-label="Close menu"
                />
                {/* Contenedor del menú móvil */}
                <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-md p-6 z-50">
                    <button onClick={toggleMenu} className="text-[#0D1F40] hover:text-blue-950 mb-6">
                        Close
                    </button>
                    <div className="flex flex-col items-start gap-y-4">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="w-full text-lg font-light text-[#0D1F40] hover:text-blue-950 px-4 py-2 block"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {rightElement && <div className="w-full px-4 py-2">{rightElement}</div>}
                    </div>
                </div>
            </>
        );

    return (
        <nav
            className={`transition-colors duration-300 ${
                isSolid ? 'relative w-full z-10 bg-white shadow-md' : 'fixed w-full top-0 left-0 z-50'
            } ${isScrolled && !isSolid ? 'bg-white shadow-md' : 'bg-transparent'} ${className}`}
            style={{
                position: isSolid ? 'relative' : 'fixed',
                top: '0',
                zIndex: isSolid ? 10 : 50
            }}
        >
            <div className="flex items-center justify-between px-6 lg:px-14">
                <div className="lg:hidden flex items-center">
                    <button onClick={toggleMenu} className={`p-6 ${isScrolled || isSolid ? 'text-[#0D1F40]' : 'text-white'}`}>
                        <Menu size={24} />
                    </button>
                </div>
                {renderLogo()}
                {renderLinks()}
                {rightElement && (
                    <div className={`hidden lg:flex items-center justify-end ${isScrolled || isSolid ? 'text-[#0D1F40]' : 'text-white'}`}>
                        {rightElement}
                    </div>
                )}
            </div>
            {renderMobileMenu()}
        </nav>
    );
};

export default NavBar;
