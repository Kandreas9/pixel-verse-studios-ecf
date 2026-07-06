import CharacterCommentItem from '@/components/comment/CharacterCommentItem';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { useInitials } from '@/hooks/use-initials';
import { cn } from '@/lib/utils';
import { Form, Head, usePage } from '@inertiajs/react';

export default function Detail({ character, comments }) {
    const getInitials = useInitials();
    const { auth } = usePage().props;

    console.log('character', character);
    console.log('comments', comments);

    return (
        <>
            <Head>
                <title>Detailed Character</title>
                <meta
                    name="description"
                    content="Check out more details about a character and leave comments"
                />
            </Head>

            <div className="flex flex-col gap-8 px-4 py-[2rem]">
                <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                    <div className="mb-[2rem] flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                        <Avatar
                            className={cn(
                                'h-18 w-18 overflow-hidden rounded-full',
                            )}
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
                            <span
                                className={cn('truncate text-muted-foreground')}
                            >
                                Created by {character.user.name}
                            </span>
                        </div>
                    </div>

                    <section className="text-center">
                        <h2 className="text-lg font-bold">Character Details</h2>
                        <div>
                            <p className="rounded border border-sidebar-border/80">
                                Name:{' '}
                                <span className="text-[var(--main-text-light)]">
                                    {character.name}
                                </span>
                            </p>
                            <p className="rounded border border-sidebar-border/80">
                                Gender:{' '}
                                <span className="text-[var(--main-text-light)]">
                                    {' '}
                                    {character.gender}
                                </span>
                            </p>
                            <p className="rounded border border-sidebar-border/80">
                                Skin Color:{' '}
                                <span className="text-[var(--main-text-light)]">
                                    {' '}
                                    {character.skin_color}
                                </span>
                            </p>
                            <p className="rounded border border-sidebar-border/80">
                                Eye Color:{' '}
                                <span className="text-[var(--main-text-light)]">
                                    {' '}
                                    {character.eye_color}
                                </span>
                            </p>
                            <p className="rounded border border-sidebar-border/80">
                                Eye Shape:{' '}
                                <span className="text-[var(--main-text-light)]">
                                    {' '}
                                    {character.eye_shape}{' '}
                                </span>
                            </p>
                            <p className="rounded border border-sidebar-border/80">
                                Hair Color:{' '}
                                <span className="text-[var(--main-text-light)]">
                                    {' '}
                                    {character.hair_color}
                                </span>
                            </p>
                            <p className="rounded border border-sidebar-border/80">
                                Nose Shape:{' '}
                                <span className="text-[var(--main-text-light)]">
                                    {' '}
                                    {character.nose_shape}
                                </span>
                            </p>
                            <p className="rounded border border-sidebar-border/80">
                                Mouth Shape:{' '}
                                <span className="text-[var(--main-text-light)]">
                                    {' '}
                                    {character.mouth_shape}
                                </span>
                            </p>
                        </div>
                    </section>

                    <section className="text-center">
                        <h2 className="text-lg font-bold">Character Items</h2>
                        <div>
                            {character.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="rounded border border-sidebar-border/80"
                                >
                                    <p>
                                        Name:{' '}
                                        <span className="text-[var(--main-text-light)]">
                                            {' '}
                                            {item.name}
                                        </span>
                                    </p>
                                    <p>
                                        Type:{' '}
                                        <span className="text-[var(--main-text-light)]">
                                            {' '}
                                            {item.type}
                                        </span>
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div>
                    <Form
                        action={`/characters/${character.id}/comments`}
                        method="post"
                        disableWhileProcessing
                        resetOnSuccess={['text']}
                        //className="flex flex-col gap-6"
                    >
                        {({ processing, errors, recentlySuccessful }) => (
                            <>
                                <div className="flex items-center justify-center gap-5">
                                    <Label htmlFor="text">
                                        <Avatar
                                            className={cn(
                                                'h-8 w-8 overflow-hidden rounded-full',
                                            )}
                                        >
                                            <AvatarImage
                                                src={auth.user.image}
                                                alt={auth.user.name}
                                            />
                                            <AvatarFallback
                                                className={cn(
                                                    'rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white',
                                                )}
                                            >
                                                {getInitials(auth.user.name)}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Label>
                                    <Input
                                        id="text"
                                        type="text"
                                        required
                                        tabIndex={1}
                                        name="text"
                                        placeholder="Leave a comment"
                                    />

                                    <Button
                                        type="submit"
                                        className="w-10"
                                        tabIndex={4}
                                        data-test="comment-button"
                                    >
                                        {processing && <Spinner />}
                                        Send
                                    </Button>
                                </div>

                                <InputError
                                    message={errors.text}
                                    className="mt-2"
                                />

                                {recentlySuccessful && (
                                    <div className="text-green-400">
                                        Your message has been sent
                                    </div>
                                )}

                                {errors.validation && (
                                    <div className="text-red-400">
                                        {errors.validation}
                                    </div>
                                )}
                            </>
                        )}
                    </Form>

                    <div className="my-8 flex flex-col gap-4">
                        {[...comments].reverse().map((comment) => {
                            if (
                                comment.is_approved ||
                                comment.user_id === auth.user.id
                            ) {
                                return (
                                    <div key={comment.id}>
                                        <CharacterCommentItem
                                            comment={comment}
                                            auth={auth}
                                        />
                                    </div>
                                );
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
