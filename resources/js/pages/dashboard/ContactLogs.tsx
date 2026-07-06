import LogList from '@/components/log/LogList';
import { Head } from '@inertiajs/react';

export default function ContactLogs({ contactLogs }) {
    return (
        <>
            <Head title="Dashboard - Contact Logs" />

            <div className="px-4 py-[2rem]">
                <LogList logs={contactLogs} isContactLogPage={true} />
            </div>
        </>
    );
}
