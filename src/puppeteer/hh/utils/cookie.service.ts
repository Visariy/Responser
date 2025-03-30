interface Cookie {
	domain: string;
	expirationDate?: number;
	hostOnly: boolean;
	httpOnly: boolean;
	name: string;
	path: string;
	sameSite: string;
	secure: boolean;
	session: boolean;
	storeId: string;
	value: string;
	id: number;
}

export const formatCookie = (cookies: Cookie[]) => {
	return cookies.map((cookie) => {
		return {
			name: cookie.name,
			value: cookie.value,
			domain: cookie.domain,
			path: cookie.path,
			expires: cookie.expirationDate ? cookie.expirationDate : undefined,
			httpOnly: cookie.httpOnly,
			secure: cookie.secure,
			session: cookie.session,
			sameSite: "None" as "None",
		};
	});
};
