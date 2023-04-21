export interface ErrorAuth {
    field: string;
    message: string;
}

export interface IUser {
    id: string;
    email: string;
    username: string;
    created_at: Date;
    password: string;
    urlAvatar: string;
    emailVerified: Date;
    followedBy: IFollow[];
    following: IFollow[];
    user_notifications: INotifications[];
    likes: ILike[];
    posts: IPost[];
    books: IUserBook[];
    bio: string;
    _count: {
        books: number;
    };
    Challenge: IChallenge;
}

export interface IUserBook {
    id: string;
    fk_id_book: string;
    fk_id_user: string;
    book: IBookBd;
    created_at: Date;
    listType: string;
    updatedAt: Date;
    rate: number | null;
    pagesRead: number;
    favorite: boolean;
}

export interface Session {
    id: string;
    user: IUser;
    userId: string;
    expireIn: number;
}

export interface INotifications {
    id: string;
    view: boolean;
    post_id: string | null;
    userNotification_id: string;
    userAction_id: string;
    userAction: IUser;
    post: IPost;
    text: string;
    created_at: Date;
    userNotification: IUser;
}

export interface IToken {
    token: string;
    refreshToken: Session;
}

export interface IPost {
    id: string;
    text: string;
    action: string;
    created_at: Date;
    updatedAt: Date;
    userProfile: IUser;
    userProfile_id: string;
    user_id: string;
    user: IUser;
    Likes: ILike[];
    Comments: IComment[];
    book: IBookBd;
    Notifications: INotifications[];
    userBook: IUserBook;
    Challenge: IChallenge;
    challengeGoal: number;
    percentageReadBook?: number | null | undefined;
    totalPage?: number | null | undefined;
    pagesRead?: number;
    bookRate?: number | undefined;
}

export interface IBookBd {
    id: string;
    google: string;
    title: string | null;
    authors: string | null;
    subtitle: string | null;
    pageCount: number | null;
    categories: string | null;
    created_at: Date;
    description: string | null;
    publishedDate: string | null;
    smallThumbnail: string | null;
}

export interface IFollow {
    followerId: string | undefined;
    followingId: string;
    follower: IUser;
    following: IUser;
}

export interface ILike {
    id: string;
    like: boolean;
    post_id: string;
    user_id: string;
    created_at: Date;
}

export interface IChallenge {
    id: string;
    user_id: string;
    goal: number;
    created_at: Date;
    complete: boolean;
}

export interface ICreatPostParams {
    text?: string;
    action?: string;
    userId: string | undefined;
    userProfile_id?: string;
}

export interface IUpdatGoalChallengeParams {
    goal: number;
    challengeId: string | undefined;
}

export interface IUpdatStatusChallengeParams {
    status: boolean;
    challengeId: string | undefined;
}

export interface ICreateChallengeParams {
    goal?: number;
    userId: string | undefined;
}

export interface IFollowParams {
    followerId: string | undefined;
    followingId: string;
}

export interface IGetUserMutateParams {
    userId: string | undefined;
    search: string | undefined;
}

export interface ILikeParams {
    userId?: string;
    postId: string;
    userNotification?: string;
}

export interface IComment {
    userId?: string;
    user: IUser;
    postId: string;
    userNotification?: string;
    text: string;
    created_at: Date;
}

export interface ICreateCommentParams {
    text: string;
    user_id: string | undefined;
    post_id: string;
    userNotification: string;
}

export interface IGoogleSearchParams {
    search: string;
    maxLenght?: number;
}

export interface IGoogleBook {
    id: string;
    volumeInfo: {
        authors: string[];
        categories: string;
        imageLinks: {
            thumbnail: string;
            smallThumbnail: string;
        };
        infoLink: string;
        title: string;
        subtitle: string;
        pageCount: number;
        description: string;
    };
}

export interface ICreateBookPostParams {
    rate: number;
    text?: string | undefined;
    action?: string | undefined;
    userId: string | undefined;
    google: string | undefined;
    title: string | undefined;
    author: string | undefined;
    subtitle: string | undefined;
    pageCount: number | undefined;
    categories: string | undefined;
    description: string | undefined;
    smallThumbnail: string | undefined;
    listType?: "Read" | "Reading" | "Want to read";
    favorite: boolean;
}

export interface IMostReadBookResponse {
    fk_id_book: string;
    _count: {
        fk_id_book: number;
    };
}

export interface IMostPostedBookResponse {
    book_id: string;
    _count: {
        book_id: number;
    };
}

export interface IRankingBooListkResponse {
    fk_id_book: string;
    _avg: {
        rate: number;
    };
}

export interface IAvaliationBookSummaryResponse {
    _avg: {
        rate: number;
    };
    _count: {
        rate: number;
    };
    _max: {
        rate: number;
    };
    _min: {
        rate: number;
    };
}
