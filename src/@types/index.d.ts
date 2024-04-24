type StorageKeys = "username" | "paid";

type StorageResponse = {
  username: string | null | undefined;
  paid: boolean;
};

type TFeatures = {
  from: "POSTS" | "COMMENTS" | "MESSAGES";
  ammount: number;
};

type TMessaging = {
  action:
    | "deletePosts"
    | "deleteComments"
    | "deleteMessages"
    | "deletePostsAndComments";
  url: string;
  ammount: number;
};
