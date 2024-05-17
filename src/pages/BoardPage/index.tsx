import React, { useState, useEffect } from "react";
import { collection, addDoc, query, onSnapshot, Timestamp } from "firebase/firestore";
import { toast } from "react-toastify";

import { db } from "../../firebaseApp";
interface Comment {
  comment: string;
  registrationDate: Timestamp;
}

const BoardPage = () => {
  const [inputText, setInputText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const q = query(collection(db, "board"));

    const unsubscribe = onSnapshot(
      q,
      querySnapshot => {
        const newComments: Comment[] = [];
        querySnapshot.forEach(doc => {
          const data = doc.data() as Comment;
          newComments.push(data);
        });
        newComments.sort((a, b) => b.registrationDate.seconds - a.registrationDate.seconds);
        setComments(newComments);
      },
      error => {
        toast.error("댓글을 불러오는데 실패했습니다.");
        console.error("Error fetching comments:", error);
      },
    );

    return () => unsubscribe();
  }, []);

  const handleButtonClick = async () => {
    if (inputText.trim() !== "") {
      try {
        await addDoc(collection(db, "board"), {
          registrationDate: new Date(),
          comment: inputText,
        });
        toast.success("댓글이 등록되었습니다");
        setInputText("");
      } catch (error: any) {
        console.log(error);
        toast.error("댓글을 등록하는데 실패했습니다.");
      }
    } else {
      toast.warn("댓글을 입력해주세요.");
    }
  };

  return (
    <div className="w-full" data-testid="board">
      <section className="bg-gray-50 dark:bg-gray-900 px-4 py-14 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 lg:px-16 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-center text-2xl dark:text-textWhite font-bold sm:text-3xl h-1px">자유게시판</h1>
            <p className="text-gray-500 sm:mt-4">
              저희 서비스를 이용하시면서 느낀 점을 자유롭게 공유해주세요. 여러분의 소중한 피드백은 더 나은 서비스로
              거듭나기 위한 밑거름이 됩니다.
            </p>
          </div>

          <div className="mx-auto mt-8 max-w-xl">
            <div className="sm:flex sm:gap-4">
              <div className="sm:flex-1">
                <input
                  type="text"
                  placeholder="글을 입력해주세요"
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  className="w-full rounded-md border-gray-200 bg-white p-3 text-gray-700 shadow-sm text-sm  transition focus:border-white focus:outline-none focus:ring focus:ring-yellow-400"
                />
              </div>
              <button
                onClick={handleButtonClick}
                className="
                group flex w-full items-center justify-center 
                gap-2 rounded-md hover:bg-textBlueHover bg-textBlue dark:bg-darkSecondary 
                px-5 py-3 text-sm font-medium text-white 
                transition focus:outline-none focus:ring 
                focus:ring-yellow-400 sm:mt-0 sm:w-auto mt-[20px]
                "
              >
                <span className="text-sm font-medium"> 등록</span>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="max-w-screen-xl mx-auto px-4 py-14 flex flex-col gap-[15px]">
        {comments.map((item, index) => (
          <div key={index} className="bg-gray-100 rounded p-4">
            <p className="text-gray-500 text-sm">{new Date(item.registrationDate.seconds * 1000).toLocaleString()}</p>
            <p className="text-gray-800 mb-0">{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BoardPage;
