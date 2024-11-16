import React from 'react'
import { Link } from 'react-router-dom'
import registerImage from "../assets/images/register.jpg"

const RegisterPage = () => {
    return (
        <div>
            <section class="bg-white min-h-screen flex items-center justify-center">
                <div class="bg-white flex rounded-2xl shadow-xl max-w-3xl p-5 items-center">
                    <div class="md:w-1/2 px-8 md:px-16">
                        <h2 class="font-bold text-2xl text-customGray">Register</h2>
                        <p class="text-xs mt-4 text-black">If you are already a member, easily log in</p>

                        <form action="" class="flex flex-col gap-4">
                            <input class="p-2 mt-8 rounded-xl border focus:outline-none" type="text" name="username" placeholder="User Name" />
                            <input class="p-2  rounded-xl border focus:outline-none" type="email" name="email" placeholder="Email" />
                            <div class="relative">
                                <input class="p-2 rounded-xl border w-full focus:outline-none" type="password" name="password" placeholder="Password" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" class="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </div>
                            <button class="bg-primaryRed rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
                        </form>

                        {/* <div class="mt-6 grid grid-cols-3 items-center text-gray-400">
                            <hr class="border-primaryRed" />
                            <p class="text-center text-sm">OR</p>
                            <hr class="border-primaryRed" />
                        </div> */}

                        <Link to="/login">
                            <div class="mt-3 text-xs flex justify-between items-center text-black hover:text-gray-400">
                                <p>Already have an account?</p>
                                <button class="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300">Login</button>
                            </div>
                        </Link>
                    </div>

                    <div class="md:block hidden w-1/2">
                        <img class="rounded-2xl" src={registerImage} />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default RegisterPage
