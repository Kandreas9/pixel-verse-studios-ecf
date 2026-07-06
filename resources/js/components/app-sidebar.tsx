import { Link, usePage } from '@inertiajs/react';
import {
    LayoutGrid,
    List,
    Shirt,
    User,
    Shield,
    Mail,
    UserPen,
    MessageCircle,
} from 'lucide-react';
import AppLogo from '@/components/app-logo';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Characters',
        href: '/dashboard/characters',
        icon: List,
    },
    {
        title: 'Items',
        href: '/dashboard/items',
        icon: Shirt,
    },
    {
        title: 'Users',
        href: '/dashboard/users',
        icon: User,
    },
    {
        title: 'Comments',
        href: '/dashboard/comments',
        icon: MessageCircle,
    },
];

const adminNavItems: NavItem[] = [
    {
        title: 'Moderators',
        href: '/dashboard/moderators',
        icon: Shield,
    },
    {
        title: 'Contact Logs',
        href: '/dashboard/contacts/logs',
        icon: Mail,
    },
    {
        title: 'Character Logs',
        href: '/dashboard/characters/logs',
        icon: UserPen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props;

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href={'/'}
                                prefetch
                                className="flex items-center space-x-2 text-xl"
                            >
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain
                    roles={auth.roles}
                    items={mainNavItems}
                    adminItems={adminNavItems}
                />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
