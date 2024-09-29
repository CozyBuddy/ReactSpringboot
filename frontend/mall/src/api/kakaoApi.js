
const rest_api_key = `248b208b17a6ec654aa49e4a505125de`
const redirect_uri = `http://localhost:3000/member/kakao`

const auth_code_path = `http://kauth.kakao.com/oauth/authorize`

export const getKakaoLoginLink = () => {
    const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code` ;

    return kakaoURL
}