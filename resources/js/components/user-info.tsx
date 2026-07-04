import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import type { User } from '@/types';

export function UserInfo({
    user,
    sizeClass = 'h-8 w-8',
    avatarTextSize = 'text-base',
    nameTextSize = 'text-sm',
    emailTextSize = 'text-xs',
    showEmail = false,
}: {
    user: User;
    sizeClass?: string;
    avatarTextSize?: string;
    nameTextSize?: string;
    emailTextSize?: string;
    showEmail?: boolean;
}) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className={cn('overflow-hidden rounded-full', sizeClass)}>
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback
                    className={cn(
                        'rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white',
                        avatarTextSize,
                    )}
                >
                    {getInitials(user.name)}
                </AvatarFallback>
            </Avatar>
            <div
                className={cn(
                    'grid flex-1 text-left text-sm leading-tight',
                    nameTextSize,
                )}
            >
                <span className="truncate font-medium">{user.name}</span>
                {showEmail && (
                    <span
                        className={cn(
                            'truncate text-muted-foreground',
                            emailTextSize,
                        )}
                    >
                        {user.email}
                    </span>
                )}
            </div>
        </>
    );
}
