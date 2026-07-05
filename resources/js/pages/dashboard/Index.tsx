import { Head } from '@inertiajs/react';

export default function Index() {
    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col items-center justify-center gap-4 overflow-x-auto rounded-xl p-4 text-center">
                <h2 className="text-[1.8rem] font-bold">Admin Dashboard</h2>
                <p className="text-[var(--main-text-light)]">
                    This is your dashboard to manage users, characters, items,
                    and logs.
                </p>
            </div>
        </>
    );
}
