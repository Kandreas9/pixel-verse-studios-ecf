import UserDashboardItem from './UserDashboardItem';

export default function UserList({ users }) {
    return (
        <>
            <div className="flex flex-col gap-4">
                {[...users].reverse().map((user) => (
                    <UserDashboardItem key={user.id} user={user} />
                ))}
            </div>
        </>
    );
}
