import { useEffect, useState } from "react";
import Browser from "webextension-polyfill";
import { storage } from "../utils/storage";
import { wait } from "../utils";
import { toast } from "sonner";

export default function () {
  const [paid, setPaid] = useState<boolean>(true);

  const [username, setUsername] = useState<string | null>("");
  const [isUsername, setIsUsername] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const [post, setPost] = useState<number>(10);
  const [comments, setComments] = useState<number>(10);
  // extension information
  const [version, setVersion] = useState<string>("");
  const [name, setName] = useState<string>("");

  async function deletePostHandler() {
    if (post >= 1 && post <= 50 && paid && username) {
      const url = `https://old.reddit.com/user/${username}/submitted`;
      Browser.runtime.sendMessage({
        action: "deletePost",
        ammount: post,
        url,
      });
    }
  }

  async function deleteCommentHandler() {
    if (comments >= 1 && comments <= 50 && paid && username) {
      const url = `https://old.reddit.com/user/${username}/comments/`;
      Browser.runtime.sendMessage({
        action: "deleteComment",
        ammount: comments,
        url,
      });
    }
  }

  function paymentHandler() {
    Browser.runtime.sendMessage({ payment: true });
  }

  useEffect(() => {
    const { version, name } = Browser.runtime.getManifest();
    setVersion(version);
    setName(name);

    const initalGet = async () => {
      const { username, paid } = await storage.get(["username", "paid"]);
      setUsername(username ?? null);
      if (username) setIsUsername(true);
      setPaid(paid);
    };
    initalGet();
  }, [isUsername]);

  async function submitHandler() {
    if (!username) return;
    if (username && username.length > 3) {
      setLoading(true);
      await wait(1000);
      await storage.set("username", username);
      toast.success("Username submited successfully 🎉");
      await wait(1000);
      setLoading(false);
      setIsUsername(true);
    } else {
      setLoading(true);
      await wait(1000);
      toast.success("Invalid Username 😏");
      setLoading(false);
      setIsUsername(false);
    }
  }

  async function logoutHandler() {
    await storage.set("username", null);
    setUsername(null);
    setIsUsername(false);
    setPaid(true);
  }
  return (
    <div className="bg-zinc-900  text-white">
      {!isUsername ? (
        <div className="w-80 h-full px-5 pt-5">
          <div className="flex justify-center items-start w-full">
            <h1 className="font-semibold text-2xl text-center flex justify-center items-center flex-col">
              Welcome To
              <br />
              <strong className="bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text via-pink-500 text-3xl">
                {name}
              </strong>
            </h1>
          </div>
          <div className="mt-3 flex justify-center items-center flex-col gap-2">
            <input
              className="w-full text-base font-semibold rounded-full p-1 text-zinc-900 text-center shadow-inner"
              type="text"
              name="username"
              id="username"
              placeholder="Enter your reddit username"
              value={username ?? ""}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button
              className="bg-red-600 font-semibold py-1 px-3 rounded-full text-base"
              onClick={submitHandler}
            >
              {loading ? "Submiting..." : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-80 h-auto p-5">
          <div className="heading pb-5 flex flex-col gap-0 justify-center items-center">
            <h1 className="text-center text-3xl font-semibold bg-gradient-to-r from-red-500 to-purple-500 text-transparent bg-clip-text via-pink-500">
              {name}
            </h1>
            <p className="text-sm">
              Hello, <strong>{username}</strong>
            </p>
          </div>
          <div className="flex flex-col  justify-center items-center">
            <div className="flex flex-col w-full">
              <label htmlFor="post" className="text-base font-medium">
                Delete your posts
              </label>
              <div className="flex w-full relative">
                <input
                  className="w-full text-xl font-semibold rounded-full p-1 text-zinc-900 text-center shadow-inner"
                  type="number"
                  name="post"
                  id="post"
                  min={1}
                  max={50}
                  placeholder="00"
                  value={post}
                  onChange={(e) => setPost(+e.target.value)}
                />
                <button
                  className="absolute right-0 top-0 z-10 bg-red-600 h-full rounded-full px-4 text-base font-semibold"
                  onClick={deletePostHandler}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="w-2 h-5 bg-blue-300 rounded-full mt-2" />
            {/* delete comments */}
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="commnents" className="text-base font-medium">
                Delete your comments
              </label>
              <div className="flex w-full relative">
                <input
                  className="w-full text-xl font-semibold rounded-full p-1 text-zinc-900 text-center shadow-inner"
                  type="number"
                  name="comments"
                  id="comments"
                  min={1}
                  max={50}
                  placeholder="00"
                  value={comments}
                  onChange={(e) => setComments(+e.target.value)}
                />
                <button
                  className="absolute right-0 top-0 z-10 bg-red-600 h-full rounded-full px-4 text-base font-semibold"
                  onClick={deleteCommentHandler}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col justify-center items-center gap-0 mt-4">
        {/* <p className="text-[12px] text-opacity-20">Develop By Jonathon</p> */}
        <strong className="text-sm font-semibold">v{version}</strong>
      </div>
      {isUsername && (
        <img
          src="/logout.png"
          alt="logout btn"
          className="fixed -bottom-1 -right-1 w-10 border-none bg-red-600 rounded-full cursor-pointer h-10"
          onClick={paymentHandler}
        />
      )}
    </div>
  );
}
