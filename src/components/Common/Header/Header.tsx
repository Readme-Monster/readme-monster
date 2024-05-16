/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import { useNavigate, Link, useLocation } from "react-router-dom";
import ThemeContext from "context/ThemeContext";
import { app } from "../../../firebaseApp";
import useMediaQuery from "../useMediaQuery";
import { CloseLarge, Menu, Report } from "@carbon/icons-react";
import clsx from "clsx";
import SectionsContainerModal from "components/Editor/Modal/SectionsContainerModal";

const Header = () => {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  const [showOverlay, setShowOverlay] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const context = useContext(ThemeContext);
  const target = useRef(null);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMediaQuery("tablet");
  const light = context.theme === "light";

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const onSignOut = async () => {
    try {
      await signOut(auth);
      toast.success("로그아웃 되었습니다.");
      setIsAuthenticated(false);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  const modalOutSideClick = (e: any) => {
    if (modalRef.current === e.target) {
      setOpenModal(false);
    }
  };

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const closeAll = () => {
    setShowOverlay(false);
    setOpenModal(false);
  };

  useEffect(() => {
    if (matches) {
      setOpenModal(false);
      setShowOverlay(false);
    }
  }, [matches]);

  return (
    <div className="stiky z-10 w-full h-[70px] text-white top-0">
      <div className="flex w-full h-full relative justify-between items-center my-0 mx-auto py-0 px-4">
        <div
          className="h-full flex justify-center items-center"
          onClick={() => {
            closeAll();
          }}
        >
          <Link to="/">
            <img src="/images/rm-logo.png" alt="logo" className="h-8 w-8" />
          </Link>
        </div>
        <div className="flex flex-Center">
          {location.pathname !== "/editor" && (
            <Link to="/editor" className="h-9 w-9 mr-3">
              <Report size={35} className={light ? "fill-black" : "fill-white"} />
            </Link>
          )}
          <Link
            to="/board"
            onClick={() => {
              closeAll();
            }}
          >
            <img src={light ? "/images/talk.svg" : "/images/talk-dark.svg"} alt="talk" className="h-10 w-10 mr-3" />
          </Link>
          <img
            onClick={() => openInNewTab("https://github.com/Readme-Monster/readme-monster")}
            src={light ? "/images/github-logo-light.svg" : "/images/github-logo-dark.svg"}
            alt="github"
            className="h-9 w-9 mr-3 cursor-pointer"
          />
          <img
            onClick={() => {
              context.toggleMode();
              closeAll();
            }}
            src={light ? "/images/light-to-dark.svg" : "/images/dark-to-light.svg"}
            alt="light"
            className="h-8 w-8 mr-3 cursor-pointer"
          />
          <Button
            variant="transparent"
            ref={target}
            onClick={() => {
              setShowOverlay(!showOverlay);
              setOpenModal(false);
            }}
            className="p-0"
          >
            <img
              src={light ? "/images/mypage-light.svg" : "/images/mypage-dark.svg"}
              alt="mypage"
              className={clsx("h-9 w-9", {
                "mr-3": matches && location.pathname === "/editor",
              })}
            />
          </Button>
          {matches &&
            location.pathname === "/editor" &&
            (openModal ? (
              <button
                onClick={() => {
                  setOpenModal(!openModal);
                  setShowOverlay(false);
                }}
              >
                <CloseLarge size={35} className={light ? "fill-black" : "fill-white"} />
              </button>
            ) : (
              <button
                onClick={() => {
                  setOpenModal(!openModal);
                  setShowOverlay(false);
                }}
              >
                <Menu size={35} className={light ? "fill-black" : "fill-white"} />
              </button>
            ))}

          <Overlay target={target.current} show={showOverlay} placement="bottom">
            {({
              placement: _placement,
              arrowProps: _arrowProps,
              show: _show,
              popper: _popper,
              hasDoneInitialMeasure: _hasDoneInitialMeasure,
              ...props
            }) => (
              <div {...props} className="bg-black rounded p-3 mt-1 z-20">
                {isAuthenticated ? (
                  <>
                    <div
                      className="p-1 cursor-pointer text-textWhite hover:text-textBlue"
                      data-testid="mypage"
                      onClick={() => {
                        navigate("/mypage");
                        closeAll();
                      }}
                    >
                      마이페이지
                    </div>
                    <div
                      className="p-1 cursor-pointer text-textWhite hover:text-textBlue"
                      data-testid="signout"
                      onClick={() => {
                        onSignOut();
                        closeAll();
                      }}
                    >
                      로그아웃
                    </div>
                  </>
                ) : (
                  <div
                    className="p-1 cursor-pointer text-textWhite hover:text-textBlue"
                    data-testid="login"
                    onClick={() => {
                      navigate("/login");
                      closeAll();
                    }}
                  >
                    로그인
                  </div>
                )}
              </div>
            )}
          </Overlay>
        </div>
      </div>
      {matches && openModal && <SectionsContainerModal modalRef={modalRef} modalOutSideClick={modalOutSideClick} />}
    </div>
  );
};

export default Header;
