import CharacterList from '@/components/character/CharacterList';
import { Input } from '@/components/ui/input';
import { Head, usePage } from '@inertiajs/react';

export default function Shared({ characters }) {
    return (
        <>
            <Head>
                <title>Shared Characters</title>
                <meta
                    name="description"
                    content="Find out what characters other users are creating"
                />
            </Head>

            <div className="px-4 py-[2rem]">
                {/*
                <Input
                    id='name'
                    type="text"
                    required
                    tabIndex={1}
                    placeholder="name"
                />
                */}
                <CharacterList characters={characters} isSharedPage={true} />
            </div>
        </>
    );
}
