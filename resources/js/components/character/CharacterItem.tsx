import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { Trash, Pencil, Circle } from 'lucide-react';
import { Link, router } from '@inertiajs/react';
import { useState } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';

export default function CharacterItem({ user, character }) {
    const getInitials = useInitials();
    const [isDeleteClicked, setIsDeleteClicked] = useState(false);
    const [isShared, setIsShared] = useState(character.is_shared);
    const [processing, setProcessing] = useState(false);

    const handleDeleteClick = () => {
        setIsDeleteClicked(true);

        setTimeout(() => {
            setIsDeleteClicked(false);
        }, 2000);
    };

    const handleShareToggle = () => {
        setIsShared(!isShared);
        setProcessing(true);

        router.patch(
            `/characters/${character.id}/${character.is_shared ? 'unshare' : 'share'}`,
            {},
            {
                preserveScroll: true,
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <>
            <section className="flex justify-between rounded border border-sidebar-border/80 px-3 py-4">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <Avatar
                        className={cn('h-12 w-12 overflow-hidden rounded-full')}
                    >
                        <AvatarImage
                            src={character.image}
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

                <div className="flex flex-col items-end justify-start gap-1 md:flex-row md:items-start md:justify-end">
                    {isDeleteClicked ? (
                        <Link
                            className="h-8 cursor-pointer rounded-md bg-red-400 px-3 text-[.9rem] has-[>svg]:px-2.5"
                            as="button"
                            method="delete"
                            href={`/characters/${character.id}`}
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

                    {character.is_approved ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="blue"
                                    size="sm"
                                    className="w-8 cursor-pointer p-1"
                                >
                                    <Pencil className="w-3" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" align="end">
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link
                                            className="block w-full cursor-pointer"
                                            href={`/characters/${character.id}/edit`}
                                            prefetch
                                        >
                                            Edit
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>

                                <DropdownMenuSeparator />

                                <DropdownMenuGroup>
                                    <div className="flex w-full items-center justify-between px-2 py-1.5 text-sm">
                                        <div>
                                            {character.is_shared
                                                ? 'Stop Sharing'
                                                : 'Share'}
                                        </div>
                                        <button
                                            disabled={processing}
                                            onClick={handleShareToggle}
                                            className={cn(
                                                'relative h-6 w-[3rem] rounded-full px-1.5 py-1 transition-all duration-500',
                                                `${isShared ? 'bg-blue-400' : 'bg-gray-400'}`,
                                            )}
                                        >
                                            <Circle
                                                className={cn(
                                                    `absolute top-[50%] left-1 size-4 -translate-y-[50%] transition-all duration-500`,
                                                    `${isShared ? 'translate-x-6' : 'translate-x-0'}`,
                                                )}
                                            />
                                        </button>
                                    </div>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        ''
                    )}
                </div>
            </section>
        </>
    );
}
