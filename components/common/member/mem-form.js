import styles from '@/styles/member-css/mem-form.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';

export default function MemForm() {
  const memForm = {
    width: '800px',
    height: '1000px',
    padding: '50px',
    borderRadius: '20px',
    color: '#921010',
    fontWeight: '800',
    border: '2px solid #921010',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div>
      <form style={memForm}>
        <div>註冊會員</div>
        <Form.Group
          className="mb-3 d-flex"
          controlId="exampleForm.ControlInput1"
        >
          <Form.Label>帳號 : </Form.Label>
          <Form.Control size="sm" type="email" placeholder="請輸入您的email" />
        </Form.Group>

        <div className={styles.formArea}>
          <label htmlFor="email">帳號 : </label>
          <input
            id="email"
            name="email"
            type="email"
            style={{ width: '100%' }}
          ></input>
        </div>

        <div className={styles.formArea}>
          <label htmlFor="email">密碼 : </label>
          <input
            id="password"
            name="password"
            type="password"
            style={{ width: '100%' }}
          ></input>
        </div>

        <div className={styles.formArea}>
          <label htmlFor="email">再次輸入密碼 : </label>
          <input
            id="password"
            name="password"
            type="password"
            style={{ width: '100%' }}
          ></input>
        </div>

        <div className={styles.formArea}>
          <label htmlFor="text">姓名 : </label>
          <input
            id="text"
            name="text"
            type="text"
            style={{ width: '100%' }}
          ></input>
        </div>

        <div className={styles.formArea}>
          <label htmlFor="text">暱稱 : </label>
          <input
            id="text"
            name="text"
            type="text"
            style={{ width: '100%' }}
          ></input>
        </div>

        <div className={styles.formArea}>
          <label htmlFor="text">姓名 : </label>
          <input
            id="text"
            name="text"
            type="text"
            style={{ width: '100%' }}
          ></input>
        </div>

        <div className={styles.formArea}>
          <label htmlFor="telephone">手機 : </label>
          <input
            id="text"
            name="text"
            type="text"
            style={{ width: '100%' }}
          ></input>
        </div>

        <div className={styles.formArea}>
          <label htmlFor="tdate">生日 : </label>
          <input
            id="date"
            name="date"
            type="date"
            style={{ width: '100%' }}
          ></input>
        </div>

        <div className={styles.formArea}>
          <label htmlFor="tdate">上傳照片 : </label>
          <input id="file" name="file" type="file"></input>
        </div>

        <div className={styles.formArea}>預設隱藏的放照片區</div>
      </form>
    </div>
  );
}
