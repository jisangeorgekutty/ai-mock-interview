import { SignUp } from '@clerk/nextjs'

export default function Page() {
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
                    <img
                        alt=""
                        src="background.png"
                        className="absolute inset-0 h-full w-full object-cover opacity-80"
                    />

                    <div className="hidden lg:relative lg:block lg:p-12">
                        <a className="block text-white" href="#">
                            <span className="sr-only">Home</span>

                        </a>

                        <div className='flex'>
                            <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                                Welcome to MockMaster
                            </h2>
                            <img src="Logo.png" alt="" className='h-20 w-30' />
                        </div>

                        <p className="mt-4 leading-relaxed text-white/90">

                            This application designed to enhance job seekers' interview preparation through simulated
                            interview experiences.
                        </p>
                    </div>
                </section>

                <main
                    className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6"
                >
                    <div className="max-w-xl lg:max-w-3xl">
                        <div className="relative -mt-16 block lg:hidden">
                            <a
                                className="inline-flex size-16 items-center justify-center rounded-full bg-white text-blue-600 sm:size-20 dark:bg-gray-900"
                                href="#"
                            >
                                <span className="sr-only">Home</span>
                                <img src="Logo.png" alt="" className='p-4' />
                            </a>
                            <span className="sr-only">Home</span>


                            <h1 className="mt-2 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                                Welcome to Welcome to MockMaster
                            </h1>

                            <p className="mt-4 leading-relaxed text-gray-500 dark:text-gray-400">
                                This application designed to enhance job seekers' interview preparation through simulated
                                interview experiences.
                            </p>
                        </div>
                        <SignUp />
                    </div>
                </main>
            </div>
        </section>
    )
}