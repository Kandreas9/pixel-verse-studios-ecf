import CommentDashboardItem from './CommentDashboardItem';

export default function CommentList({ comments }) {
    return (
        <>
            <div className="flex flex-col gap-4">
                {[...comments].reverse().map((comment) => (
                    <CommentDashboardItem key={comment.id} comment={comment} />
                ))}
            </div>
        </>
    );
}
