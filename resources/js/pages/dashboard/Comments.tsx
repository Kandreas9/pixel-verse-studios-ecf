import CommentList from '@/components/comment/CommentList';
import { Head } from '@inertiajs/react';

export default function Characters({ comments }) {
    return (
        <>
            <Head title="Dashboard - Comments" />

            <div className="px-4 py-[2rem]">
                <CommentList comments={comments} />
            </div>
        </>
    );
}
