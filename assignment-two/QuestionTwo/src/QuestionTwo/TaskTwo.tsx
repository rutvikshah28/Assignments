import * as React from "react";
import { Either, left, right, isRight } from "fp-ts/Either";
import { pipe } from "fp-ts/function";

interface IEntity {
    id: string;
}

interface IPost extends IEntity {
    __tag: "post";
    userId: number;
    title: string;
    body: string;
}

interface IComment extends IEntity {
    __tag: "comment";
    postId: number;
    name: string;
    email: string;
    body: string;
}

type ApiResponse<T extends IEntity> =
    | { status: "success"; data: T[] }
    | { status: "error"; error: string };

const baseUrl = "https://jsonplaceholder.typicode.com/";

const fetchMockData =
    (variant: "posts" | "comments", baseUrl: string) =>
    (additionalParams?: string) => {
        return fetch(
            baseUrl + variant + (additionalParams ? additionalParams : "")
        );
    };

const fetchAllPosts = fetchMockData("posts", baseUrl);
const fetchOnePost = (postId: number) => fetchAllPosts("/" + postId.toString());

const fetchAllComments = fetchMockData("comments", baseUrl);
const commentsForPost = (postId: number) =>
    fetchAllComments("?postId=" + postId.toString());

const AssignmentTwo = () => {
    const [comments, setComments] = React.useState<ApiResponse<IComment>>();
    const [posts, setPosts] = React.useState<ApiResponse<IPost>>();
    const [pId, setPId] = React.useState<number>(45);
    const [numComments, setNumComments] = React.useState<number>();

    const NumCommentsForPost = () => {
        if (comments && comments.status === "success") {
            setNumComments(
                comments.data.map((val) => 1).reduce((acc, val) => acc + val)
            );
        } else {
            setNumComments(undefined);
        }
    };

    const customMatch =
        (variant: "post" | "comment") =>
        (val: Either<string, IComment[] | IPost[]>) => {
            if (isRight(val)) {
                if (variant === "comment")
                    setComments({
                        status: "success",
                        data: val.right as IComment[],
                    });
                else {
                    setPosts({ status: "success", data: val.right as IPost[] });
                }
            } else {
                setComments({ status: "error", error: val.left });
            }
        };

    const matchPost = customMatch("post");
    const matchComment = customMatch("comment");
    React.useEffect(() => {
        commentsForPost(pId)
            .then((response) => response.json())
            .then((json) => {
                pipe(right(json as IComment[]), matchComment);
                NumCommentsForPost();
            })
            .catch((error) => {
                pipe(left(String(error)), matchComment);
                NumCommentsForPost();
            });

        fetchOnePost(pId)
            .then((response) => response.json())
            .then((json) => pipe(right([json] as IPost[]), matchPost))
            .catch((error) => pipe(left(String(error)), matchPost));
    }, [pId]);

    return (
        <>
            {posts && comments ? (
                posts.status === "success" && comments.status === "success" ? (
                    <>
                        {posts.data.map((post) => {
                            return (
                                <>
                                    <h3>{post.title}</h3>
                                    <p>{post.body}</p>
                                    <br />
                                    <br />
                                    <br />
                                    {comments.data.map((comment) => (
                                        <>
                                            {comment.name}
                                            <br />
                                            {comment.email}
                                            <br />
                                            {comment.body}
                                            <br />
                                            <br />
                                        </>
                                    ))}
                                </>
                            );
                        })}
                        {numComments === undefined
                            ? undefined
                            : "The number of comments are: " + numComments}
                    </>
                ) : (
                    <>
                        <h3>Error</h3>
                        <p>
                            {posts.status === "error" ? posts.error : ""}
                            {comments.status === "error" ? comments.error : ""}
                        </p>
                    </>
                )
            ) : (
                "loading..."
            )}
            <br />
            <button onClick={() => setPId(pId - 1)}>Previous Post</button>
            <button onClick={() => setPId(pId + 1)}>Next Post</button>
        </>
    );
};

export default AssignmentTwo;
