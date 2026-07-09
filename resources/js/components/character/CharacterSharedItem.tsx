import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { Link } from '@inertiajs/react';

export default function CharacterSharedItem({ user, character }) {
    const getInitials = useInitials();

    return (
        <>
            <Link
                href={`/characters/${character.id}`}
                className="flex justify-between rounded border border-sidebar-border/80 px-3 py-4"
            >
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar
                        className={cn('h-12 w-12 overflow-hidden rounded-full')}
                    >
                        <AvatarImage
                            src={`/${character.image}`}
                            alt={character.name}
                        />
                        <AvatarFallback
                            className={cn(
                                'rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white',
                            )}
                        >
                            {getInitials(character.name)}
                        </AvatarFallback>
                    </Avatar>

                    <div
                        className={cn(
                            'grid flex-1 text-left text-sm leading-tight',
                        )}
                    >
                        <span className="truncate font-medium">
                            {character.name}
                        </span>
                        <span className={cn('truncate text-muted-foreground')}>
                            Created by {user.name}
                        </span>
                    </div>
                </div>
            </Link>
        </>
    );
}
