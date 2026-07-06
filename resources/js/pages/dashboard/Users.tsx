import UserList from '@/components/user/UserList';
import { Head } from '@inertiajs/react';

export default function Users({ users }) {
    return (
        <>
            <Head title="Dashboard - Users" />

            <div className="px-4 py-[2rem]">
                <UserList users={users} />
            </div>
        </>
    );
}
