import {request} from "./require";
export function login(username,password,kaptcha) {
  console.log(username,password,kaptcha)
  let fm = new FormData();
  fm.append("username",username);
  fm.append("password",password);
  fm.append("code",kaptcha);
  return request({
    url:'/login',
    method:'post',
    data:fm,
  });
}