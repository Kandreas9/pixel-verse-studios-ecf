import LogList from '@/components/log/LogList';
import { Head } from '@inertiajs/react';

export default function CharacterLogs({ characterLogs }) {
    return (
        <>
            <Head title="Dashboard - Character Logs" />

            <div className="px-4 py-[2rem]">
                <LogList logs={characterLogs} isCharacterLogPage={true} />
            </div>
        </>
    );
}
