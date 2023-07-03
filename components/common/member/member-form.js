import styles from '@/styles/member-css/member-form.module.css';

export default function MemberForm() {
  return (
    <form className={styles.memForm}>
      <div className={styles.formArea}>
        <label htmlFor="email">帳號 : </label>
        <input id="email" name="email" type="email"></input>
      </div>

      <div className={styles.formArea}>
        <label htmlFor="email">密碼 : </label>
        <input id="password" name="password" type="password"></input>
      </div>

      <div className={styles.formArea}>
        <label htmlFor="email">再次輸入密碼 : </label>
        <input id="password" name="password" type="password"></input>
      </div>

      <div className={styles.formArea}>
        <label htmlFor="text">姓名 : </label>
        <input id="text" name="text" type="text"></input>
      </div>

      <div className={styles.formArea}>
        <label htmlFor="text">暱稱 : </label>
        <input id="text" name="text" type="text"></input>
      </div>

      <div className={styles.formArea}>
        <label htmlFor="text">姓名 : </label>
        <input id="text" name="text" type="text"></input>
      </div>

      <div className={styles.formArea}>
        <label htmlFor="telephone">手機 : </label>
        <input id="text" name="text" type="text"></input>
      </div>

      <div className={styles.formArea}>
        <label htmlFor="tdate">生日 : </label>
        <input id="date" name="date" type="date"></input>
      </div>

      <div className={styles.formArea}>
        <label htmlFor="tdate">上傳照片 : </label>
        <input id="file" name="file" type="file"></input>
      </div>

      <div className={styles.formArea}>預設隱藏的放照片區</div>
    </form>
  );
}
