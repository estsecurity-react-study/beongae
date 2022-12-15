import React, { useCallback } from 'react';
import clsx from 'clsx';
import { useForm, SubmitHandler } from 'react-hook-form';

import styles from './Join.module.scss';

interface IFormInput {
  userId: string;
  password: string;
  userName: string;
}

const Join = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = useCallback((data) => console.log(data), []);

  return (
    <div className={styles.container}>
      <h2>Join</h2>
      <form>
        <div className={styles.formField}>
          <label>
            아이디 <span>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="text"
              // name="userId"
              {...register('userId', { required: true })}
              placeholder="아이디를 입력해주세요."
            />
            {errors.userId?.type === 'required' && (
              <div className={styles.errorText}>아이디는 필수입력 항목입니다.</div>
            )}
          </div>
        </div>

        <div className={styles.formField}>
          <label>
            비밀번호 <span>*</span>
          </label>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="password"
              // name="password"
              {...register('password', {
                required: '비밀번호는 필수입력 항목입니다.',
                pattern: {
                  value: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,15}$/g,
                  message: '8~15자리 영문+숫자+특수문자 조합으로 입력하세요.',
                },
              })}
              placeholder="비밀번호를 입력해주세요."
            />
            {errors.password && <div className={styles.errorText}>{errors.password?.message}</div>}
          </div>
        </div>

        <div className={styles.formField}>
          <label>이름</label>
          <div className={styles.inputWrapper}>
            <input
              className={styles.input}
              type="text"
              // name="userName"
              {...register('userName')}
              placeholder="이름을 입력해주세요."
            />
          </div>
        </div>

        <div className={styles.joinWrapper}>
          <button className={styles.btnJoin} type="button" onClick={handleSubmit(onSubmit)}>
            회원 가입
          </button>
        </div>
      </form>

      <div className={styles.snsWrapper}>
        <p>SNS 아이디로 간편하게 가입하세요.</p>
        <button className={clsx(styles.btnSns, styles.btnKakao)} type="button">
          <span>
            <span className={clsx(styles.snsIcon, styles.kakaoIcon)} />
            <span className={styles.snsText}>카카오로 가입하기</span>
          </span>
        </button>
        <button className={clsx(styles.btnSns, styles.btnNaver)} type="button">
          <span>
            <span className={clsx(styles.snsIcon, styles.naverIcon)} />
            <span className={styles.snsText}>네이버로 가입하기</span>
          </span>
        </button>
        <button className={clsx(styles.btnSns, styles.btnGoogle)} type="button">
          <span>
            <span className={clsx(styles.snsIcon, styles.googleIcon)} />
            <span className={styles.snsText}>구글로 가입하기</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default Join;
