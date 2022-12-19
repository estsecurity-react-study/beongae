import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  containerStyle,
  inputStyle,
  pwWrapperStyle,
  inputPwStyle,
  btnEyeStyle,
  loginWrapperStyle,
  btnLoginStyle,
  joinWrapperStyle,
  snsWrapperStyle,
  btnSnsStyle,
  btnKaKaoStyle,
  btnNaverStyle,
  btnGoogleStyle,
  snsInnerStyle,
  snsIconStyle,
  snsTextStyle,
  kakaoIconStyle,
  naverIconStyle,
  googleIconStyle,
} from './styles';

const Login = () => {
  const [isShowPw, setIsShowPw] = useState<boolean>(false);
  const handleEyeClick = useCallback(() => {
    setIsShowPw((prev) => !prev);
  }, []);

  return (
    <div css={containerStyle}>
      <h2>Login</h2>
      <form>
        <input
          css={inputStyle}
          type="text"
          name="id"
          placeholder="아이디 입력"
          title="아이디 입력"
        />
        <div css={pwWrapperStyle}>
          <input
            css={[inputStyle, inputPwStyle]}
            type={isShowPw ? 'text' : 'password'}
            name="password"
            placeholder="8~15자리 영문+숫자+특수문자 조합"
            title="비밀번호 입력 (8~15자리 영문+숫자+특수문자 조합)"
          />
          <button css={btnEyeStyle(isShowPw)} type="button" onClick={handleEyeClick} />
        </div>
        <div css={loginWrapperStyle}>
          <button css={btnLoginStyle} type="button">
            로그인
          </button>
        </div>
        <div css={joinWrapperStyle}>
          <Link to="/join">회원가입</Link>
        </div>
      </form>
      <div css={snsWrapperStyle}>
        <button css={[btnSnsStyle, btnKaKaoStyle]} type="button">
          <span css={snsInnerStyle}>
            <span css={[snsIconStyle, kakaoIconStyle]} />
            <span css={snsTextStyle}>카카오로 시작하기</span>
          </span>
        </button>
        <button css={[btnSnsStyle, btnNaverStyle]} type="button">
          <span css={snsInnerStyle}>
            <span css={[snsIconStyle, naverIconStyle]} />
            <span css={snsTextStyle}>네이버로 시작하기</span>
          </span>
        </button>
        <button css={[btnSnsStyle, btnGoogleStyle]} type="button">
          <span css={snsInnerStyle}>
            <span css={[snsIconStyle, googleIconStyle]} />
            <span css={snsTextStyle}>구글로 시작하기</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Login;
