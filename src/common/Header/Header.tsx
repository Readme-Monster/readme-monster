/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const [show, setShow] = useState(false);
  const target = useRef(null);
  const navigate = useNavigate();

  return (
    <div className="stiky z-10 w-full h-12 text-white top-0">
      <div className="flex w-full h-12 relative justify-between items-center my-0 mx-auto py-0 px-4">
        <div className="h-full flex justify-center items-center">
          <Link to="/">
            <img src="/images/rm-logo.png" alt="logo" className="h-8 w-8" />
          </Link>
        </div>
        <div className="flex justify-center items-center">
          <Link to="https://github.com/">
            <img src="/images/github-logo.svg" alt="github" className="h-8 w-8 mr-3" />
          </Link>
          <img src="/images/light-to-dark.svg" alt="dark" className="h-8 w-8 mr-3" />

          <Button variant="transparent" ref={target} onClick={() => setShow(!show)} className="p-0">
            {/* Click me to see */}
            <img src="/images/mypage.svg" alt="mypage" className="h-8 w-8" />
          </Button>
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
                <div
                  className="p-1 cursor-pointer text-textWhite hover:text-textBlue"
                  onClick={() => navigate("/mypage")}
                >
                  마이페이지
                </div>
                <div
                  className="p-1 cursor-pointer text-textWhite hover:text-textBlue"
                  onClick={() => navigate("/login")}
                >
                  로그인
                </div>
              </div>
            )}
          </Overlay>
        </div>
      </div>
    </div>
  );
};

export default Header;
