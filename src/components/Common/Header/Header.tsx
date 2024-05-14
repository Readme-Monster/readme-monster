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

const Header = () => {
  const auth = getAuth(app);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!auth?.currentUser);
  const [show, setShow] = useState(false);
  const context = useContext(ThemeContext);
  const target = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

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

  return (
    <div className="stiky z-10 w-full h-[80px] text-white top-0">
      <div className="flex w-full h-full relative justify-between items-center my-0 mx-auto py-0 px-4">
        <div className="h-full flex justify-center items-center">
          <Link to="/">
            <img src="/images/rm-logo.png" alt="logo" className="h-8 w-8" />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          {context.theme === "light" ? (
            <>
              {location.pathname !== "/editor" && (
                <Link to="/editor">
                  <img src="/images/report.svg" alt="talk" className="h-9 w-9 mr-3" />
                </Link>
              )}
              <Link to="/board">
                <img src="/images/talk.svg" alt="talk" className="h-10 w-10 mr-3" />
              </Link>
              <Link to="https://github.com/Readme-Monster/readme-monster">
                <img src="/images/github-logo-light.svg" alt="github" className="h-9 w-9 mr-3" />
              </Link>
              <img onClick={context.toggleMode} src="/images/light-to-dark.svg" alt="light" className="h-9 w-9 mr-3" />
              <Button variant="transparent" ref={target} onClick={() => setShow(!show)} className="p-0">
                <img src="/images/mypage-light.svg" alt="mypage" className="h-9 w-9" />
              </Button>
            </>
          ) : (
            <>
              <Link to="/board">
                <img src="/images/talk-dark.svg" alt="talk" className="h-10 w-10 mr-3" />
              </Link>
              <Link to="https://github.com/">
                <img src="/images/github-logo-dark.svg" alt="github" className="h-9 w-9 mr-3" />
              </Link>
              <img onClick={context.toggleMode} src="/images/dark-to-light.svg" alt="dark" className="h-8 w-8 mr-3" />
              <Button variant="transparent" ref={target} onClick={() => setShow(!show)} className="p-0">
                <img src="/images/mypage-dark.svg" alt="mypage" className="h-9 w-9" />
              </Button>
            </>
          )}
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
    </div>
  );
};

export default Header;
