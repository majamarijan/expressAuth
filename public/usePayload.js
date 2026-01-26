export const token = localStorage.getItem('token');
			
function parseJWT(token) {
	try {
	const base64Url = token.split('.')[1];
	const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	return JSON.parse(atob(base64));
} catch (e) {
	return null;
	}
}

export const payload = parseJWT(token);

