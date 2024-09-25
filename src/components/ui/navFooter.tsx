import React, { ReactNode } from 'react';
import Link from 'next/link';

export interface FooterSection {
    title: string;
    links: { href: string; label: string }[];
}

export interface FooterProps {
    sections: FooterSection[];
    bottomText?: ReactNode;
    socialLinks?: ReactNode;
    className?: string;
}

const NavFooter: React.FC<FooterProps> = ({ sections, bottomText, socialLinks, className }) => {
    return (
        <footer className={`bg-blue-950 text-white py-10 ${className}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {sections.map((section, index) => (
                    <div key={index}>
                        <h4 className="text-lg font-semibold mb-4">{section.title}</h4>
                        <ul className="space-y-2">
                            {section.links.map((link, idx) => (
                                <li key={idx}>
                                    <Link href={link.href} className="hover:underline">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            <div className="mt-8 border-t border-gray-700 pt-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    {socialLinks && <div className="mb-4 md:mb-0">{socialLinks}</div>}
                    {bottomText && <div className="text-sm text-center md:text-right">{bottomText}</div>}
                </div>
            </div>
        </footer>
    );
};

export default NavFooter;