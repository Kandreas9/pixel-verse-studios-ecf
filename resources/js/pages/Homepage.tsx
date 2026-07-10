import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import { register } from '@/routes';
import { Head, Link } from '@inertiajs/react';

export default function Homepage() {
    return (
        <>
            <Head>
                <title>PixelVerse Studios Home</title>
                <meta
                    name="description"
                    content="Find out about FantasyRealm MMORPGs character creator."
                />
            </Head>

            <div className="flex flex-col items-center gap-[1rem] px-4 py-[3rem] md:flex-row md:justify-center">
                <div className="relative aspect-video h-[8rem] w-[13rem] overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-100/20" />
                </div>
                <div className="flex flex-col items-center gap-[1rem]">
                    <p className="text-center text-[var(--main-text-light)] md:max-w-[16rem]">
                        PixelVerse Studios focuses on creating immersive
                        experiences in massive multiplayer online games.
                    </p>

                    <Link
                        href={register()}
                        className="inline-block rounded-sm border border-[#19140035] bg-blue-500 px-5 py-1.5 text-sm leading-normal text-[#EDEDEC] hover:border-[#62605b] dark:border-[#3E3E3A]"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
            <div className="flex flex-col items-center gap-[1rem] px-4 pb-[3rem]">
                <p className="text-center text-[var(--main-text-light)] md:max-w-[25rem]">
                    FantasyRealm Online is an MMORPG, it offers a rich story
                    campaign, and it facilitates communities that elevate the
                    gameplay even further. The online fantasy immersion is
                    boosted with the feature rich character creator.
                </p>

                <div className="flex gap-[1rem]">
                    <div className="relative aspect-video h-[5rem] w-[8rem] overflow-hidden rounded-xl border border-sidebar-border/70 md:h-[8rem] md:w-[13rem] dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video h-[5rem] w-[8rem] overflow-hidden rounded-xl border border-sidebar-border/70 md:h-[8rem] md:w-[13rem] dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-100/20" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center gap-[1rem] px-4 pb-[3rem]">
                <p className="text-center text-[var(--main-text-light)] md:max-w-[25rem]">
                    This website offers extra customisation for even better and
                    immersive characters.
                </p>

                <div className="flex items-center gap-[1rem]">
                    <section className="flex w-[8rem] flex-col gap-[.3rem] text-center text-sm text-[var(--main-text-light)]">
                        <h2 className="text-base font-bold">Benefits</h2>
                        <p>- Extra control.</p>
                        <p>- Ability to share characters.</p>
                        <p>
                            - Copy functionality on other user made characters.
                        </p>
                    </section>

                    <div className="relative aspect-video h-[5rem] w-[8rem] overflow-hidden rounded-xl border border-sidebar-border/70 md:h-[8rem] md:w-[13rem] dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-100/20" />
                    </div>
                </div>
            </div>
        </>
    );
}
