import { css } from '@emotion/react';

export const containerStyle = css`
  padding: 10px 20px 40px;
  margin: 0 auto;
  max-width: 520px;
`;

export const inputStyle = css`
  display: inline-block;
  width: 100%;
  height: 44px;
  padding: 0 14px 2px;
  color: #000;
  font-size: 14px;
  line-height: 42px;
  letter-spacing: -0.01em;
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #fff;
  border: 1px solid #d5d5d5;
  border-radius: 6px;
  box-sizing: border-box;
  transition: border-color 0.2s ease-out;
  outline: none;
`;

export const inputPwStyle = css`
  padding: 0 48px 0 14px;
`;

export const btnEyeStyle = (isShowPw: boolean) => css`
  border: none;
  background: none;
  cursor: pointer;
  display: inline-block;
  position: absolute;
  right: 14px;
  top: 11px;
  width: 22px;
  height: 20px;
  background-size: 22px 20px;
  background-image: ${isShowPw
    ? 'url(/images/ico_eye_active@2x.png)'
    : 'url(/images/ico_eye@2x.png)'};
  transition: background 0.2s ease-out;
`;

export const pwWrapperStyle = css`
  position: relative;
  margin-top: 13px;
`;

export const errorTextStyle = css`
  font-size: 13px;
  color: rgb(240, 63, 64);
  margin-top: 4px;
`;

export const loginWrapperStyle = css`
  margin-top: 14px;
`;

export const btnLoginStyle = css`
  cursor: pointer;
  border: solid 1px #5c95f0;
  background-color: #5c95f0;
  color: #fff;
  width: 100%;
  height: 54px;
  border-radius: 6px;
  font-size: 18px;
`;

export const joinWrapperStyle = css`
  display: flex;
  justify-content: flex-end;
  margin-top: 4px;
`;

export const snsWrapperStyle = css`
  margin-top: 78px;
`;

export const btnSnsStyle = css`
  cursor: pointer;
  border: solid 1px #ddd;
  color: #333;
  width: 100%;
  height: 54px;
  border-radius: 6px;
  font-size: 18px;
`;

export const btnKaKaoStyle = css`
  background-color: #fee500;
`;

export const btnNaverStyle = css`
  margin-top: 10px;
  background-color: #21c603;
  color: #fff;
`;

export const btnGoogleStyle = css`
  margin-top: 10px;
  background-color: #fff;
`;

export const snsInnerStyle = css`
  display: flex;
  align-items: center;
  justify-content: center;
  vertical-align: top;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const snsIconStyle = css`
  position: absolute;
  left: 0px;
  top: 5px;
  display: inline-block;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: 50%;
  box-sizing: content-box;

  width: 42px;
  height: 42px;
  margin-right: 10px;
  margin-left: 0;
`;

export const snsTextStyle = css`
  display: inline-block;
`;

export const kakaoIconStyle = css`
  background-image: url(/images/ico_sns_kakao@2x.png);
`;

export const naverIconStyle = css`
  background-image: url(/images/ico_sns_naver@2x.png);
`;

export const googleIconStyle = css`
  background-image: url(/images/ico_sns_google@2x.png);
`;
