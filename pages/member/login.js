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

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

const Login = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  const [change, setChange] = React.useState([]);
  const changeCard = () => {};

  return (
    <div className={styles.container}>
      <div>
        <MemMuiSwitch />
      </div>
      <div>
        <button onClick={changeCard}>切換 </button>
      </div>
      <div className={styles.area2}>
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
                <Typography component="h1" variant="h5" className={styles.text}>
                  廠商登入
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
                <Typography component="h1" variant="h5" className={styles.text}>
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
      </div>
    </div>
  );
};

Login.getLayout = BlankLayout;
export default Login;
