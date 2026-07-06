import ModeratorList from '@/components/moderator/ModeratorList';
import { Head, Link } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export default function Moderators({ moderators }) {
    return (
        <>
            <Head title="Dashboard - Moderators" />

            <div className="px-4 py-[2rem]">
                <div className="mb-[2rem] flex items-center justify-between">
                    <h2 className="text-lg font-bold">Created Moderators</h2>
                    <Link
                        className="cursor-pointer rounded bg-green-400 px-2 py-1"
                        href={'/dashboard/moderators/create'}
                    >
                        <Plus />
                    </Link>
                </div>

                <ModeratorList moderators={moderators} />
            </div>
        </>
    );
}
