import { useInitials } from '@/hooks/use-initials';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ThumbsUp } from 'lucide-react';
import { Link } from '@inertiajs/react';

export default function CharacterCommentItem({ comment, auth }) {
    const getInitials = useInitials();

    const authUserRating = comment.ratings.find(
        (rating) => rating.user_id === auth.user?.id,
    );

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

                    <div className="ml-auto flex items-center gap-3">
                        <p>{comment.ratings.length}</p>

                        {authUserRating ? (
                            <Link
                                as="button"
                                method="delete"
                                href={`/comments/${comment.id}/ratings/${authUserRating.id}`}
                            >
                                <ThumbsUp fill="white" />
                            </Link>
                        ) : (
                            <Link
                                as="button"
                                method="post"
                                href={`/comments/${comment.id}/ratings`}
                            >
                                <ThumbsUp />
                            </Link>
                        )}
                    </div>
                </div>

                <p className="pl-12 text-sm text-[var(--main-text-light)]">
                    {comment.text}
                </p>
            </div>
        </>
    );
}
