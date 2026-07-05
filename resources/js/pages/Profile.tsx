import CharacterList from '@/components/character/CharacterList';
import { UserInfo } from '@/components/user-info';
import { Head, Link, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function Profile({ characters }) {
    const { auth } = usePage().props;
    console.log('character', characters);
    return (
        <>
            <Head>
                <title>Profile</title>
                <meta
                    name="description"
                    content="Handle your user profile and create your FantasyRealm characters"
                />
            </Head>

            <div className="px-4 py-[2rem]">
                <div className="mb-[2rem] flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    <UserInfo
                        user={auth.user}
                        avatarTextSize="text-xl"
                        nameTextSize="text-lg"
                        emailTextSize="text-base"
                        sizeClass="h-18 w-18"
                        showEmail={true}
                    />
                </div>

                <div className="mb-[2rem] flex items-center justify-between">
                    <h2 className="text-lg font-bold">Created Characters</h2>
                    <Link
                        className="cursor-pointer rounded bg-green-400 px-2 py-1"
                        href={'/characters/create'}
                    >
                        <Plus />
                    </Link>
                </div>

                <CharacterList user={auth.user} characters={characters} />
            </div>
        </>
    );
}
