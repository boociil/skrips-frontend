import { useEffect } from "react";

function Users() {

    useEffect(() => {
        //const theHtml = document.querySelector('#root')
        //theHtml.classList.add('bg-white');
    }, []);

    const data = [
        {username:"ryan123", firstName:"Ryan", lastName:"Ardiansyah",Role:"Admin", status:"Online"},
        {username:"ryan123", firstName:"Ryan", lastName:"Ardiansyah",Role:"Admin", status:"Online"},
        {username:"ryan123", firstName:"Ryan", lastName:"Ardiansyah",Role:"Admin", status:"Online"},
        {username:"ryan123", firstName:"Ryan", lastName:"Ardiansyah",Role:"Admin", status:"Online"},
    ]


    return (
        <div className="font-poppins md:mt-28">
            <h2 className="ml-6 mt-6">Users Management</h2>

            <div className="the-table mx-auto mt-4 md:mt-8 ml-4">
                <div className="title mx-auto grid grid-cols-3 md:grid-cols-5 text-[#767F92] text-xs">
                    <div className="col-start-1">username</div>
                    <div className=" hidden md:block md:col-start-2">Full Name</div>
                    <div className="col-start-2 md:col-start-3">Role</div>
                    <div className="hidden md:col-start-4 md:block">Status</div>
                    <div className="col-start-3 md:col-start-5">Action</div>
                </div>
                <div className="content  text-[#767F92]">
                    {data.map(item => (
                        <div className="my-1 grid grid-cols-3">
                            <div key={item.username} className="cols-start-1">{item.username}</div>
                            <div key={item.username} className="cols-start-2">{item.firstName + " " +item.lastName} </div>
                            <div key={item.username} className="cols-start-3 bg-slate-300 w-fit p-1 rounded-lg">{item.Role}</div>
                        </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default Users;