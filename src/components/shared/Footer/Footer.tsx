import Link from "next/link";
import NavFooter from '@/components/ui/navFooter';

export const Footer = () => {
    return (
        <NavFooter
            sections={[
                {
                    title: 'Nosotros',
                    links: [
                        { href: '/conocenos', label: 'Conócenos' },
                        { href: '/trabaja-con-nosotros', label: 'Trabaja con nosotros' },
                        { href: '/ventas-corporativas', label: 'Ventas Corporativas' },
                        { href: '/memoria-gestion', label: 'Memoria de Gestión de Sostenibilidad 2023' },
                    ],
                },
                {
                    title: 'Atención al cliente',
                    links: [
                        { href: '/boleta-electronica', label: 'Ver mi boleta electrónica' },
                        { href: '/productos-permitidos', label: 'Ver lista de productos permitidos' },
                        { href: '/contactanos', label: 'Atención de Consultas o Incidencias por Contáctanos' },
                    ],
                },
                {
                    title: 'Políticas y condiciones',
                    links: [
                        { href: '/politica-sst', label: 'Política de SST' },
                        { href: '/politica-sostenibilidad', label: 'Política de Sostenibilidad' },
                        { href: '/politica-diversidad', label: 'Política de Diversidad e Inclusión' },
                        { href: '/politica-privacidad', label: 'Política de Privacidad' },
                        { href: '/condiciones-uso', label: 'Condiciones de uso y seguridad' },
                        { href: '/reglas-convivencia', label: 'Reglas de Convivencia' },
                        { href: '/terminos-condiciones', label: 'Términos y condiciones' },
                    ],
                },
            ]}
            socialLinks={
                <div className="flex space-x-4">
                    <Link href="https://facebook.com" className="hover:underline">
                        <i className="fab fa-facebook"></i>
                    </Link>
                    <Link href="https://twitter.com" className="hover:underline">
                        <i className="fab fa-twitter"></i>
                    </Link>
                    <Link href="https://youtube.com" className="hover:underline">
                        <i className="fab fa-youtube"></i>
                    </Link>
                    <Link href="https://instagram.com" className="hover:underline">
                        <i className="fab fa-instagram"></i>
                    </Link>
                </div>
            }
            bottomText={<p>© 2024 Camarrillada. Todos los derechos reservados.</p>}
        />
    );
}