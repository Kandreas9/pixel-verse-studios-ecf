import { Link } from '@inertiajs/react';

export function AppFooter() {
    return (
        <footer className="flex h-24 items-center justify-between border-t border-sidebar-border/80 bg-[var(--main-dark-color)] px-4">
            <h2>PixelVerse Studios</h2>

            <div className="flex flex-col space-y-4 text-right">
                <Link href={'/terms'}>Terms and Service</Link>
                <Link href={'/privacy'}>Privacy Policy</Link>
            </div>
        </footer>
    );
}
