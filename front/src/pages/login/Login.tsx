import React, { useCallback, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';

import {
  containerStyle,
  inputStyle,
  pwWrapperStyle,
  inputPwStyle,
  btnEyeStyle,
  errorTextStyle,
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

interface IFormInput {
  userId: string;
  password: string;
}

const Login: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const navigate = useNavigate();

  const [isShowPw, setIsShowPw] = useState<boolean>(false);
  const handleEyeClick = useCallback(() => {
    setIsShowPw((prev) => !prev);
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = useCallback(async (data) => {
    try {
      const loggedUser = await axios.post('/api/auth/login', data);
      console.log('loggedUser', loggedUser);
      if (loggedUser.data) {
        navigate('/');
      }
    } catch (err) {
      console.error('Error: /api/auth/login');
    }
  }, []);

  return (
    <div css={containerStyle}>
      <h2>Login</h2>
      <form>
        <input
          css={inputStyle}
          type="text"
          // name="userId"
          {...register('userId', { required: true })}
          placeholder="아이디 입력"
          title="아이디 입력"
        />
        <div css={pwWrapperStyle}>
          <input
            css={[inputStyle, inputPwStyle]}
            type={isShowPw ? 'text' : 'password'}
            // name="password"
            {...register('password', {
              required: '비밀번호는 필수입력 항목입니다.',
              // pattern: {
              //   value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/g,
              //   message: '8~15자리 영문+숫자+특수문자 조합으로 입력하세요.',
              // },
            })}
            placeholder="8~15자리 영문+숫자+특수문자 조합"
            title="비밀번호 입력 (8~15자리 영문+숫자+특수문자 조합)"
          />
          <button css={btnEyeStyle(isShowPw)} type="button" onClick={handleEyeClick} />
        </div>
        {errors.userId?.type === 'required' && (
          <div css={errorTextStyle}>아이디는 필수입력 항목입니다.</div>
        )}
        {errors.password && <div css={errorTextStyle}>{errors.password?.message}</div>}
        <div css={loginWrapperStyle}>
          <button css={btnLoginStyle} type="button" onClick={handleSubmit(onSubmit)}>
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
