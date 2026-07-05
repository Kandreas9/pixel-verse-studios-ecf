import CharacterList from '@/components/character/CharacterList';
import { Head } from '@inertiajs/react';

export default function Characters({ characters }) {
    return (
        <>
            <Head title="Dashboard - Characters" />

            <div className="px-4 py-[2rem]">
                <CharacterList characters={characters} isDashboardPage={true} />
            </div>
        </>
    );
}
