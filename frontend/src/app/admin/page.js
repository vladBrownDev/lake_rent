// app/admin/page.tsx
"use client";

import { useState, useEffect } from "react";
import LakeAdmin from "./components/LakeAdmin";

export default function AdminPage() {
	const [authorized, setAuthorized] = useState(false);
	const [password, setPassword] = useState("");

	const adminPass = process.env.NEXT_PUBLIC_ADMIN_PASS;

	useEffect(() => {
		if(localStorage.getItem('adminpassword') === adminPass) {
			setAuthorized(true);
		}
	}, [])

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === adminPass) {
			localStorage.setItem('adminpassword', password);
			setAuthorized(true);
		}
	};

	if (!authorized) {
		return (
			<form
				onSubmit={handleSubmit}
				className="flex flex-col items-center p-6 gap-4"
			>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					className="border rounded p-2"
					placeholder="Enter admin password"
				/>
				<button
					type="submit"
					className="bg-blue-600 text-white px-4 py-2 rounded"
				>
					Войти
				</button>
			</form>
		);
	}

	return <LakeAdmin />;
}
