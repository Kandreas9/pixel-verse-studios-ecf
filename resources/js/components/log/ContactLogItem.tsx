export default function ContactLogItem({ contactLog }) {
    const createdAt = new Date(contactLog.created_at);

    return (
        <>
            <section className="flex justify-between rounded border border-sidebar-border/80 px-3 py-4">
                <div className="flex flex-col gap-2 px-1 py-1.5 text-left text-sm">
                    <p>Email: {contactLog.email}</p>
                    <p>Name: {contactLog.name}</p>
                    <p>Details: {contactLog.details}</p>
                    <p>
                        Time Sent: {createdAt.getDate()}-{createdAt.getMonth()}-
                        {createdAt.getFullYear()} {createdAt.getHours()}:
                        {createdAt.getMinutes()}
                    </p>
                </div>
            </section>
        </>
    );
}
