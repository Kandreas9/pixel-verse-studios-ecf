import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Trash } from 'lucide-react';

export default function UserDashboardItem({ user }) {
    const getInitials = useInitials();
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteClicked(true);

        setTimeout(() => {
            setIsDeleteClicked(false);
        }, 2000);
    };

    return (
        <>
            <section className="flex justify-between rounded border border-sidebar-border/80 px-3 py-4">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar
                        className={cn('h-12 w-12 overflow-hidden rounded-full')}
                    >
                        <AvatarImage src={user.image} alt={user.name} />
                        <AvatarFallback
                            className={cn(
                                'rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white',
                            )}
                        >
                            {getInitials(user.name)}
                        </AvatarFallback>
                    </Avatar>

                    <div
                        className={cn(
                            'grid flex-1 text-left text-sm leading-tight',
                        )}
                    >
                        <span className="truncate font-medium">
                            {user.name}
                        </span>
                        <span className={cn('truncate text-muted-foreground')}>
                            {user.email}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-start gap-1 md:flex-row md:items-start md:justify-end">
                    {isDeleteClicked ? (
                        <Link
                            className="h-8 cursor-pointer rounded-md bg-red-400 px-3 text-[.9rem] has-[>svg]:px-2.5"
                            as="button"
                            method="delete"
                            href={`/dashboard/users/${user.id}`}
                        >
                            Sure?
                        </Link>
                    ) : (
                        <button
                            onClick={handleDeleteClick}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-red-400 px-3 has-[>svg]:px-2.5"
                        >
                            <Trash />
                        </button>
                    )}
                </div>
            </section>
        </>
    );
}
