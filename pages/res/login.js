import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from '@/styles/member-css/mem-login.module.css';
import Image from 'next/image';
import MemMuiSwitch from '@/components/common/member/mem-muiSwitch';
import BlankLayout from '@/components/layout/blank-layout';
import MemBtn from '@/components/common/member/mem-Btn';
import MemLoginBtn from '@/components/common/member/mem-loginBtn';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2'

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

const Login = () => {

  const [loginInfo, setLoginInfo] = useState({
    account: '',
    password: '',
  })
  const getLoginInfo = (e) => {
    const newLoginInfo = { ...loginInfo, [e.target.name]: e.target.value }
    setLoginInfo(newLoginInfo)
  }

  // 設置要放登入後接住的帳號跟sid還有店名
  const [loginSuccess, setLoginSuccess] = useState({
    account: '',
    shop: '',
    sid: '',
    error: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault();
    fetch('http://localhost:3002/res-login', {
      method: 'POST',
      body: JSON.stringify(loginInfo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(r => r.json())
      .then(data => {
        console.log(data)
        if (data.success) {
          const newloginSuccess = {
            ...loginSuccess,
            account: data.rows[0].account,
            shop: data.rows[0].shop,
            sid: data.rows[0].sid
          }
          setLoginSuccess(newloginSuccess)
          localStorage.setItem('res-auth', JSON.stringify(data.data))

          Swal.fire(
            '登入成功!',
            '',
            'success'
          )
          
        } else {
          const newloginfail = { ...loginSuccess, error: data.error }
          setLoginSuccess(newloginfail)
        }
      }
      )
  };

  useEffect(() => {
    if (loginSuccess.account == true) {
      setLoginSuccess({...loginSuccess, error:''})
      console.log(loginSuccess)
    }
    if (loginSuccess.account == false) {
      console.log(loginSuccess)
    }

  }, [loginSuccess])

  const [change, setChange] = React.useState(false);

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logintext}>選擇登入身分</div>
        <MemLoginBtn change={change} setChange={setChange} />
      </div>

      <div className={styles.area2}>
        {change ? (
          <div className={styles.cardBody}>
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src="/member/hamburger.png"
                    width={100}
                    height={100}
                    alt=""
                  />
                  <Typography
                    component="h1"
                    variant="h5"
                    className={styles.text}
                  >
                    廠商登入
                  </Typography>
                  <div class="mb-3">

                    <label for="account" class="form-label"></label>
                    <input className='' type="email" name='account' class="form-control" id="account" placeholder='請輸入帳號' value={loginInfo.account}
                      onChange={getLoginInfo}
                    />
                    <div style={{ color: 'red' }}>{loginSuccess.error}</div>
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label"></label>
                    <input type="password" class="form-control" name='password' id="password" placeholder='請輸入密碼'
                      onChange={getLoginInfo}
                    />
                    <div style={{ color: 'red' }}>{loginSuccess.error}</div>
                  </div>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="帳號"
                      name="email"
                      autoComplete="email"
                      color="warning"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="密碼"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      color="warning"
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="warning" />}
                      label="記住我"
                      className={styles.text}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      color="warning"
                      onChange={() => { }}
                      onSubmit={handleSubmit}
                    >
                      登入
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2" className={styles.text}>
                          忘記密碼?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2" className={styles.text}>
                          {'尚未註冊?'}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Container>
            </ThemeProvider>
          </div>
        ) : (
          <div className={styles.cardBody2}>
            <ThemeProvider theme={defaultTheme}>
              <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                  sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    src="/member/cookie3.png"
                    width={100}
                    height={100}
                    alt=""
                  />
                  <Typography
                    component="h1"
                    variant="h5"
                    className={styles.text}
                  >
                    會員登入
                  </Typography>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                    sx={{ mt: 1 }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="帳號"
                      name="email"
                      autoComplete="email"
                      color="warning"
                    />
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="密碼"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      color="warning"
                    />
                    <FormControlLabel
                      control={<Checkbox value="remember" color="warning" />}
                      label="記住我"
                      className={styles.text}
                    />
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      color="warning"
                    >
                      登入
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link href="#" variant="body2" className={styles.text}>
                          忘記密碼?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link href="#" variant="body2" className={styles.text}>
                          {'尚未註冊?'}
                        </Link>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
              </Container>
            </ThemeProvider>
          </div>
        )}
      </div>
    </div>
  );
};

// Login.getLayout = BlankLayout;
export default Login;
