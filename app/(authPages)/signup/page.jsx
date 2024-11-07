'use client'
import { useState } from "react"
import { useRouter } from "next/navigation";


export default function Signup() {

    const router = useRouter();

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: ""
    })

    const [error, setError] = useState('')

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }


    const submitFunc = async () => {
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })

        const data = await res.json()

        if (!data.success) {
            setError(data.message)
        } else {
            setError('')
            setUser({
                name: "",
                email: "",
                password: ""
            })
        }
        router.push('/signin');
    }


    return (
        <>
            <section className="bg-gray-50 dark:bg-gray-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Unlock Your Experience
                            </h1>
                            <form className="space-y-4 md:space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="enter name"
                                        onChange={handleChange}
                                        value={user.name}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />

                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="enter email"
                                        onChange={handleChange}
                                        value={user.email}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />

                                </div>
                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="enter password"
                                        onChange={handleChange}
                                        value={user.password}
                                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />

                                </div>

                                {
                                    error ? <div className="text-red-700 mt-1 md:mt-1">
                                        {error}
                                    </div> : <></>
                                }

                                <button
                                    type="button"
                                    onClick={() => submitFunc()}
                                    className="w-full text-white bg-blue-800 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"

                                >
                                    Sign Up
                                </button>
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 text-center">
                                    Already have an account?{" "}
                                    <span
                                        onClick={() => router.push("/signin")}
                                        className="text-blue-600 hover:underline dark:text-blue-500 cursor-pointer"
                                    >
                                        Sign in here
                                    </span>
                                </div>
                                <div
                                    className="text-slate-400 text-center underline underline-offset-2 cursor-pointer"
                                    onClick={() => router.push("/")}
                                >
                                    back to home
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}