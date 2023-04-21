import React from "react";
import { InputPostComponent } from "../inputPost";
import { PostListComponent } from "../post/postList";

export default function FeedComponent() {
    return (
        <div className="flex flex-col gap-y-5">
            <InputPostComponent />
            <PostListComponent />
        </div>
    );
}
