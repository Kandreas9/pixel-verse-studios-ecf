import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export default function CharacterCommentItem({ comment }) {
    const getInitials = useInitials();

    return (
        <>
            <div>
                <div className="flex items-center gap-4">
                    <Avatar className="size-8 overflow-hidden rounded-full">
                        <AvatarImage
                            src={comment.user.image}
                            alt={comment.user.name}
                        />
                        <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                            {getInitials(comment.user.name)}
                        </AvatarFallback>
                    </Avatar>

                    <h2>{comment.user.name}</h2>

                    {!comment.is_approved && (
                        <div className="text-sm text-[var(--main-text-light)]">
                            This comment is pending approval
                        </div>
                    )}
                </div>

                <p className="pl-12 text-sm text-[var(--main-text-light)]">
                    {comment.text}
                </p>
            </div>
        </>
    );
}
