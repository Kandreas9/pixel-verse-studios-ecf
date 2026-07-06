import CharacterList from '@/components/character/CharacterList';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function Shared({ characters, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    function handleSearch(e) {
        const value = e.target.value;
        setSearch(value);

        router.get(
            '/characters',
            { search: value },
            {
                preserveState: true,
                replace: true,
            },
        );
    }

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
                <input
                    type="text"
                    placeholder="Search name"
                    value={search}
                    onChange={handleSearch}
                    className="mb-4 rounded border px-3 py-2"
                />

                <CharacterList characters={characters} isSharedPage={true} />
            </div>
        </>
    );
}
