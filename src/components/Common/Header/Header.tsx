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
  const [show, setShow] = useState(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const context = useContext(ThemeContext);
  const target = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const matches = useMediaQuery("tablet");
  const light = context.theme === "light";
  const modalRef = useRef<HTMLDivElement | null>(null);

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

  const openModalAlert = () => {
    setOpenModal(!openModal);
  };

  useEffect(() => {
    if (matches) {
      setOpenModal(false);
    }
  }, [matches]);

  return (
    <div className="stiky z-10 w-full h-[80px] text-white top-0">
      <div className="flex w-full h-full relative justify-between items-center my-0 mx-auto py-0 px-4">
        <div className="h-full flex justify-center items-center">
          <Link to="/">
            <img src="/images/rm-logo.png" alt="logo" className="h-8 w-8" />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          {location.pathname !== "/editor" && (
            <Link to="/editor" className="h-9 w-9 mr-3">
              <Report size={35} className={light ? "fill-black" : "fill-white"} />
            </Link>
          )}
          <Link to="/board">
            <img src={light ? "/images/talk.svg" : "/images/talk-dark.svg"} alt="talk" className="h-10 w-10 mr-3" />
          </Link>
          <Link to="https://github.com/Readme-Monster/readme-monster">
            <img
              src={light ? "/images/github-logo-light.svg" : "/images/github-logo-dark.svg"}
              alt="github"
              className="h-9 w-9 mr-3"
            />
          </Link>
          <img
            onClick={context.toggleMode}
            src={light ? "/images/light-to-dark.svg" : "/images/dark-to-light.svg"}
            alt="light"
            className="h-9 w-9 mr-3"
          />
          <Button variant="transparent" ref={target} onClick={() => setShow(!show)} className="p-0">
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
              <button onClick={openModalAlert}>
                <CloseLarge size={35} className={light ? "fill-black" : "fill-white"} />
              </button>
            ) : (
              <button onClick={openModalAlert}>
                <Menu size={35} className={light ? "fill-black" : "fill-white"} />
              </button>
            ))}

          <Overlay target={target.current} show={show} placement="bottom">
            {({
              placement: _placement,
              arrowProps: _arrowProps,
              show: _show,
              popper: _popper,
              hasDoneInitialMeasure: _hasDoneInitialMeasure,
              ...props
            }) => (
              <div {...props} className="bg-black rounded p-3 mt-1 ">
                {isAuthenticated ? (
                  <>
                    <div
                      className="p-1 cursor-pointer text-textWhite hover:text-textBlue"
                      data-testid="mypage"
                      onClick={() => navigate("/mypage")}
                    >
                      마이페이지
                    </div>
                    <div
                      className="p-1 cursor-pointer text-textWhite hover:text-textBlue"
                      data-testid="signout"
                      onClick={onSignOut}
                    >
                      로그아웃
                    </div>
                  </>
                ) : (
                  <div
                    className="p-1 cursor-pointer text-textWhite hover:text-textBlue"
                    data-testid="login"
                    onClick={() => navigate("/login")}
                  >
                    로그인
                  </div>
                )}
              </div>
            )}
          </Overlay>
        </div>
      </div>
      {matches && openModal && (
        <SectionsContainerModal modalRef={modalRef} modalOutSideClick={modalOutSideClick} onClose={openModalAlert} />
      )}
    </div>
  );
};

export default Header;
