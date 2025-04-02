
const Signup = () => {
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-base-100">
    <h1 className="font-black text-3xl mb-10 w-full text-center">Chatify</h1>
    <div className="w-full max-w-md p-6 bg-base-200 border border-base-300 rounded-box shadow-md">
      <fieldset className="flex flex-col gap-4">
        <legend className="text-2xl font-bold mb-10">Signup</legend>
        <label className="text-sm font-medium">Username</label>
        <input className="input input-bordered w-full" placeholder="Enter your username" />

        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <label className="text-sm font-medium">First Name</label>
            <input className="input input-bordered w-full" placeholder="First name" />
          </div>

          <div>
            <label className="text-sm font-medium">Last Name</label>
            <input className="input input-bordered w-full" placeholder="Last name" />
          </div>
        </div>

        <label className="text-sm font-medium">Password</label>
        <input type="password" className="input input-bordered w-full" placeholder="Enter your password" />

        <label className="text-sm font-medium">Confirm Password</label>
        <input type="password" className="input input-bordered w-full" placeholder="Enter your password" />


        <button className="btn btn-primary w-full mt-3">Signup</button>
        <div>
          Already have an account? 
          <button className="btn btn-link "> Login</button>
        </div>
      </fieldset>
    </div>
  </div>
  )
}

export default Signup;
