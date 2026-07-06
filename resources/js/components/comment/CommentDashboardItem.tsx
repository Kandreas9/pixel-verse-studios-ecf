import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '../ui/dialog';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import { Check, Trash, X } from 'lucide-react';
import { Form, Link } from '@inertiajs/react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import InputError from '../input-error';
import { Button } from '../ui/button';
import { useState } from 'react';

export default function CommentDashboardItem({ comment }) {
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
                    <div>
                        <div className="flex items-center gap-2">
                            <Avatar
                                className={cn(
                                    'h-7 w-7 overflow-hidden rounded-full',
                                )}
                            >
                                <AvatarImage
                                    src={comment.user.image}
                                    alt={comment.user.name}
                                />
                                <AvatarFallback
                                    className={cn(
                                        'rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white',
                                    )}
                                >
                                    {getInitials(comment.user.name)}
                                </AvatarFallback>
                            </Avatar>
                            <span
                                className={cn('truncate text-muted-foreground')}
                            >
                                Created by {comment.user.name}
                            </span>
                        </div>

                        <div
                            className={cn(
                                'grid flex-1 text-left text-sm leading-tight',
                            )}
                        >
                            <span className="truncate font-medium">
                                {comment.text}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-end justify-start gap-1 md:flex-row md:items-start md:justify-end">
                    {comment.is_approved ? (
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
                                                Reject Comment
                                            </TooltipContent>
                                        </Tooltip>
                                    </div>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogTitle>Reject Comment</DialogTitle>
                                    <DialogDescription>
                                        Enter reason for rejection.
                                    </DialogDescription>

                                    <Form
                                        action={`/comments/${comment.id}/reject`}
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
                                                                data-test="confirm-reject-comment-button"
                                                            >
                                                                Reject Comment
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
                                        href={`/comments/${comment.id}/approve`}
                                        className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-md bg-green-400 px-4 has-[>svg]:px-2.5"
                                    >
                                        <Check />
                                    </Link>
                                </TooltipTrigger>
                                <TooltipContent align="center">
                                    Approve Comment
                                </TooltipContent>
                            </Tooltip>
                        </div>
                    )}

                    {isDeleteClicked ? (
                        <Link
                            className="h-8 cursor-pointer rounded-md bg-red-400 px-3 text-[.9rem] has-[>svg]:px-2.5"
                            as="button"
                            method="delete"
                            href={`/dashboard/comments/${comment.id}`}
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
