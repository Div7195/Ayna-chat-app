export const getAccessToken = () => {
    return sessionStorage.getItem('jwtToken');
}
