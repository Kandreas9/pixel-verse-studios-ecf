import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { Form, Link } from '@inertiajs/react';
import { useState } from 'react';
import { Check, Trash, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Label } from '../ui/label';
import InputError from '../input-error';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

export default function CharacterDashboardItem({ user, character }) {
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
                    {character.is_approved ? (
                        <div className="text-sm text-green-400">Approved</div>
                    ) : (
                        <div className="flex gap-1">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <div>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <button className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-red-400 px-4 has-[>svg]:px-2.5">
                                                    <X />
                                                </button>
                                            </TooltipTrigger>
                                            <TooltipContent align="center">
                                                Reject Character
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>Reject Character</DialogTitle>
                                    <DialogDescription>
                                        Enter reason for rejection.
                                    </DialogDescription>

                                    <Form
                                        action={`/characters/${character.id}/reject`}
                                        method="delete"
                                        options={{
                                            preserveScroll: true,
                                        }}
                                        resetOnSuccess
                                        className="space-y-6"
                                    >
                                        {({
                                            resetAndClearErrors,
                                            processing,
                                            errors,
                                        }) => (
                                            <>
                                                <div className="grid gap-2">
                                                    <Label
                                                        htmlFor="reason"
                                                        className="sr-only"
                                                    >
                                                        Reason
                                                    </Label>
                                                    <Input
                                                        id="reason"
                                                        type="text"
                                                        required
                                                        autoFocus
                                                        tabIndex={1}
                                                        name="reason"
                                                        placeholder="Reason for rejection"
                                                    />

                                                    <InputError
                                                        message={errors.reason}
                                                    />
                                                </div>

                                                <DialogFooter className="gap-2">
                                                    <DialogClose asChild>
                                                        <Button
                                                            variant="secondary"
                                                            onClick={() =>
                                                                resetAndClearErrors()
                                                            }
                                                        >
                                                            Cancel
                                                        </Button>
                                                    </DialogClose>

                                                    <DialogClose asChild>
                                                        <Button
                                                            variant="blue"
                                                            disabled={
                                                                processing
                                                            }
                                                            asChild
                                                        >
                                                            <button
                                                                type="submit"
                                                                data-test="confirm-reject-character-button"
                                                            >
                                                                Reject Character
                                                            </button>
                                                        </Button>
                                                    </DialogClose>
                                                </DialogFooter>
                                            </>
                                        )}
                                    </Form>
                                </DialogContent>
                            </Dialog>

                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Link
                                        as="button"
                                        method="patch"
                                        href={`/characters/${character.id}/approve`}
                                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-green-400 px-4 has-[>svg]:px-2.5"
                                    >
                                        <Check />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent align="center">
                                    Approve Character
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    )}

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
                </div>
            </section>
        </>
    );
}
